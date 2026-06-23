"use client";

import { useEffect, useState } from "react";
import { getFirebaseAnalytics } from "@/lib/firebase";

export default function FirebaseStatus() {
  const [status, setStatus] = useState("Checking...");

  useEffect(() => {
    getFirebaseAnalytics().then((analytics) => {
      if (analytics) {
        setStatus("Firebase Analytics connected");
      } else {
        setStatus("Firebase Analytics unavailable (SSR or unsupported)");
      }
    });
  }, []);

  return (
    <div className="rounded-lg border border-gray-200 p-4">
      <h3 className="text-sm font-semibold text-gray-700">Firebase</h3>
      <p className="mt-1 text-xs text-gray-500">{status}</p>
    </div>
  );
}
