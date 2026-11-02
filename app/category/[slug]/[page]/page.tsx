import { redirect, RedirectType } from "next/navigation";

export const instant = false;

export default async function CategoryPaginationPage({
  params,
}: {
  params: Promise<{ slug: string; page: string }>;
}) {
  const { slug, page } = await params;
  redirect(`/categories/${slug}/${page}`, RedirectType.replace);
}
