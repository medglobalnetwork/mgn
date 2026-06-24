import { revalidatePath } from "next/cache";
import { Check, X, Eye, ShieldCheck, User } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function AdminVerificationsPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
  
  let requests = [];
  try {
    const res = await fetch(`${apiUrl}/admin/verifications`, { cache: 'no-store' });
    if (res.ok) {
      requests = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch verifications:", error);
  }

  async function approveRequest(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const userId = formData.get("userId") as string;
    const accountType = formData.get("accountType") as string;
    const primaryCategory = formData.get("primaryCategory") as string;
    
    let badgeColor = "blue"; // default for individual professionals
    if (accountType === "organization") badgeColor = "purple";
    else if (primaryCategory === "Medical Student") badgeColor = "green";

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
    await fetch(`${apiUrl}/admin/verifications/approve/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, badge_color: badgeColor })
    });
    
    revalidatePath("/admin/verifications");
  }

  async function rejectRequest(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
    await fetch(`${apiUrl}/admin/verifications/reject/${id}`, {
      method: "POST"
    });
    
    revalidatePath("/admin/verifications");
  }

  return (
    <div className="max-w-6xl mx-auto p-6 lg:p-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-blue-100 text-[#0052CC] rounded-xl">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-[#0B1B3D]">Verification Requests</h1>
          <p className="text-gray-500">Review and approve user identities and degrees.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {requests.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <ShieldCheck className="w-12 h-12 mx-auto text-gray-300 mb-4" />
            <p className="text-lg font-medium">No pending verification requests.</p>
            <p className="text-sm">You are all caught up!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-600 text-sm border-b border-gray-100">
                  <th className="px-6 py-4 font-semibold">User</th>
                  <th className="px-6 py-4 font-semibold">Account Type</th>
                  <th className="px-6 py-4 font-semibold">Document Type</th>
                  <th className="px-6 py-4 font-semibold">Submitted On</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {requests.map((req: any) => (
                  <tr key={req.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-50 text-[#0052CC] rounded-full flex items-center justify-center">
                          <User className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-bold text-[#0B1B3D]">{req.profiles?.full_name || "Unknown User"}</p>
                          <p className="text-xs text-gray-500">{req.profiles?.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full capitalize">
                        {req.profiles?.account_type || "N/A"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-700">{req.document_type}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(req.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <a 
                          href={req.document_url} 
                          target="_blank" 
                          rel="noreferrer"
                          className="p-2 text-gray-500 hover:text-[#0052CC] hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Document"
                        >
                          <Eye className="w-5 h-5" />
                        </a>
                        
                        <form action={approveRequest}>
                          <input type="hidden" name="id" value={req.id} />
                          <input type="hidden" name="userId" value={req.user_id} />
                          <input type="hidden" name="accountType" value={req.profiles?.account_type} />
                          <input type="hidden" name="primaryCategory" value={req.profiles?.primary_category} />
                          <button 
                            type="submit"
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Approve"
                          >
                            <Check className="w-5 h-5" />
                          </button>
                        </form>

                        <form action={rejectRequest}>
                          <input type="hidden" name="id" value={req.id} />
                          <button 
                            type="submit"
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Reject"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
