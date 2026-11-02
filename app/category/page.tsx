import { redirect, RedirectType } from "next/navigation";

export default function CategoryIndexPage() {
  redirect("/categories", RedirectType.replace);
}

