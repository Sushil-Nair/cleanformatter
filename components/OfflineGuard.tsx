// components/OfflineGuard.tsx
"use client";
import { useEffect, useState } from "react";

export default function OfflineGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const [online, setOnline] = useState<boolean>(() =>
    typeof navigator !== "undefined" ? navigator.onLine : true
  );

  useEffect(() => {
    const onOnline = () => setOnline(true);
    const onOffline = () => setOnline(false);
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  if (online) {
    return <>{children}</>;
  }

  // Offline: show gentle CTA and keep the app shell available
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6">
      <div className="max-w-xl text-center">
        <h2 className="text-2xl font-semibold mb-3">
          You're offline — tools need internet
        </h2>
        <p className="mb-4 text-muted-foreground">
          The Clean Formatter app is still available offline, but this tool
          requires a network connection so ads and other features can load.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-sky-600 text-white rounded"
          >
            Retry
          </button>
          <button
            onClick={() => {
              // Let user open network settings on mobile? Just suggest.
              alert("Toggle Wi-Fi or mobile data and then tap Retry.");
            }}
            className="px-4 py-2 border rounded"
          >
            How to connect
          </button>
        </div>
        <p className="mt-4 text-sm text-slate-500">
          Tip: the app shell loads instantly — you can still browse other pages.
          Tools require internet so we can serve fresh results and load ads.
        </p>
      </div>
    </div>
  );
}
