export default function CoursesPage() {
  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm min-h-[500px] flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
        <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      </div>
      <h2 className="text-2xl font-extrabold text-[#0B1B3D] mb-2">Courses</h2>
      <p className="text-gray-500 max-w-md">Browse all available courses and specializations. This section is currently under development.</p>
    </div>
  );
}
