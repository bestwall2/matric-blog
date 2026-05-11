-- Sample data (optional)
INSERT INTO authors (name, bio, email)
SELECT 'تحرير MatricBlog',
       'فريق تحرير متخصص في البث الرياضي والتقنية للقارئ العربي.',
       'editor@example.com'
WHERE NOT EXISTS (
  SELECT 1 FROM authors WHERE email = 'editor@example.com'
);

INSERT INTO categories (name, name_ar, slug, description, color)
VALUES
  ('Streaming', 'البث الرياضي', 'streaming', 'أفضل الممارسات لمشاهدة المباريات بأمان.', '#e11d48'),
  ('Football', 'كرة القدم', 'football', 'تحليلات وتغطيات كروية موضوعية.', '#38bdf8'),
  ('Tech Guides', 'أدلة تقنية', 'tech', 'شروحات عملية للأدوات والخدمات الرقمية.', '#a855f7')
ON CONFLICT (slug) DO NOTHING;
