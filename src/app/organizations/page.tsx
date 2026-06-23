import Image from "next/image";
import Link from "next/link";

export default function OrganizationsPage() {
  return (
    <div className="flex flex-col w-full bg-[#F8FAFC] font-sans text-[#1F2937] overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-br from-blue-50/50 via-white to-blue-50/30 pt-10 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="flex flex-col items-start">
            
            {/* Breadcrumb */}
            <nav className="flex text-xs font-semibold text-gray-500 mb-8" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-2">
                <li className="inline-flex items-center">
                  <Link href="/" className="hover:text-[#0052CC]">Home</Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg className="w-3 h-3 mx-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                    <span className="text-[#0052CC]">For Organizations</span>
                  </div>
                </li>
              </ol>
            </nav>

            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-[#0B1B3D] leading-[1.1] tracking-tight">
              Healthcare Growth<br />
              Solutions for <span className="text-[#00A67E]">Organizations</span>
            </h1>
            <p className="mt-6 text-[#4B5563] text-lg font-medium leading-relaxed max-w-lg">
              MGN empowers healthcare organizations with the right tools, talent, and technology to grow, collaborate, and deliver better outcomes.
            </p>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <svg className="w-8 h-8 text-[#0052CC] mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                <span className="text-xs font-bold text-[#0B1B3D]">Verified<br/>Professionals</span>
              </div>
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <svg className="w-8 h-8 text-[#0052CC] mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                <span className="text-xs font-bold text-[#0B1B3D]">Smart Hiring<br/>Tools</span>
              </div>
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <svg className="w-8 h-8 text-[#0052CC] mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                <span className="text-xs font-bold text-[#0B1B3D]">Trusted<br/>Network</span>
              </div>
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <svg className="w-8 h-8 text-[#0052CC] mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                <span className="text-xs font-bold text-[#0B1B3D]">Scalable<br/>Solutions</span>
              </div>
            </div>
          </div>
          
          <div className="relative w-full h-[400px] lg:h-[550px] bg-white rounded-3xl shadow-xl overflow-hidden flex items-center justify-center border border-gray-100 mt-8 lg:mt-0">
             <div className="absolute inset-0 bg-gray-50 flex flex-col items-center justify-center text-center p-6">
                <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                <p className="text-gray-400 font-medium">Replace with Hero Organization Team Image<br/>(src="/org-team.png")</p>
             </div>
          </div>
        </div>
      </section>

      {/* Solutions Tailored for Every Type */}
      <section className="w-full py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center mb-16">
           <h2 className="text-3xl lg:text-4xl font-black text-[#0B1B3D] mb-4">Solutions Tailored for Every Type of Organization</h2>
           <p className="text-[#4B5563] font-medium leading-relaxed">Choose your organization type to explore dedicated solutions and benefits.</p>
        </div>
        
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Card 1 */}
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all flex flex-col h-full">
                 <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-50 text-[#0052CC] rounded-xl flex items-center justify-center shrink-0">
                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                    </div>
                    <h3 className="text-lg font-black text-[#0B1B3D]">Hospitals</h3>
                 </div>
                 <p className="text-xs text-[#4B5563] font-medium leading-relaxed mb-6 flex-grow">Streamline operations, hire the best talent, and improve patient care outcomes.</p>
                 <Link href="/organizations/hospitals" className="text-[#0052CC] font-bold text-sm hover:text-blue-700 flex items-center gap-1 transition-colors w-fit">
                    Explore <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                 </Link>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all flex flex-col h-full">
                 <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-green-50 text-[#00A67E] rounded-xl flex items-center justify-center shrink-0">
                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path></svg>
                    </div>
                    <h3 className="text-lg font-black text-[#0B1B3D] leading-tight">Colleges &<br/>Universities</h3>
                 </div>
                 <p className="text-xs text-[#4B5563] font-medium leading-relaxed mb-6 flex-grow">Enhance placement, manage alumni, and empower students with career opportunities.</p>
                 <Link href="/organizations/colleges-universities" className="text-[#0052CC] font-bold text-sm hover:text-blue-700 flex items-center gap-1 transition-colors w-fit">
                    Explore <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                 </Link>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all flex flex-col h-full">
                 <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center shrink-0">
                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                    </div>
                    <h3 className="text-lg font-black text-[#0B1B3D] leading-tight">Training<br/>Institutes</h3>
                 </div>
                 <p className="text-xs text-[#4B5563] font-medium leading-relaxed mb-6 flex-grow">Promote courses, generate leads, and build credibility in the healthcare education space.</p>
                 <Link href="/organizations/training-institutes" className="text-[#0052CC] font-bold text-sm hover:text-blue-700 flex items-center gap-1 transition-colors w-fit">
                    Explore <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                 </Link>
              </div>

              {/* Card 4 */}
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all flex flex-col h-full">
                 <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-50 text-[#0052CC] rounded-xl flex items-center justify-center shrink-0">
                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>
                    </div>
                    <h3 className="text-lg font-black text-[#0B1B3D]">Recruiters</h3>
                 </div>
                 <p className="text-xs text-[#4B5563] font-medium leading-relaxed mb-6 flex-grow">Find verified healthcare talent faster and manage hiring end-to-end.</p>
                 <Link href="/organizations/recruiters" className="text-[#0052CC] font-bold text-sm hover:text-blue-700 flex items-center gap-1 transition-colors w-fit">
                    Explore <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                 </Link>
              </div>

              {/* Card 5 */}
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all flex flex-col h-full">
                 <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-green-50 text-[#00A67E] rounded-xl flex items-center justify-center shrink-0">
                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                    </div>
                    <h3 className="text-lg font-black text-[#0B1B3D] leading-tight">Pharma<br/>Companies</h3>
                 </div>
                 <p className="text-xs text-[#4B5563] font-medium leading-relaxed mb-6 flex-grow">Connect with healthcare professionals and promote products & research.</p>
                 <Link href="/organizations/pharma-companies" className="text-[#0052CC] font-bold text-sm hover:text-blue-700 flex items-center gap-1 transition-colors w-fit">
                    Explore <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                 </Link>
              </div>

              {/* Card 6 */}
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all flex flex-col h-full">
                 <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center shrink-0">
                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    </div>
                    <h3 className="text-lg font-black text-[#0B1B3D] leading-tight">Healthcare<br/>Businesses</h3>
                 </div>
                 <p className="text-xs text-[#4B5563] font-medium leading-relaxed mb-6 flex-grow">Grow your business, showcase services, and generate quality leads.</p>
                 <Link href="/organizations/healthcare-businesses" className="text-[#0052CC] font-bold text-sm hover:text-blue-700 flex items-center gap-1 transition-colors w-fit">
                    Explore <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                 </Link>
              </div>

              {/* Card 7 */}
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all flex flex-col h-full">
                 <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-green-50 text-[#00A67E] rounded-xl flex items-center justify-center shrink-0">
                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                    </div>
                    <h3 className="text-lg font-black text-[#0B1B3D] leading-tight">Bulk<br/>Procurement</h3>
                 </div>
                 <p className="text-xs text-[#4B5563] font-medium leading-relaxed mb-6 flex-grow">Source medical equipment, supplies & services at the best rates.</p>
                 <Link href="/organizations/bulk-procurement" className="text-[#0052CC] font-bold text-sm hover:text-blue-700 flex items-center gap-1 transition-colors w-fit">
                    Explore <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                 </Link>
              </div>

              {/* Card 8 */}
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all flex flex-col h-full">
                 <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-50 text-[#0052CC] rounded-xl flex items-center justify-center shrink-0">
                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path></svg>
                    </div>
                    <h3 className="text-lg font-black text-[#0B1B3D] leading-tight">Equipment<br/>Rental</h3>
                 </div>
                 <p className="text-xs text-[#4B5563] font-medium leading-relaxed mb-6 flex-grow">List equipment, reach more customers, and manage rentals efficiently.</p>
                 <Link href="/organizations/equipment-rental" className="text-[#0052CC] font-bold text-sm hover:text-blue-700 flex items-center gap-1 transition-colors w-fit">
                    Explore <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                 </Link>
              </div>

              {/* Card 9 */}
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all flex flex-col h-full">
                 <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-50 text-[#0052CC] rounded-xl flex items-center justify-center shrink-0">
                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                    </div>
                    <h3 className="text-lg font-black text-[#0B1B3D] leading-tight">Enterprise<br/>Solutions</h3>
                 </div>
                 <p className="text-xs text-[#4B5563] font-medium leading-relaxed mb-6 flex-grow">Custom solutions for large enterprises to scale operations and manage teams.</p>
                 <Link href="/organizations/enterprise-solutions" className="text-[#0052CC] font-bold text-sm hover:text-blue-700 flex items-center gap-1 transition-colors w-fit">
                    Explore <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                 </Link>
              </div>

              {/* Card 10 */}
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all flex flex-col h-full">
                 <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center shrink-0">
                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path></svg>
                    </div>
                    <h3 className="text-lg font-black text-[#0B1B3D] leading-tight">Post<br/>Opportunities</h3>
                 </div>
                 <p className="text-xs text-[#4B5563] font-medium leading-relaxed mb-6 flex-grow">Post jobs, internships, and opportunities to reach the right audience.</p>
                 <Link href="/organizations/post-opportunities" className="text-[#0052CC] font-bold text-sm hover:text-blue-700 flex items-center gap-1 transition-colors w-fit">
                    Explore <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                 </Link>
              </div>

              {/* Card 11 */}
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all flex flex-col h-full">
                 <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-green-50 text-[#00A67E] rounded-xl flex items-center justify-center shrink-0">
                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    </div>
                    <h3 className="text-lg font-black text-[#0B1B3D] leading-tight">Partnership<br/>Program</h3>
                 </div>
                 <p className="text-xs text-[#4B5563] font-medium leading-relaxed mb-6 flex-grow">Collaborate with MGN to expand reach and create greater impact.</p>
                 <Link href="/organizations/partnership-program" className="text-[#0052CC] font-bold text-sm hover:text-blue-700 flex items-center gap-1 transition-colors w-fit">
                    Explore <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                 </Link>
              </div>

              {/* Card 12 - Banner Card */}
              <div className="bg-[#F0F5FF] rounded-2xl p-8 border border-blue-100 flex flex-col justify-center items-start h-full">
                 <div className="w-12 h-12 bg-blue-100 text-[#0052CC] rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                 </div>
                 <h3 className="text-lg font-black text-[#0B1B3D] mb-2 leading-tight">Not sure which solution<br/>fits your organization?</h3>
                 <p className="text-xs text-[#4B5563] font-medium leading-relaxed mb-6">Our experts will help you find the perfect solution.</p>
                 <Link href="/resources/contact-us" className="bg-[#0052CC] text-white px-5 py-2 rounded shadow-md font-bold text-sm hover:bg-blue-700 transition-colors flex items-center gap-2">
                    Talk to an Expert
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                 </Link>
              </div>

           </div>
        </div>
      </section>

      {/* Why Organizations Choose MGN */}
      <section className="w-full py-20 bg-[#F8FAFC] border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
           <h2 className="text-3xl font-black text-[#0B1B3D] text-center mb-16">Why Organizations Choose MGN</h2>
           
           <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 text-center">
              <div className="flex flex-col items-center">
                 <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-[#00A67E] shadow-sm mb-4">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                 </div>
                 <h4 className="text-sm font-bold text-[#0B1B3D] mb-2">Access Verified Talent</h4>
                 <p className="text-[11px] text-[#4B5563] font-medium leading-relaxed">Connect with a trusted network of healthcare professionals and students.</p>
              </div>
              <div className="flex flex-col items-center">
                 <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-[#0052CC] shadow-sm mb-4">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                 </div>
                 <h4 className="text-sm font-bold text-[#0B1B3D] mb-2">Save Time & Costs</h4>
                 <p className="text-[11px] text-[#4B5563] font-medium leading-relaxed">Automate hiring, training, and procurement to save time and resources.</p>
              </div>
              <div className="flex flex-col items-center">
                 <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-purple-600 shadow-sm mb-4">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                 </div>
                 <h4 className="text-sm font-bold text-[#0B1B3D] mb-2">Grow Your Brand</h4>
                 <p className="text-[11px] text-[#4B5563] font-medium leading-relaxed">Increase visibility, build trust, and establish your brand in the healthcare community.</p>
              </div>
              <div className="flex flex-col items-center">
                 <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-[#0052CC] shadow-sm mb-4">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path></svg>
                 </div>
                 <h4 className="text-sm font-bold text-[#0B1B3D] mb-2">Data-Driven Insights</h4>
                 <p className="text-[11px] text-[#4B5563] font-medium leading-relaxed">Make smarter decisions with powerful analytics and real-time insights.</p>
              </div>
              <div className="flex flex-col items-center lg:col-span-1 col-span-2">
                 <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-[#00A67E] shadow-sm mb-4">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                 </div>
                 <h4 className="text-sm font-bold text-[#0B1B3D] mb-2">End-to-End Support</h4>
                 <p className="text-[11px] text-[#4B5563] font-medium leading-relaxed max-w-[200px]">Dedicated support and account managers representing your organization.</p>
              </div>
           </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="w-full bg-[#1139A8] text-white py-12 px-6 lg:px-12 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-full h-full opacity-10" style={{ backgroundImage: "radial-gradient(circle at 100% 50%, white 0%, transparent 60%)"}}></div>
        <div className="max-w-7xl mx-auto relative z-10">
           <h3 className="text-2xl font-black mb-8 border-b border-blue-800 pb-4">Building the Future of Healthcare Together</h3>
           
           <div className="grid grid-cols-2 md:grid-cols-5 gap-6 lg:gap-12 text-left">
              <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                 <svg className="w-8 h-8 text-blue-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                 <div>
                    <h4 className="text-xl font-black">2,000+</h4>
                    <p className="text-xs text-blue-200">Organizations</p>
                 </div>
              </div>
              <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                 <svg className="w-8 h-8 text-blue-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                 <div>
                    <h4 className="text-xl font-black">10,000+</h4>
                    <p className="text-xs text-blue-200">Healthcare Professionals</p>
                 </div>
              </div>
              <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                 <svg className="w-8 h-8 text-blue-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                 <div>
                    <h4 className="text-xl font-black">50,000+</h4>
                    <p className="text-xs text-blue-200">Hiring Opportunities</p>
                 </div>
              </div>
              <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                 <svg className="w-8 h-8 text-blue-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                 <div>
                    <h4 className="text-xl font-black">100+</h4>
                    <p className="text-xs text-blue-200">Countries</p>
                 </div>
              </div>
              <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                 <svg className="w-8 h-8 text-blue-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                 <div>
                    <h4 className="text-xl font-black">99.9%</h4>
                    <p className="text-xs text-blue-200">Satisfaction Rate</p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="w-full py-16 bg-gradient-to-r from-[#F0FDF4] to-[#F8FAFC] px-6 lg:px-12">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2 flex flex-col items-start relative z-10">
               <h3 className="text-3xl lg:text-4xl font-black mb-4 text-[#0B1B3D] leading-tight">Ready to Transform Your Organization?</h3>
               <p className="text-[#4B5563] font-medium mb-8 max-w-sm">Join thousands of healthcare organizations already growing with MGN.</p>
               <div className="flex flex-wrap gap-4">
                 <Link href="/auth/signup" className="bg-[#00A67E] text-white font-bold px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition-colors flex items-center gap-2">
                   Create Organization Account
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                 </Link>
                 <Link href="/resources/contact-us" className="bg-transparent border-2 border-[#00A67E] text-[#00A67E] font-bold px-8 py-3 rounded-lg hover:bg-green-50 transition-colors">
                   Book a Demo
                 </Link>
               </div>
            </div>
            
            <div className="md:w-1/2 w-full flex justify-end">
               <div className="w-full max-w-[600px] aspect-video bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden relative">
                  {/* Laptop Screen Mockup Placeholder */}
                  <div className="h-6 bg-gray-100 border-b border-gray-200 flex items-center px-3 gap-1.5 shrink-0">
                     <div className="w-2 h-2 rounded-full bg-red-400"></div>
                     <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                     <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  </div>
                  <div className="flex-grow bg-gray-50 flex items-center justify-center p-6 text-center">
                     <div>
                        <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                        <p className="text-gray-400 font-bold text-sm">Replace with Dashboard Laptop Mockup<br/>(src="/dashboard-mockup.png")</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

    </div>
  );
}
