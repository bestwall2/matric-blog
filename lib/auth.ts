import type { SupabaseClient } from "@supabase/supabase-js";

export async function getIsAdmin(client: SupabaseClient): Promise<boolean> {
  const {
    data: { user },
  } = await client.auth.getUser();
  if (!user) return false;
  const { data, error } = await client
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .maybeSingle();
  if (error || !data) return false;
  return !!data.is_admin;
}
