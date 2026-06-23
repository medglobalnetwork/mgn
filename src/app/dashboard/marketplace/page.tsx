export default function MarketplacePage() {
  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm min-h-[500px] flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
        <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
      </div>
      <h2 className="text-2xl font-extrabold text-[#0B1B3D] mb-2">Marketplace</h2>
      <p className="text-gray-500 max-w-md">Explore new tools, resources, and services. This section is currently under development.</p>
    </div>
  );
}
