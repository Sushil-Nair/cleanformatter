// components/OnlineStatus.tsx
"use client";
import { useEffect, useState } from "react";

export default function OnlineStatus() {
  const [online, setOnline] = useState(() =>
    typeof navigator !== "undefined" ? navigator.onLine : true
  );

  useEffect(() => {
    const goOnline = () => setOnline(true);
    const goOffline = () => setOnline(false);
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  return (
    <div
      aria-hidden
      className={`fixed top-4 right-4 z-50 transition-opacity ${
        online ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="bg-primary px-3 py-1 rounded shadow">Offline</div>
    </div>
  );
}
