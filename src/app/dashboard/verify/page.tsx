"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Upload, FileText, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function VerifyPage() {
  const [file, setFile] = useState<File | null>(null);
  const [docType, setDocType] = useState("Degree Certificate");
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    setStatus("idle");
    setErrorMsg("");

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");

      const fileExt = file.name.split('.').pop();
      const fileName = `${session.user.id}-${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from('documents')
        .getPublicUrl(filePath);

      const publicUrl = publicUrlData.publicUrl;

      const res = await fetch("/api/verification/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: session.user.id,
          document_type: docType,
          document_url: publicUrl
        })
      });

      if (!res.ok) throw new Error("Failed to submit request to backend");

      setStatus("success");
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setErrorMsg(err.message || "Failed to upload document");
    } finally {
      setUploading(false);
    }
  };

  if (status === "success") {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold mb-2 text-[#0B1B3D]">Document Submitted!</h2>
          <p className="text-gray-500 mb-6">Our admin team will review your document and verify your profile within 24-48 hours.</p>
          <button 
            onClick={() => router.push("/dashboard")}
            className="bg-[#0052CC] text-white px-6 py-3 rounded-lg font-bold w-full hover:bg-blue-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 lg:p-12">
      <h1 className="text-3xl font-black text-[#0B1B3D] mb-2">Verify Your Identity</h1>
      <p className="text-gray-500 mb-8">Upload your professional documents to get the verified badge and unlock premium networking features.</p>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Primary Verification Document (Required)</label>
          <p className="text-xs text-gray-500 mb-3">Please upload at least one official document to verify your genuineness. Additional documents are optional.</p>
          <select 
            value={docType}
            onChange={(e) => setDocType(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0052CC]/50"
          >
            <option value="Degree Certificate">Degree Certificate (MBBS, MD, B.Sc, etc.)</option>
            <option value="Medical Council Registration">Medical Council Registration</option>
            <option value="Organization ID Card">Organization/Hospital ID Card</option>
            <option value="Student ID Card">Student ID Card</option>
            <option value="Other">Other Official Document</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Upload Document</label>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
            <input 
              type="file" 
              accept="image/jpeg,image/png,application/pdf"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            {file ? (
              <div className="flex flex-col items-center">
                <FileText className="w-10 h-10 text-[#0052CC] mb-2" />
                <p className="font-semibold text-gray-700">{file.name}</p>
                <p className="text-xs text-gray-500 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <Upload className="w-10 h-10 text-gray-400 mb-2" />
                <p className="font-medium text-gray-600">Click or drag file to upload</p>
                <p className="text-xs text-gray-400 mt-1">Supports JPG, PNG, PDF (Max 5MB)</p>
              </div>
            )}
          </div>
        </div>

        {status === "error" && (
          <div className="p-4 bg-red-50 text-red-700 rounded-xl flex gap-3 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p>{errorMsg}</p>
          </div>
        )}

        <button 
          type="submit"
          disabled={!file || uploading}
          className="w-full bg-[#0052CC] text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
        >
          {uploading ? (
            <><Loader2 className="w-5 h-5 animate-spin" /> Uploading...</>
          ) : "Submit for Verification"}
        </button>
      </form>
    </div>
  );
}
