import { getCategories } from "@/lib/content";

export async function GET() {
  const categories = await getCategories();
  return Response.json(
    categories.map(({ slug, name }) => ({ slug, name })),
  );
}
