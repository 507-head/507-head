import { redirect, RedirectType } from "next/navigation";

export const instant = false;

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirect(`/categories/${slug}`, RedirectType.replace);
}
