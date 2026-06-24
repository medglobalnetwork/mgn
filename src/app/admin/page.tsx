import { getSupabaseServer } from "@/lib/supabase";
import { Users, UserPlus, ShieldCheck, Mail, Smartphone, Globe, Activity } from "lucide-react";
import Link from "next/link";

export const revalidate = 60; // Refresh every 60 seconds

export default async function AdminDashboard() {
  const supabase = getSupabaseServer();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Queries
  const [
    { count: totalUsers },
    { count: newUsersToday },
    { count: googleUsers },
    { count: emailUsers },
    { count: phoneUsers },
    { count: verifiedUsers },
    { count: activeUsers }
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('profiles').select('*', { count: 'exact', head: true }).gte('created_at', today.toISOString()),
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('provider', 'google'),
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('provider', 'email'),
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('provider', 'phone'),
    supabase.from('professional_identities').select('*', { count: 'exact', head: true }).eq('is_verified', true),
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('status', 'active')
  ]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Link href="/">
            <img src="/logo.svg" alt="MGN Logo" className="h-6" />
          </Link>
          <div className="w-px h-6 bg-gray-300"></div>
          <h1 className="font-bold text-gray-800 text-lg">Admin Analytics</h1>
        </div>
        <div className="flex items-center gap-3 text-sm font-medium text-gray-600">
          Admin User
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-6 lg:p-8 space-y-8">
        <div>
          <h2 className="text-2xl font-black text-[#0B1B3D] mb-2">Platform Overview</h2>
          <p className="text-gray-500">Real-time statistics of the MGN network</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Users" value={totalUsers || 0} icon={<Users className="w-6 h-6 text-blue-600" />} bgColor="bg-blue-50" />
          <StatCard title="New Users Today" value={newUsersToday || 0} icon={<UserPlus className="w-6 h-6 text-green-600" />} bgColor="bg-green-50" />
          <StatCard title="Verified Users" value={verifiedUsers || 0} icon={<ShieldCheck className="w-6 h-6 text-purple-600" />} bgColor="bg-purple-50" />
          <StatCard title="Active Users" value={activeUsers || 0} icon={<Activity className="w-6 h-6 text-emerald-600" />} bgColor="bg-emerald-50" />
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-4 mt-8">Authentication Methods</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard title="Google Logins" value={googleUsers || 0} icon={<Globe className="w-6 h-6 text-orange-600" />} bgColor="bg-orange-50" />
            <StatCard title="Email Logins" value={emailUsers || 0} icon={<Mail className="w-6 h-6 text-indigo-600" />} bgColor="bg-indigo-50" />
            <StatCard title="Phone Logins" value={phoneUsers || 0} icon={<Smartphone className="w-6 h-6 text-cyan-600" />} bgColor="bg-cyan-50" />
          </div>
        </div>

      </main>
    </div>
  );
}

function StatCard({ title, value, icon, bgColor }: { title: string, value: number, icon: React.ReactNode, bgColor: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex items-start gap-4">
      <div className={`w-12 h-12 rounded-lg ${bgColor} flex items-center justify-center shrink-0`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-500 mb-1">{title}</p>
        <p className="text-3xl font-black text-gray-900">{value}</p>
      </div>
    </div>
  );
}
