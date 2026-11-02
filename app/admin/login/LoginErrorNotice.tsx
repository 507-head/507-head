"use client";

import { useEffect, useState } from "react";

interface LoginErrorNoticeProps {
  message: string;
}

export default function LoginErrorNotice({ message }: LoginErrorNoticeProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Clean up URL so page refresh won't show the error again
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (url.searchParams.has("error")) {
        url.searchParams.delete("error");
        window.history.replaceState({}, "", url.pathname);
      }
    }

    // Auto-dismiss after 3 seconds
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="login-error" role="alert">
      <span>!</span>
      {message}
    </div>
  );
}

