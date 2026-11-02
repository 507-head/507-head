import { redirect, RedirectType } from "next/navigation";

export default function HistoryPage() {
  redirect("/categories/history", RedirectType.replace);
}
