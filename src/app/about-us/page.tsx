import Image from "next/image";
import Link from "next/link";

export default function AboutUsPage() {
  return (
    <div className="flex flex-col w-full bg-[#F8FAFC] font-sans text-[#1F2937] overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-br from-blue-50/50 via-white to-blue-50/30 pt-16 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="flex flex-col items-start">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full mb-6">About MGN</span>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-[#0B1B3D] leading-[1.1] tracking-tight">
              Building the Future<br />
              <span className="text-[#00A67E]">of Healthcare</span><br />
              Together.
            </h1>
            <p className="mt-6 text-[#4B5563] text-lg font-medium leading-relaxed max-w-lg">
              MGN is India's unified healthcare ecosystem connecting professionals, students, organizations, and businesses on a single platform to learn, grow, collaborate, and thrive.
            </p>
            
            <div className="flex flex-wrap items-center gap-6 mt-8 font-semibold text-sm text-[#374151]">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#0052CC]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Trusted
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#00A67E]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Verified
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#4B5563]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z" /></svg>
                Secure
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#0052CC]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                Healthcare Focused
              </div>
            </div>
          </div>
          
          <div className="relative w-full h-[400px] lg:h-[500px] bg-white rounded-3xl shadow-xl overflow-hidden flex items-center justify-center border border-gray-100">
             {/* Placeholder for the team graphic from the mockup */}
             <div className="absolute inset-0 bg-gray-50 flex flex-col items-center justify-center text-center p-6">
                <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                <p className="text-gray-400 font-medium">Replace with your Team Image<br/>(src="/team-hero.png")</p>
             </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision & Values */}
      <section className="w-full py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 flex flex-col justify-center items-start">
            <h2 className="text-3xl lg:text-4xl font-black text-[#0B1B3D] leading-tight mb-4">
              Our Mission,<br/>Vision & Values
            </h2>
            <p className="text-[#4B5563] font-medium leading-relaxed mb-8">
              We are driven by a purpose to create meaningful impact in the healthcare community.
            </p>
            <Link href="/auth/signup" className="flex items-center gap-2 px-6 py-3 border-2 border-[#0052CC] text-[#0052CC] font-bold rounded-lg hover:bg-blue-50 transition-colors">
              Join Our Mission
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </Link>
          </div>
          
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
               <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-[#00A67E] mb-6">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
               </div>
               <h3 className="text-xl font-bold text-[#0B1B3D] mb-4">Our Mission</h3>
               <p className="text-sm text-[#4B5563] font-medium leading-relaxed">
                 To connect every healthcare professional, student, and organization with the right opportunities, resources, and networks to grow and make a difference.
               </p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
               <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-[#0052CC] mb-6">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
               </div>
               <h3 className="text-xl font-bold text-[#0B1B3D] mb-4">Our Vision</h3>
               <p className="text-sm text-[#4B5563] font-medium leading-relaxed">
                 To become the world's most trusted and comprehensive healthcare ecosystem, powering careers, institutions, and businesses for a healthier future.
               </p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
               <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 mb-6">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
               </div>
               <h3 className="text-xl font-bold text-[#0B1B3D] mb-4">Our Values</h3>
               <ul className="text-sm text-[#4B5563] font-medium leading-relaxed space-y-2">
                 <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#0052CC]"></div> Integrity & Trust</li>
                 <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#0052CC]"></div> Innovation & Excellence</li>
                 <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#0052CC]"></div> Collaboration & Growth</li>
                 <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#0052CC]"></div> Inclusivity & Respect</li>
                 <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#0052CC]"></div> Impact & Responsibility</li>
               </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-16 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
          <div className="flex flex-col items-center">
             <svg className="w-8 h-8 text-[#0052CC] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
             <h4 className="text-2xl font-black text-[#0B1B3D]">10,000+</h4>
             <p className="text-xs text-[#4B5563] font-medium mt-1">Healthcare<br/>Professionals</p>
          </div>
          <div className="flex flex-col items-center">
             <svg className="w-8 h-8 text-[#0052CC] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path></svg>
             <h4 className="text-2xl font-black text-[#0B1B3D]">50,000+</h4>
             <p className="text-xs text-[#4B5563] font-medium mt-1">Students<br/>Onboarded</p>
          </div>
          <div className="flex flex-col items-center">
             <svg className="w-8 h-8 text-[#0052CC] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
             <h4 className="text-2xl font-black text-[#0B1B3D]">2,000+</h4>
             <p className="text-xs text-[#4B5563] font-medium mt-1">Organizations<br/>Trust Us</p>
          </div>
          <div className="flex flex-col items-center">
             <svg className="w-8 h-8 text-[#0052CC] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
             <h4 className="text-2xl font-black text-[#0B1B3D]">5,000+</h4>
             <p className="text-xs text-[#4B5563] font-medium mt-1">Courses & Learning<br/>Resources</p>
          </div>
          <div className="flex flex-col items-center">
             <svg className="w-8 h-8 text-[#0052CC] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
             <h4 className="text-2xl font-black text-[#0B1B3D]">100,000+</h4>
             <p className="text-xs text-[#4B5563] font-medium mt-1">Connections<br/>Made</p>
          </div>
          <div className="flex flex-col items-center">
             <svg className="w-8 h-8 text-[#0052CC] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
             <h4 className="text-2xl font-black text-[#0B1B3D]">25+</h4>
             <p className="text-xs text-[#4B5563] font-medium mt-1">Countries<br/>Reaching</p>
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="w-full py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-4 gap-12 items-center">
           <div className="lg:col-span-1">
              <h2 className="text-3xl font-black text-[#0B1B3D] mb-4">Our Journey</h2>
              <p className="text-[#4B5563] font-medium leading-relaxed">
                From a simple idea to a growing healthcare revolution. Here's how we got here.
              </p>
           </div>
           
           <div className="lg:col-span-3 relative flex items-center w-full overflow-x-auto pb-8 snap-x">
              {/* Line */}
              <div className="absolute top-1/2 left-8 right-8 h-0.5 bg-blue-100 -z-10 -translate-y-6"></div>
              
              <div className="flex justify-between w-full min-w-[800px] gap-4 px-8">
                {/* Milestone */}
                <div className="flex flex-col items-center text-center w-40 snap-center">
                   <div className="w-12 h-12 bg-white rounded-full border border-blue-100 flex items-center justify-center text-[#0052CC] shadow-sm mb-4">
                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                   </div>
                   <h4 className="text-lg font-black text-[#0B1B3D]">2018</h4>
                   <p className="text-xs font-bold text-[#0052CC] mb-2 uppercase tracking-wide">The Idea</p>
                   <p className="text-xs text-[#4B5563] font-medium leading-relaxed">MGN was founded with a vision to unify the healthcare community.</p>
                </div>
                {/* Milestone */}
                <div className="flex flex-col items-center text-center w-40 snap-center">
                   <div className="w-12 h-12 bg-white rounded-full border border-blue-100 flex items-center justify-center text-[#0052CC] shadow-sm mb-4">
                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                   </div>
                   <h4 className="text-lg font-black text-[#0B1B3D]">2019</h4>
                   <p className="text-xs font-bold text-[#0052CC] mb-2 uppercase tracking-wide">Early Growth</p>
                   <p className="text-xs text-[#4B5563] font-medium leading-relaxed">Launched the platform and onboarded our first 10,000+ members.</p>
                </div>
                {/* Milestone */}
                <div className="flex flex-col items-center text-center w-40 snap-center">
                   <div className="w-12 h-12 bg-white rounded-full border border-blue-100 flex items-center justify-center text-[#0052CC] shadow-sm mb-4">
                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                   </div>
                   <h4 className="text-lg font-black text-[#0B1B3D]">2020</h4>
                   <p className="text-xs font-bold text-[#0052CC] mb-2 uppercase tracking-wide">Building Trust</p>
                   <p className="text-xs text-[#4B5563] font-medium leading-relaxed">Introduced verification and advanced features for professionals.</p>
                </div>
                {/* Milestone */}
                <div className="flex flex-col items-center text-center w-40 snap-center">
                   <div className="w-12 h-12 bg-white rounded-full border border-blue-100 flex items-center justify-center text-[#0052CC] shadow-sm mb-4">
                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                   </div>
                   <h4 className="text-lg font-black text-[#0B1B3D]">2022</h4>
                   <p className="text-xs font-bold text-[#0052CC] mb-2 uppercase tracking-wide">Expanding Horizons</p>
                   <p className="text-xs text-[#4B5563] font-medium leading-relaxed">Reached 50,000+ members and partnered with leading organizations.</p>
                </div>
                {/* Milestone */}
                <div className="flex flex-col items-center text-center w-40 snap-center">
                   <div className="w-12 h-12 bg-white rounded-full border border-blue-100 flex items-center justify-center text-[#0052CC] shadow-sm mb-4">
                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                   </div>
                   <h4 className="text-lg font-black text-[#0B1B3D]">2024</h4>
                   <p className="text-xs font-bold text-[#0052CC] mb-2 uppercase tracking-wide">Global Impact</p>
                   <p className="text-xs text-[#4B5563] font-medium leading-relaxed">Serving a global community and continuing to innovate for the future.</p>
                </div>
              </div>
           </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="w-full py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
           <div className="lg:col-span-3">
              <h2 className="text-3xl font-black text-[#0B1B3D] mb-4 leading-tight">Meet Our<br/>Leadership Team</h2>
              <p className="text-[#4B5563] font-medium leading-relaxed mb-8 text-sm">
                A passionate team of healthcare professionals, technologists, and visionaries working together to build a better future.
              </p>
              <button className="flex items-center gap-2 px-6 py-2.5 border-2 border-[#0052CC] text-[#0052CC] font-bold rounded-lg hover:bg-blue-50 transition-colors text-sm">
                View All Team Members
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </button>
           </div>
           
           <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Member 1 */}
              <div className="flex flex-col items-center bg-gray-50 rounded-2xl p-6 text-center border border-gray-100">
                 <div className="w-24 h-24 bg-gray-200 rounded-full mb-4 overflow-hidden">
                    {/* Placeholder image */}
                    <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-200"><svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg></div>
                 </div>
                 <h4 className="text-base font-bold text-[#0B1B3D]">Dr. Priya Sharma</h4>
                 <p className="text-xs text-[#4B5563] font-medium mb-4">Co-Founder & CEO</p>
                 <div className="flex gap-3 text-gray-400">
                    <a href="#" className="hover:text-[#0052CC]"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
                    <a href="#" className="hover:text-blue-400"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg></a>
                    <a href="#" className="hover:text-gray-600"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></a>
                 </div>
              </div>
              
              {/* Member 2 */}
              <div className="flex flex-col items-center bg-gray-50 rounded-2xl p-6 text-center border border-gray-100">
                 <div className="w-24 h-24 bg-gray-200 rounded-full mb-4 overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-200"><svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg></div>
                 </div>
                 <h4 className="text-base font-bold text-[#0B1B3D]">Dr. Arjun Patel</h4>
                 <p className="text-xs text-[#4B5563] font-medium mb-4">Co-Founder & CTO</p>
                 <div className="flex gap-3 text-gray-400">
                    <a href="#" className="hover:text-[#0052CC]"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
                    <a href="#" className="hover:text-blue-400"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg></a>
                    <a href="#" className="hover:text-gray-600"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></a>
                 </div>
              </div>
              
              {/* Member 3 */}
              <div className="flex flex-col items-center bg-gray-50 rounded-2xl p-6 text-center border border-gray-100">
                 <div className="w-24 h-24 bg-gray-200 rounded-full mb-4 overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-200"><svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg></div>
                 </div>
                 <h4 className="text-base font-bold text-[#0B1B3D]">Rohit Verma</h4>
                 <p className="text-xs text-[#4B5563] font-medium mb-4">Head of Operations</p>
                 <div className="flex gap-3 text-gray-400">
                    <a href="#" className="hover:text-[#0052CC]"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
                    <a href="#" className="hover:text-blue-400"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg></a>
                    <a href="#" className="hover:text-gray-600"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></a>
                 </div>
              </div>

              {/* Member 4 */}
              <div className="flex flex-col items-center bg-gray-50 rounded-2xl p-6 text-center border border-gray-100">
                 <div className="w-24 h-24 bg-gray-200 rounded-full mb-4 overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-200"><svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg></div>
                 </div>
                 <h4 className="text-base font-bold text-[#0B1B3D]">Neha Singh</h4>
                 <p className="text-xs text-[#4B5563] font-medium mb-4">Head of Growth</p>
                 <div className="flex gap-3 text-gray-400">
                    <a href="#" className="hover:text-[#0052CC]"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
                    <a href="#" className="hover:text-blue-400"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg></a>
                    <a href="#" className="hover:text-gray-600"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></a>
                 </div>
              </div>

           </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="w-full pb-20 pt-8 bg-white px-6 lg:px-12">
         <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-xl bg-gradient-to-r from-[#2463EB] to-[#4F84F6] text-white flex flex-col md:flex-row items-center justify-between">
            <div className="p-10 lg:p-14 md:w-1/2 flex flex-col items-start relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ backgroundImage: "radial-gradient(circle at 0% 0%, white 0%, transparent 50%)"}}></div>
               <h3 className="text-3xl font-black mb-4 relative z-10">Be a Part of Our Mission</h3>
               <p className="text-blue-100 font-medium mb-8 max-w-sm relative z-10">Together, we can build a stronger, smarter, and healthier tomorrow.</p>
               <Link href="/auth/signup" className="bg-white text-[#0052CC] font-bold px-8 py-3 rounded-lg shadow-md hover:bg-gray-50 transition-colors relative z-10 flex items-center gap-2">
                 Get Started - It's Free
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
               </Link>
            </div>
            
            <div className="p-10 lg:p-14 md:w-1/2 bg-white/10 backdrop-blur-sm flex items-center justify-center">
               <div className="grid grid-cols-2 gap-x-8 gap-y-10">
                 <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                    </div>
                    <div>
                      <h5 className="font-bold text-lg mb-1">Connect</h5>
                      <p className="text-xs text-blue-100 font-medium">Build meaningful<br/>relationships</p>
                    </div>
                 </div>
                 <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                    </div>
                    <div>
                      <h5 className="font-bold text-lg mb-1">Learn</h5>
                      <p className="text-xs text-blue-100 font-medium">Access quality<br/>resources</p>
                    </div>
                 </div>
                 <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                    </div>
                    <div>
                      <h5 className="font-bold text-lg mb-1">Grow</h5>
                      <p className="text-xs text-blue-100 font-medium">Advance your<br/>career</p>
                    </div>
                 </div>
                 <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
                    </div>
                    <div>
                      <h5 className="font-bold text-lg mb-1">Thrive</h5>
                      <p className="text-xs text-blue-100 font-medium">Create a lasting<br/>impact</p>
                    </div>
                 </div>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
