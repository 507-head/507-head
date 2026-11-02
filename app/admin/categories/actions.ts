"use server";

import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { APPROVED_CATEGORIES } from "@/lib/content";
import { createClient } from "@/lib/supabase/server";

async function getAdminSupabase() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Admin login is required.");
  const { data: profile } = await supabase
    .from("staff_profiles")
    .select("role, is_active")
    .eq("user_id", user.id)
    .maybeSingle();
  if (profile?.role !== "admin" || profile.is_active !== true) {
    throw new Error("Only an active admin can manage categories.");
  }
  return supabase;
}

export async function createCategory(formData: FormData) {
  const supabase = await getAdminSupabase();
  const name = String(formData.get("name") || "").trim();
  const slug = String(formData.get("slug") || "").trim().toLowerCase();
  const description = String(formData.get("description") || "").trim();

  if (!name || !slug) {
    redirect("/admin/categories?category_status=invalid");
  }

  // Ensure slug only contains lowercase letters, numbers, and hyphens
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    redirect("/admin/categories?category_status=invalid");
  }

  const { data: existing } = await supabase
    .from("categories")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();

  if (existing) {
    const { error: updateError } = await supabase
      .from("categories")
      .update({
        name,
        description,
        is_active: true,
        show_on_home: true,
        updated_at: new Date().toISOString(),
      })
      .eq("id", existing.id);

    if (updateError) {
      console.error("Failed to update category in Supabase:", updateError);
      redirect("/admin/categories?category_status=invalid");
    }

    updateTag("categories");
    revalidatePath("/");
    revalidatePath("/admin/categories");
    revalidatePath("/categories");
    redirect("/admin/categories?category_status=updated");
  }

  const { data: maxOrderData } = await supabase
    .from("categories")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();

  const nextOrder = (maxOrderData?.sort_order ?? 0) + 1;

  const { error: insertError } = await supabase.from("categories").insert({
    name,
    slug,
    description,
    sort_order: nextOrder,
    is_active: true,
    show_on_home: true,
  });

  if (insertError) {
    console.error("Failed to insert category into Supabase:", insertError);
    redirect("/admin/categories?category_status=invalid");
  }

  updateTag("categories");
  revalidatePath("/");
  revalidatePath("/admin/categories");
  revalidatePath("/categories");
  redirect("/admin/categories?category_status=created");
}

export async function updateCategory(formData: FormData) {
  const supabase = await getAdminSupabase();
  const id = String(formData.get("id") || "").trim();
  const name = String(formData.get("name") || "").trim();
  const description = String(formData.get("description") || "").trim();

  if (!id || name.length < 2) {
    redirect("/admin/categories?category_status=invalid");
  }

  const { data: category, error: categoryError } = await supabase
    .from("categories")
    .select("slug")
    .eq("id", id)
    .maybeSingle();

  if (categoryError || !category) {
    console.error("Failed to find category for update:", categoryError);
    redirect("/admin/categories?category_status=invalid");
  }

  const { error } = await supabase
    .from("categories")
    .update({ name, description, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    console.error("Failed to update category in Supabase:", error);
    redirect("/admin/categories?category_status=invalid");
  }

  updateTag("categories");
  revalidatePath("/");
  revalidatePath("/categories");
  revalidatePath(`/categories/${category.slug}`);
  revalidatePath("/admin/categories");
  revalidatePath("/sitemap.xml");
  redirect("/admin/categories?category_status=edited");
}

export async function syncApprovedCategories() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Admin login is required.");

  const { data: profile } = await supabase
    .from("staff_profiles")
    .select("role, is_active")
    .eq("user_id", user.id)
    .maybeSingle();

  if (profile?.role !== "admin" || profile.is_active !== true) {
    throw new Error("Only an active admin can sync categories.");
  }

  const { error } = await supabase.from("categories").upsert(
    APPROVED_CATEGORIES.map((category) => ({
      slug: category.slug,
      name: category.name,
      description: category.description,
      sort_order: category.sort_order,
      is_active: true,
      show_on_home: true,
    })),
    { onConflict: "slug" },
  );

  if (error) throw new Error(error.message);

  // These were generated by the legacy editor mapping and are not public categories.
  await supabase
    .from("categories")
    .update({ is_active: false, show_on_home: false })
    .in("slug", ["news", "kheti", "shikhsa"]);

  updateTag("categories");
  revalidatePath("/");
  revalidatePath("/admin/categories");
  revalidatePath("/sitemap.xml");
}
