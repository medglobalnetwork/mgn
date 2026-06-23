import Image from "next/image";
import Link from "next/link";

export default function HowItWorksPage() {
  return (
    <div className="flex flex-col w-full bg-[#F8FAFC] font-sans text-[#1F2937] overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="relative w-full bg-white pt-16 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="flex flex-col items-start">
            <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full mb-6">How It Works</span>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-[#0B1B3D] leading-[1.1] tracking-tight">
              Simple Steps.<br />
              <span className="text-[#00A67E]">Endless Opportunities.</span>
            </h1>
            <p className="mt-6 text-[#4B5563] text-lg font-medium leading-relaxed max-w-lg">
              MGN makes it easy for healthcare professionals, students, organizations, and businesses to connect, collaborate, learn, and grow – all in one platform.
            </p>
            
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 mt-8 font-semibold text-sm text-[#374151]">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#0052CC]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Trusted & Secure
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#00A67E]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                Verified Community
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#00A67E]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                Smart Connections
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#0052CC]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z" /></svg>
                Privacy First
              </div>
            </div>
          </div>
          
          <div className="relative w-full h-[400px] lg:h-[500px] bg-gray-50 rounded-full flex items-center justify-center border border-dashed border-gray-200">
             <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <p className="text-gray-400 font-medium">Replace with Network Graphic<br/>(src="/network-hero.png")</p>
             </div>
          </div>
        </div>
      </section>

      {/* 6 Steps Section */}
      <section className="w-full py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center mb-16">
           <h2 className="text-3xl lg:text-4xl font-black text-[#0B1B3D]">How MGN Works</h2>
        </div>
        
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative">
           {/* Connecting Dashed Line */}
           <div className="hidden lg:block absolute top-6 left-[8%] right-[8%] h-0.5 border-t-2 border-dashed border-gray-200 z-0"></div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 relative z-10">
              
              {/* Step 1 */}
              <div className="flex flex-col items-center">
                 <div className="w-10 h-10 rounded-full bg-[#0052CC] text-white flex items-center justify-center font-black text-lg mb-8 shadow-md">1</div>
                 <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm w-full flex flex-col items-center text-center h-full">
                    <div className="w-12 h-12 bg-blue-50 text-[#0052CC] rounded-full flex items-center justify-center mb-4">
                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
                    </div>
                    <h3 className="text-lg font-bold text-[#0B1B3D] mb-2 leading-tight">Create Your<br/>Account</h3>
                    <p className="text-xs text-[#4B5563] font-medium leading-relaxed mb-6">Sign up in seconds and choose your role – professional, student, or organization.</p>
                    
                    {/* Mockup Placeholder */}
                    <div className="mt-auto w-full bg-gray-50 border border-gray-100 rounded-lg p-3 text-left">
                       <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                          <div className="h-2 w-16 bg-gray-200 rounded-full"></div>
                       </div>
                       <div className="h-1.5 w-full bg-gray-200 rounded-full mb-1.5"></div>
                       <div className="h-1.5 w-3/4 bg-blue-500 rounded-full"></div>
                    </div>
                 </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center">
                 <div className="w-10 h-10 rounded-full bg-[#00A67E] text-white flex items-center justify-center font-black text-lg mb-8 shadow-md">2</div>
                 <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm w-full flex flex-col items-center text-center h-full">
                    <div className="w-12 h-12 bg-green-50 text-[#00A67E] rounded-full flex items-center justify-center mb-4">
                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                    </div>
                    <h3 className="text-lg font-bold text-[#0B1B3D] mb-2 leading-tight">Complete Your<br/>Profile</h3>
                    <p className="text-xs text-[#4B5563] font-medium leading-relaxed mb-6">Add your details, education, experience and interests to personalize your experience.</p>
                    
                    <div className="mt-auto w-full bg-gray-50 border border-gray-100 rounded-lg p-3 text-left">
                       <div className="flex justify-between items-center mb-2">
                         <span className="text-[10px] font-bold text-gray-400">Profile Strength</span>
                         <span className="text-[10px] font-bold text-green-600">85%</span>
                       </div>
                       <div className="h-1.5 w-full bg-gray-200 rounded-full mb-3"><div className="h-1.5 w-[85%] bg-green-500 rounded-full"></div></div>
                       <div className="space-y-2">
                         <div className="flex gap-2 items-center"><div className="w-3 h-3 rounded-full bg-green-100 flex items-center justify-center text-green-600"><svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg></div><div className="h-1 w-12 bg-gray-200"></div></div>
                         <div className="flex gap-2 items-center"><div className="w-3 h-3 rounded-full bg-green-100 flex items-center justify-center text-green-600"><svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg></div><div className="h-1 w-16 bg-gray-200"></div></div>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center">
                 <div className="w-10 h-10 rounded-full bg-blue-400 text-white flex items-center justify-center font-black text-lg mb-8 shadow-md">3</div>
                 <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm w-full flex flex-col items-center text-center h-full">
                    <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-4">
                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>
                    </div>
                    <h3 className="text-lg font-bold text-[#0B1B3D] mb-2 leading-tight">Get Verified<br/>&nbsp;</h3>
                    <p className="text-xs text-[#4B5563] font-medium leading-relaxed mb-6">Verify your identity and credentials to build trust and unlock more opportunities.</p>
                    
                    <div className="mt-auto w-full bg-gray-50 border border-gray-100 rounded-lg p-3 flex flex-col items-center justify-center">
                       <div className="flex items-center justify-center gap-2 mb-2">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                          <span className="text-xs font-bold text-gray-700">Verified Profile</span>
                       </div>
                       <div className="h-1.5 w-16 bg-gray-200 rounded-full"></div>
                    </div>
                 </div>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col items-center">
                 <div className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center font-black text-lg mb-8 shadow-md">4</div>
                 <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm w-full flex flex-col items-center text-center h-full">
                    <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-4">
                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                    </div>
                    <h3 className="text-lg font-bold text-[#0B1B3D] mb-2 leading-tight">Connect &<br/>Network</h3>
                    <p className="text-xs text-[#4B5563] font-medium leading-relaxed mb-6">Discover and connect with professionals, organizations, and peers in healthcare.</p>
                    
                    <div className="mt-auto w-full bg-gray-50 border border-gray-100 rounded-lg p-3">
                       <div className="flex items-center gap-[-4px] mb-2 justify-center">
                          <div className="w-6 h-6 bg-gray-300 rounded-full border-2 border-white"></div>
                          <div className="w-6 h-6 bg-gray-400 rounded-full border-2 border-white -ml-2"></div>
                          <div className="w-6 h-6 bg-gray-500 rounded-full border-2 border-white -ml-2"></div>
                          <div className="w-6 h-6 bg-blue-100 text-[8px] flex items-center justify-center rounded-full border-2 border-white -ml-2 font-bold text-blue-600">+120</div>
                       </div>
                       <div className="flex justify-center"><div className="h-1.5 w-16 bg-gray-200 rounded-full"></div></div>
                    </div>
                 </div>
              </div>

              {/* Step 5 */}
              <div className="flex flex-col items-center">
                 <div className="w-10 h-10 rounded-full bg-orange-400 text-white flex items-center justify-center font-black text-lg mb-8 shadow-md">5</div>
                 <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm w-full flex flex-col items-center text-center h-full">
                    <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mb-4">
                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path></svg>
                    </div>
                    <h3 className="text-lg font-bold text-[#0B1B3D] mb-2 leading-tight">Learn &<br/>Engage</h3>
                    <p className="text-xs text-[#4B5563] font-medium leading-relaxed mb-6">Access courses, certifications, events, and resources to enhance your knowledge.</p>
                    
                    <div className="mt-auto w-full bg-gray-50 border border-gray-100 rounded-lg p-3 text-left">
                       <div className="flex gap-2 items-center mb-2">
                         <div className="w-5 h-5 bg-blue-100 rounded flex items-center justify-center"><svg className="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L1 12h3v9h6v-6h4v6h6v-9h3L12 2z"/></svg></div>
                         <div className="h-2 w-20 bg-gray-300 rounded"></div>
                       </div>
                       <div className="h-1.5 w-full bg-gray-200 rounded-full mb-2"></div>
                       <div className="flex justify-end"><svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></div>
                    </div>
                 </div>
              </div>

              {/* Step 6 */}
              <div className="flex flex-col items-center">
                 <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-lg mb-8 shadow-md">6</div>
                 <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm w-full flex flex-col items-center text-center h-full">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    </div>
                    <h3 className="text-lg font-bold text-[#0B1B3D] mb-2 leading-tight">Explore &<br/>Grow</h3>
                    <p className="text-xs text-[#4B5563] font-medium leading-relaxed mb-6">Find jobs, explore opportunities, collaborate, and advance your career.</p>
                    
                    <div className="mt-auto w-full bg-gray-50 border border-gray-100 rounded-lg p-3 text-left">
                       <div className="flex justify-between mb-1">
                          <span className="text-[10px] font-bold text-gray-700">Senior Doctor</span>
                          <svg className="w-3 h-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>
                       </div>
                       <div className="text-[8px] text-gray-400 mb-2">Apollo Hospitals</div>
                       <div className="inline-flex items-center gap-1 bg-green-50 text-green-600 px-1.5 py-0.5 rounded text-[8px] font-bold">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div> Full-time
                       </div>
                    </div>
                 </div>
              </div>

           </div>
        </div>
      </section>

      {/* Why It Works */}
      <section className="w-full py-20 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
           <h2 className="text-3xl font-black text-[#0B1B3D] text-center mb-12">Why It Works</h2>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div className="flex flex-col items-center">
                 <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center text-[#00A67E] mb-4">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                 </div>
                 <h4 className="text-lg font-bold text-[#0B1B3D] mb-2">One Unified Platform</h4>
                 <p className="text-sm text-[#4B5563] font-medium leading-relaxed">All your professional needs in one place.</p>
              </div>
              <div className="flex flex-col items-center">
                 <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-[#0052CC] mb-4">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"></path></svg>
                 </div>
                 <h4 className="text-lg font-bold text-[#0B1B3D] mb-2">Right Opportunities</h4>
                 <p className="text-sm text-[#4B5563] font-medium leading-relaxed">AI-powered matchmaking connects you with the right people and opportunities.</p>
              </div>
              <div className="flex flex-col items-center">
                 <div className="w-14 h-14 bg-purple-50 rounded-full flex items-center justify-center text-purple-600 mb-4">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                 </div>
                 <h4 className="text-lg font-bold text-[#0B1B3D] mb-2">Trusted Community</h4>
                 <p className="text-sm text-[#4B5563] font-medium leading-relaxed">Verified profiles and secure environment ensure trust and safety.</p>
              </div>
              <div className="flex flex-col items-center">
                 <div className="w-14 h-14 bg-orange-50 rounded-full flex items-center justify-center text-orange-500 mb-4">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                 </div>
                 <h4 className="text-lg font-bold text-[#0B1B3D] mb-2">Grow Together</h4>
                 <p className="text-sm text-[#4B5563] font-medium leading-relaxed">Continuous learning, collaboration, and growth for a better tomorrow.</p>
              </div>
           </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="w-full pb-10 pt-16 bg-[#F8FAFC] px-6 lg:px-12">
         <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-xl bg-gradient-to-r from-[#2463EB] to-[#4F84F6] text-white flex flex-col md:flex-row items-center justify-between">
            <div className="p-10 lg:p-14 md:w-1/2 flex flex-col items-start relative z-10">
               <h3 className="text-3xl lg:text-4xl font-black mb-4 leading-tight">Ready to Start Your<br/>Journey?</h3>
               <p className="text-blue-100 font-medium mb-8 max-w-sm">Join thousands of healthcare professionals and organizations building the future together.</p>
               <div className="flex flex-wrap gap-4">
                 <Link href="/auth/signup" className="bg-white text-[#0052CC] font-bold px-8 py-3 rounded-lg shadow-md hover:bg-gray-50 transition-colors flex items-center gap-2">
                   Create Your Account - It's Free
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                 </Link>
                 <Link href="/features" className="bg-transparent border border-blue-200 text-white font-bold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors">
                   Explore Features
                 </Link>
               </div>
            </div>
            
            <div className="md:w-1/2 h-[300px] relative flex items-end justify-end">
               <div className="absolute top-0 right-0 w-full h-full opacity-20" style={{ backgroundImage: "radial-gradient(circle at 100% 50%, white 0%, transparent 50%)"}}></div>
               <div className="w-full h-full bg-white/5 flex items-center justify-center p-8">
                 <svg className="w-24 h-24 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
               </div>
            </div>
         </div>
      </section>

      {/* Trusted By Logos */}
      <section className="w-full py-12 bg-[#F8FAFC]">
         <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
            <p className="text-sm font-bold text-gray-500 mb-8">Trusted by 10,000+ Healthcare Professionals and Organizations</p>
            <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-300">
               <div className="text-2xl font-black text-gray-800 flex items-center gap-2"><div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center text-white"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2z"/></svg></div> Apollo</div>
               <div className="text-2xl font-black text-gray-800 flex items-center gap-2"><span className="text-blue-600 text-3xl">*</span> MAX</div>
               <div className="text-2xl font-black text-gray-800 flex items-center gap-2"><div className="w-8 h-8 rounded-full border-4 border-gray-800"></div> AIIMS</div>
               <div className="text-2xl font-black text-gray-800 flex items-center gap-2"><div className="w-6 h-6 bg-green-600 rotate-45"></div> Fortis</div>
               <div className="text-2xl font-black text-gray-800">Narayana</div>
               <div className="text-2xl font-black text-gray-800 flex items-center gap-2">Manipal</div>
               <div className="text-2xl font-black text-gray-800 flex items-center gap-2"><svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg> Medanta</div>
            </div>
         </div>
      </section>

    </div>
  );
}
