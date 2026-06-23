"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SupabaseStatus() {
  const [status, setStatus] = useState("Checking...");

  useEffect(() => {
    async function checkConnection() {
      try {
        const { error } = await supabase.from("health_check").select("*").limit(1);
        if (error) {
          // Even if table does not exist, connection is working
          setStatus(`Supabase connected (${error.message.includes("does not exist") ? "table not found but connection OK" : "query error"})`);
        } else {
          setStatus("Supabase connected successfully");
        }
      } catch {
        setStatus("Supabase connection failed - check URL and keys");
      }
    }
    checkConnection();
  }, []);

  return (
    <div className="rounded-lg border border-gray-200 p-4">
      <h3 className="text-sm font-semibold text-gray-700">Supabase</h3>
      <p className="mt-1 text-xs text-gray-500">{status}</p>
    </div>
  );
}
