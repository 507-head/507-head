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
  const slug = String(formData.get("slug") || "")
    .trim()
    .toLowerCase();
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
      redirect(
        `/admin/categories?category_status=error&message=${encodeURIComponent(updateError.message || "श्रेणी अपडेट करने में विफल")}`,
      );
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
    redirect(
      `/admin/categories?category_status=error&message=${encodeURIComponent(insertError.message || "श्रेणी जोड़ने में विफल")}`,
    );
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
    redirect(
      `/admin/categories?category_status=error&message=${encodeURIComponent(error.message || "श्रेणी अपडेट करने में विफल")}`,
    );
  }

  updateTag("categories");
  revalidatePath("/");
  revalidatePath("/categories");
  revalidatePath(`/categories/${category.slug}`);
  revalidatePath("/admin/categories");
  revalidatePath("/sitemap.xml");
  redirect("/admin/categories?category_status=edited");
}

export async function deleteCategory(formData: FormData) {
  const supabase = await getAdminSupabase();
  const id = String(formData.get("id") || "").trim();
  const slug = String(formData.get("slug") || "")
    .trim()
    .toLowerCase();

  if (!id && !slug) {
    redirect("/admin/categories?category_status=invalid");
  }

  // Find category first
  let query = supabase.from("categories").select("id, name, slug");
  const isUuid =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

  if (isUuid) {
    query = query.eq("id", id);
  } else if (slug) {
    query = query.eq("slug", slug);
  } else {
    redirect("/admin/categories?category_status=invalid");
  }

  const { data: category, error: fetchError } = await query.maybeSingle();

  if (fetchError || !category) {
    redirect(
      `/admin/categories?category_status=error&message=${encodeURIComponent("श्रेणी नहीं मिली या पहले ही हटा दी गई है।")}`,
    );
  }

  // Check if any articles are linked to this category
  const { count, error: countError } = await supabase
    .from("articles")
    .select("id", { count: "exact", head: true })
    .eq("category_id", category.id);

  if (!countError && typeof count === "number" && count > 0) {
    redirect(
      `/admin/categories?category_status=error&message=${encodeURIComponent(
        `इस श्रेणी ('${category.name}') से जुड़े ${count} लेख मौजूद हैं। पहले उन लेखों की श्रेणी बदलें या उन्हें हटाएं।`,
      )}`,
    );
  }

  const { error: deleteError } = await supabase
    .from("categories")
    .delete()
    .eq("id", category.id);

  if (deleteError) {
    console.error("Failed to delete category from Supabase:", deleteError);
    redirect(
      `/admin/categories?category_status=error&message=${encodeURIComponent(
        deleteError.message || "श्रेणी हटाने में समस्या आई।",
      )}`,
    );
  }

  updateTag("categories");
  revalidatePath("/");
  revalidatePath("/categories");
  revalidatePath(`/categories/${category.slug}`);
  revalidatePath("/admin/categories");
  revalidatePath("/sitemap.xml");
  redirect("/admin/categories?category_status=deleted");
}

export async function reorderCategory(formData: FormData) {
  const supabase = await getAdminSupabase();
  const id = String(formData.get("id") || "").trim();
  const slug = String(formData.get("slug") || "")
    .trim()
    .toLowerCase();
  const targetPosition = parseInt(
    String(formData.get("targetPosition") || "0"),
    10,
  );

  if ((!id && !slug) || !targetPosition || targetPosition < 1) {
    redirect("/admin/categories?category_status=invalid");
  }

  // Fetch all active categories ordered by sort_order
  const { data: categories, error: fetchError } = await supabase
    .from("categories")
    .select("id, slug, sort_order")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (fetchError || !categories || categories.length === 0) {
    console.error("Failed to fetch categories for reordering:", fetchError);
    redirect(
      `/admin/categories?category_status=error&message=${encodeURIComponent("श्रेणियाँ लोड नहीं हो सकीं।")}`,
    );
  }

  // Find the category to move
  const currentIndex = categories.findIndex(
    (c) => c.id === id || (slug && c.slug === slug),
  );

  if (currentIndex === -1) {
    redirect(
      `/admin/categories?category_status=error&message=${encodeURIComponent("श्रेणी नहीं मिली।")}`,
    );
  }

  // Target index clamped between 0 and categories.length - 1
  const targetIndex = Math.max(
    0,
    Math.min(categories.length - 1, targetPosition - 1),
  );

  if (currentIndex === targetIndex) {
    redirect("/admin/categories");
  }

  // Reorder in memory
  const reordered = [...categories];
  const [movedItem] = reordered.splice(currentIndex, 1);
  reordered.splice(targetIndex, 0, movedItem);

  // Update sort_order for categories whose order changed
  for (let i = 0; i < reordered.length; i++) {
    const newSortOrder = i + 1;
    if (reordered[i].sort_order !== newSortOrder) {
      const { error: updateError } = await supabase
        .from("categories")
        .update({
          sort_order: newSortOrder,
          updated_at: new Date().toISOString(),
        })
        .eq("id", reordered[i].id);

      if (updateError) {
        console.error(
          `Failed to update sort_order for category ${reordered[i].id}:`,
          updateError,
        );
      }
    }
  }

  updateTag("categories");
  revalidatePath("/");
  revalidatePath("/categories");
  revalidatePath("/admin/categories");
  revalidatePath("/sitemap.xml");
  redirect("/admin/categories?category_status=reordered");
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
