// components/ServiceWorkerManager.tsx
"use client";
import { useEffect, useState } from "react";

export default function ServiceWorkerManager() {
  const [hasUpdate, setHasUpdate] = useState(false);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    const onMessage = (evt: MessageEvent) => {
      // next-pwa sends SKIP_WAITING messages; also check for custom payloads
      if (
        evt.data &&
        (evt.data.type === "SKIP_WAITING" ||
          evt.data === "NEW_VERSION_AVAILABLE")
      ) {
        setHasUpdate(true);
      }
    };

    navigator.serviceWorker.addEventListener("message", onMessage);
    return () =>
      navigator.serviceWorker.removeEventListener("message", onMessage);
  }, []);

  const applyUpdate = async () => {
    const registration = await navigator.serviceWorker.getRegistration();
    if (!registration || !registration.waiting) {
      // fallback: reload
      window.location.reload();
      return;
    }
    // tell waiting SW to skipWaiting
    registration.waiting.postMessage({ type: "SKIP_WAITING" });
    setTimeout(() => window.location.reload(), 500);
  };

  if (!hasUpdate) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-slate-900 text-white px-4 py-2 rounded shadow-lg flex items-center space-x-3">
        <div>New version available</div>
        <button
          onClick={applyUpdate}
          className="bg-white text-slate-900 px-2 py-1 rounded text-sm"
        >
          Refresh
        </button>
      </div>
    </div>
  );
}
