"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (password.length < 8) {
      setMessage("Password कम से कम 8 characters का रखें। ");
      return;
    }
    if (password !== confirmPassword) {
      setMessage("दोनों password एक जैसे नहीं हैं।");
      return;
    }

    setSaving(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });
    setSaving(false);

    if (error) {
      setMessage("Reset link valid नहीं है या expire हो गया है। नया reset link खोलें।");
      return;
    }

    window.location.assign("/admin/login");
  }

  return (
    <main className="min-h-screen bg-[#f7f3ed] p-6 text-[#29231e] md:p-10">
      <section className="mx-auto mt-16 max-w-md rounded-2xl border border-[#e7ddd0] bg-[#F7F6EE] p-6 shadow-sm md:p-8">
        <p className="text-sm font-bold uppercase tracking-widest text-[#8a4b1f]">507 Head</p>
        <h1 className="mt-2 text-3xl font-bold">नया Password सेट करें</h1>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="नया password"
            className="w-full rounded-xl border border-[#e7ddd0] px-4 py-3"
          />
          <input
            type="password"
            required
            minLength={8}
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="नया password फिर से लिखें"
            className="w-full rounded-xl border border-[#e7ddd0] px-4 py-3"
          />
          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-xl bg-[#8a4b1f] px-5 py-3 font-bold text-white disabled:opacity-50"
          >
            {saving ? "Save हो रहा है..." : "Password बदलें"}
          </button>
          {message && <p role="status" className="text-sm text-red-700">{message}</p>}
        </form>
      </section>
    </main>
  );
}
