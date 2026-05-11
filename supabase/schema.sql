-- MatricBlog — run in Supabase SQL Editor (order preserved)
-- Extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Categories (before posts FK)
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  name_ar TEXT,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  color TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE authors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  bio TEXT,
  avatar TEXT,
  email TEXT
);

CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  title_ar TEXT,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  content_ar TEXT,
  featured_image TEXT,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  author_id UUID REFERENCES authors(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'scheduled')),
  published_at TIMESTAMPTZ,
  scheduled_at TIMESTAMPTZ,
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT[],
  og_image TEXT,
  canonical_url TEXT,
  structured_data JSONB,
  robots_meta TEXT DEFAULT 'index,follow',
  schema_type TEXT DEFAULT 'Article',
  view_count INT DEFAULT 0,
  reading_time INT,
  ai_generated BOOLEAN DEFAULT FALSE,
  ai_model TEXT,
  ai_prompt TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL DEFAULT '{}'::JSONB
);

CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_category ON posts(category_id);
CREATE INDEX idx_posts_status ON posts(status);
CREATE INDEX idx_posts_published_at ON posts(published_at DESC NULLS LAST);

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE OR REPLACE FUNCTION public.increment_post_views(post_slug TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE posts p
  SET view_count = COALESCE(p.view_count, 0) + 1
  WHERE p.slug = post_slug
    AND (
      (p.status = 'published' AND p.published_at IS NOT NULL AND p.published_at <= NOW())
      OR (p.status = 'scheduled' AND p.scheduled_at IS NOT NULL AND p.scheduled_at <= NOW())
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

GRANT EXECUTE ON FUNCTION public.increment_post_views(TEXT) TO anon, authenticated;

-- RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY categories_public_read ON categories FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY authors_public_read ON authors FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY posts_public_read ON posts FOR SELECT TO anon, authenticated
  USING (
    (status = 'published' AND published_at IS NOT NULL AND published_at <= NOW())
    OR (status = 'scheduled' AND scheduled_at IS NOT NULL AND scheduled_at <= NOW())
  );

CREATE POLICY posts_admin_all ON posts FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = TRUE))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = TRUE));

CREATE POLICY settings_admin_all ON settings FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = TRUE))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = TRUE));

CREATE POLICY newsletter_insert ON newsletter_subscribers FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY newsletter_admin_read ON newsletter_subscribers FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = TRUE));

CREATE POLICY profiles_self_read ON profiles FOR SELECT TO authenticated
  USING (id = auth.uid());

CREATE POLICY profiles_admin_update ON profiles FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.is_admin = TRUE));

-- Storage bucket for featured images (create bucket "featured" as public in Dashboard, or SQL below if allowed)
INSERT INTO storage.buckets (id, name, public)
VALUES ('featured', 'featured', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY featured_public_read ON storage.objects FOR SELECT TO public
  USING (bucket_id = 'featured');

CREATE POLICY featured_admin_upload ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'featured'
    AND EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = TRUE)
  );

CREATE POLICY featured_admin_update ON storage.objects FOR UPDATE TO authenticated
  USING (
    bucket_id = 'featured'
    AND EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = TRUE)
  );

CREATE POLICY featured_admin_delete ON storage.objects FOR DELETE TO authenticated
  USING (
    bucket_id = 'featured'
    AND EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = TRUE)
  );
