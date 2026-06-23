export default function LearningPage() {
  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm min-h-[500px] flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
        <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path></svg>
      </div>
      <h2 className="text-2xl font-extrabold text-[#0B1B3D] mb-2">My Learning</h2>
      <p className="text-gray-500 max-w-md">Track your courses, certifications, and learning paths. This section is currently under development.</p>
    </div>
  );
}
