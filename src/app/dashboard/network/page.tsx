export default function NetworkPage() {
  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm min-h-[500px] flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
        <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
      </div>
      <h2 className="text-2xl font-extrabold text-[#0B1B3D] mb-2">My Network</h2>
      <p className="text-gray-500 max-w-md">Connect with peers, mentors, and experts in your field. This section is currently under development.</p>
    </div>
  );
}
