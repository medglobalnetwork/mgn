import Link from "next/link";
import Image from "next/image";

export default function FeaturesPage() {
  const heroBadges = [
    {
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>,
      title: "One Platform",
      desc: "Everything in one seamless experience"
    },
    {
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>,
      title: "Trusted Network",
      desc: "Verified professionals and organizations"
    },
    {
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>,
      title: "Smart & Secure",
      desc: "Advanced security and privacy first"
    },
    {
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>,
      title: "Built for Healthcare",
      desc: "Designed specifically for the healthcare community"
    }
  ];

  const cards = [
    {
      title: "Professional Network",
      desc: "Connect with verified healthcare professionals, expand your network, and collaborate.",
      features: ["Smart Connections", "Profile Verification", "Private Messaging", "Professional Communities"],
      iconColor: "text-blue-500",
      bgColor: "bg-blue-50",
      icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>,
      linkText: "Explore Network"
    },
    {
      title: "Jobs & Opportunities",
      desc: "Discover the right career opportunities and build your future.",
      features: ["Personalized Job Matches", "Apply & Track", "Interview Updates", "Career Insights"],
      iconColor: "text-green-500",
      bgColor: "bg-green-50",
      icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>,
      linkText: "Explore Jobs"
    },
    {
      title: "Learning & Growth",
      desc: "Access courses, certifications, and resources to upskill and stay ahead.",
      features: ["Online Courses", "Certificates", "Webinars & Workshops", "Learning Paths"],
      iconColor: "text-purple-500",
      bgColor: "bg-purple-50",
      icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l9-5-9-5-9 5 9 5z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path></svg>,
      linkText: "Explore Learning"
    },
    {
      title: "Marketplace",
      desc: "Buy, sell, and discover healthcare products, services, and equipment.",
      features: ["Medical Equipment", "Healthcare Services", "Books & Resources", "Verified Vendors"],
      iconColor: "text-orange-500",
      bgColor: "bg-orange-50",
      icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>,
      linkText: "Explore Marketplace"
    },
    {
      title: "Organizations",
      desc: "Manage your organization, connect with talent, and grow your impact.",
      features: ["Organization Profile", "Talent Hiring", "Analytics Dashboard", "Team Management"],
      iconColor: "text-teal-500",
      bgColor: "bg-teal-50",
      icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>,
      linkText: "Explore Organizations"
    },
    {
      title: "Events & Webinars",
      desc: "Join events, webinars, and conferences to learn and network.",
      features: ["Upcoming Events", "Live Webinars", "Event Reminders", "Certificates"],
      iconColor: "text-red-500",
      bgColor: "bg-red-50",
      icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>,
      linkText: "Explore Events"
    },
    {
      title: "Messages & Notifications",
      desc: "Stay updated with real-time messages and important notifications.",
      features: ["Real-time Messaging", "Smart Notifications", "Email Alerts", "Message Requests"],
      iconColor: "text-blue-500",
      bgColor: "bg-blue-50",
      icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>,
      linkText: "Explore Messages"
    },
    {
      title: "Security & Privacy",
      desc: "Your data is safe with us. We prioritize your privacy and security.",
      features: ["Data Encryption", "Privacy Controls", "Secure Authentication", "Compliance & Standards"],
      iconColor: "text-green-500",
      bgColor: "bg-green-50",
      icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>,
      linkText: "Learn More"
    },
    {
      title: "AI-Powered Tools",
      desc: "Save time and discover relevant opportunities faster with smart AI integrations.",
      features: ["AI Job Recommendations", "AI Learning Assistant", "Smart Search", "Profile Suggestions"],
      iconColor: "text-indigo-500",
      bgColor: "bg-indigo-50",
      icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>,
      linkText: "Explore AI Tools"
    }
  ];

  return (
    <div className="flex flex-col w-full bg-white font-sans text-[#1F2937]">
      {/* Hero Section */}
      <section className="w-full relative overflow-hidden pt-12 pb-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col items-start">
            <div className="inline-block bg-blue-50 text-[#0052CC] font-bold px-4 py-1.5 rounded-full text-sm mb-6">
              Features
            </div>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-[1.15] text-[#0B1B3D] mb-6">
              Powerful Features.<br />
              Endless <span className="text-[#00A67E]">Opportunities.</span>
            </h1>
            <p className="text-[#4B5563] text-lg lg:text-xl leading-relaxed max-w-xl font-medium mb-12">
              MGN brings everything you need to connect, learn, grow, and thrive in the healthcare ecosystem — all in one platform.
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full">
              {heroBadges.map((badge, idx) => (
                <div key={idx} className="flex flex-col items-center sm:items-start text-center sm:text-left">
                  <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center text-[#0B1B3D] mb-3">
                    {badge.icon}
                  </div>
                  <h4 className="text-sm font-bold text-[#0B1B3D] mb-1">{badge.title}</h4>
                  <p className="text-[11px] text-gray-500 leading-tight">{badge.desc}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Mockup Placeholder */}
          <div className="relative w-full aspect-[4/3] bg-gray-50 border border-gray-100 rounded-2xl shadow-xl flex items-center justify-center overflow-hidden">
             <div className="absolute inset-0 flex flex-col p-8">
                <div className="w-full h-12 bg-white rounded-lg shadow-sm mb-6 border border-gray-100 flex items-center px-4">
                  <div className="w-4 h-4 rounded-full bg-red-400 mr-2"></div>
                  <div className="w-4 h-4 rounded-full bg-yellow-400 mr-2"></div>
                  <div className="w-4 h-4 rounded-full bg-green-400"></div>
                  <div className="mx-auto w-1/3 h-4 bg-gray-100 rounded"></div>
                </div>
                <div className="flex gap-6 flex-1">
                  <div className="w-1/4 h-full bg-white rounded-lg shadow-sm border border-gray-100 flex flex-col p-4 gap-4">
                    <div className="w-full h-8 bg-gray-100 rounded"></div>
                    <div className="w-full h-8 bg-gray-100 rounded"></div>
                    <div className="w-full h-8 bg-gray-100 rounded"></div>
                  </div>
                  <div className="flex-1 flex flex-col gap-6">
                    <div className="w-full h-32 bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex flex-col justify-between">
                       <div className="w-1/2 h-6 bg-gray-100 rounded"></div>
                       <div className="flex gap-4">
                         <div className="w-16 h-12 bg-blue-50 rounded"></div>
                         <div className="w-16 h-12 bg-green-50 rounded"></div>
                         <div className="w-16 h-12 bg-purple-50 rounded"></div>
                       </div>
                    </div>
                    <div className="w-full flex-1 bg-white rounded-lg shadow-sm border border-gray-100 flex items-center justify-center text-gray-400 font-medium">
                       [ Dashboard Mockup ]
                    </div>
                  </div>
                </div>
             </div>
             {/* Floating Mobile Mockup */}
             <div className="absolute -bottom-10 -right-6 w-48 h-96 bg-gray-800 rounded-[2rem] border-[6px] border-gray-900 shadow-2xl flex flex-col overflow-hidden">
                <div className="w-full h-full bg-white relative">
                   <div className="w-20 h-5 bg-gray-900 absolute top-0 left-1/2 -translate-x-1/2 rounded-b-xl"></div>
                   <div className="flex items-center justify-center h-full text-gray-400 font-medium text-xs">
                     [ Mobile Mockup ]
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="w-full bg-[#FAFAFA] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-black text-[#0B1B3D] text-center mb-16">
            Everything You Need. All in One Platform.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {cards.map((card, idx) => (
               <div key={idx} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group">
                 <div className={`w-14 h-14 rounded-xl ${card.bgColor} ${card.iconColor} flex items-center justify-center mb-6`}>
                   {card.icon}
                 </div>
                 <h3 className="text-xl font-bold text-[#0B1B3D] mb-3">{card.title}</h3>
                 <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">
                   {card.desc}
                 </p>
                 <ul className="space-y-3 mb-8">
                   {card.features.map((feature, i) => (
                     <li key={i} className="flex items-center gap-3 text-sm text-[#1F2937] font-medium">
                       <div className="w-1.5 h-1.5 rounded-full bg-[#0052CC]"></div>
                       {feature}
                     </li>
                   ))}
                 </ul>
                 <Link href="#" className={`inline-flex items-center gap-2 font-bold ${card.iconColor} group-hover:gap-3 transition-all mt-auto`}>
                   {card.linkText}
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                 </Link>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Future Ecosystem (Missing Info added back) */}
      <section className="w-full bg-white py-20 border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block bg-[#00A67E]/10 text-[#00A67E] font-bold px-4 py-1.5 rounded-full text-sm mb-6">
             Coming Soon
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#0B1B3D] mb-4">
            The Future Ecosystem
          </h2>
          <p className="text-[#4B5563] max-w-2xl mx-auto mb-12">
            We're continuously expanding the MGN platform. Here is a glimpse of the advanced healthcare solutions rolling out soon.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {["Hospital Management System (HMS)", "Clinic Management Software", "Telemedicine Solutions", "Equipment Rental", "Bulk Procurement", "Pharma Partnerships", "Healthcare Business Solutions"].map((item, i) => (
              <div key={i} className="bg-gray-50 border border-gray-200 px-5 py-2.5 rounded-lg text-sm font-semibold text-[#0B1B3D]">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact in Numbers */}
      <section className="w-full bg-[#FAFAFA] py-16 border-y border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:w-1/3">
                 <h2 className="text-2xl font-bold text-[#0B1B3D] mb-2">MGN Impact in Numbers</h2>
                 <p className="text-gray-500 text-sm mb-6">Building the largest and most trusted healthcare community.</p>
                 <Link href="/auth/signup" className="border-2 border-[#0052CC] text-[#0052CC] font-bold px-6 py-2.5 rounded-lg hover:bg-blue-50 transition-colors">
                   Join the Movement
                 </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:w-2/3">
                 <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-blue-50 text-[#0052CC] flex items-center justify-center mb-3">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                    </div>
                    <div className="text-2xl font-black text-[#0B1B3D] mb-1">10,000+</div>
                    <div className="text-xs text-gray-500">Healthcare Professionals</div>
                 </div>
                 <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center mb-3">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                    </div>
                    <div className="text-2xl font-black text-[#0B1B3D] mb-1">2,000+</div>
                    <div className="text-xs text-gray-500">Organizations Onboarded</div>
                 </div>
                 <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path></svg>
                    </div>
                    <div className="text-2xl font-black text-[#0B1B3D] mb-1">5,000+</div>
                    <div className="text-xs text-gray-500">Courses & Resources</div>
                 </div>
                 <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-3">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    </div>
                    <div className="text-2xl font-black text-[#0B1B3D] mb-1">20,000+</div>
                    <div className="text-xs text-gray-500">Jobs Posted</div>
                 </div>
                 <div className="flex flex-col items-center text-center sm:col-span-3 lg:col-span-1">
                    <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3 mx-auto">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
                    </div>
                    <div className="text-2xl font-black text-[#0B1B3D] mb-1">50,000+</div>
                    <div className="text-xs text-gray-500">Active Connections</div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
         <div className="bg-gradient-to-r from-[#183670] to-[#0052CC] rounded-[2rem] overflow-hidden shadow-2xl relative">
            <div className="absolute inset-0 opacity-10">
               <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="plus-pattern" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M20 10v20M10 20h20" stroke="white" strokeWidth="2" fill="none"/></pattern></defs><rect width="100%" height="100%" fill="url(#plus-pattern)"/></svg>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center relative z-10 p-10 lg:p-16">
               <div className="flex flex-col items-start text-white mb-10 lg:mb-0">
                  <h2 className="text-3xl lg:text-4xl font-extrabold mb-4 leading-tight max-w-md">
                    All the tools you need to connect, learn, grow & thrive.
                  </h2>
                  <p className="text-white/80 mb-8 max-w-sm text-base">
                    Join thousands of healthcare professionals and organizations building the future together.
                  </p>
                  <Link href="/auth/signup" className="bg-white text-[#0052CC] font-bold px-8 py-3.5 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                    Get Started – It's Free
                  </Link>
               </div>
               
               {/* People Mockup */}
               <div className="relative h-[300px] w-full flex items-end justify-center lg:justify-end">
                  <div className="w-[120%] h-[120%] absolute bottom-[-40px] right-[-10%] bg-white/10 rounded-full blur-3xl"></div>
                  <Image src="/ready.svg" alt="Join MGN" fill className="object-contain object-bottom scale-[1.15] origin-bottom px-4" />
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
