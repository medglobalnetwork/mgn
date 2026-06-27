export default function ConnectionsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1B3D]">Connections</h1>
      </div>
      <div className="bg-white border border-gray-100 rounded-2xl p-12 shadow-sm flex flex-col items-center justify-center text-center gap-4 min-h-[400px]">
        <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-2">
          <svg className="w-8 h-8 text-[#0052CC]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
        </div>
        <div>
          <h2 className="text-xl font-bold text-[#0B1B3D] mb-2">Coming Soon</h2>
          <p className="text-gray-500 max-w-md mx-auto">
            We are actively building the Connections experience. Check back soon for updates.
          </p>
        </div>
      </div>
    </div>
  );
}