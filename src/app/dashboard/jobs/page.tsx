export default function JobsPage() {
  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm min-h-[500px] flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
        <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      </div>
      <h2 className="text-2xl font-extrabold text-[#0B1B3D] mb-2">Jobs</h2>
      <p className="text-gray-500 max-w-md">Discover your next career opportunity. This section is currently under development.</p>
    </div>
  );
}
