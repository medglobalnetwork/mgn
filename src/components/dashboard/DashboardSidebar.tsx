"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDashboard } from "@/contexts/DashboardContext";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { isMobileSidebarOpen, setMobileSidebarOpen } = useDashboard();

  const navGroups = [
    {
      title: "",
      items: [
        { name: "Home", href: "/dashboard/home", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg> },
        { name: "Dashboard", href: "/dashboard", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg> }
      ]
    },
    {
      title: "MY NETWORK",
      items: [
        { name: "My Network", href: "/dashboard/network", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg> },
        { name: "Messages", href: "/dashboard/messages", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>, badge: 5 },
        { name: "Connections", href: "/dashboard/connections", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg> },
        { name: "Groups", href: "/dashboard/groups", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg> },
        { name: "Events", href: "/dashboard/events", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg> }
      ]
    },
    {
      title: "LEARN",
      items: [
        { name: "My Learning", href: "/dashboard/learning", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path></svg> },
        { name: "Courses", href: "/dashboard/courses", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> },
        { name: "Certificates", href: "/dashboard/certificates", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg> },
        { name: "Saved", href: "/dashboard/saved", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg> }
      ]
    },
    {
      title: "EXPLORE",
      items: [
        { name: "Marketplace", href: "/dashboard/marketplace", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg> },
        { name: "Jobs", href: "/dashboard/jobs", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg> },
        { name: "Companies", href: "/dashboard/companies", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg> }
      ]
    }
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-[#0B1B3D]/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar Content */}
      <aside className={`fixed inset-y-0 left-0 transform bg-white border-r border-gray-100 flex flex-col w-64 h-full z-50 transition-transform duration-300 lg:relative lg:translate-x-0 overflow-y-auto overflow-x-hidden custom-scrollbar shrink-0 ${
        isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        {/* Brand Logo */}
        <div className="h-14 sm:h-[72px] flex items-center justify-between px-6 shrink-0 sticky top-0 bg-white z-20">
          <Link href="/dashboard" className="flex items-center gap-2" onClick={() => setMobileSidebarOpen(false)}>
            <img src="/logo.svg" alt="MGN Logo" className="h-5 sm:h-6 w-auto object-contain" />
          </Link>
          {/* Close button for mobile */}
          <button 
            className="lg:hidden text-gray-500 hover:bg-gray-50 p-1 rounded-md"
            onClick={() => setMobileSidebarOpen(false)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

      <div className="flex-1 flex flex-col px-4 py-4 gap-6">
        {navGroups.map((group, index) => (
          <div key={index} className="flex flex-col gap-1">
            {group.title && (
              <h4 className="text-[10px] font-bold text-gray-400 tracking-wider mb-2 px-2 uppercase">{group.title}</h4>
            )}
            {group.items.map((link, i) => {
              const isActive = pathname === link.href || (pathname === "/dashboard" && link.href === "/dashboard");
              return (
                <Link 
                  key={i} 
                  href={link.href}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors relative group ${
                    isActive 
                      ? 'bg-blue-50 text-[#0052CC]' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <span className={`${isActive ? 'text-[#0052CC]' : 'text-gray-400 group-hover:text-gray-600'}`}>
                    {link.icon}
                  </span>
                  {link.name}
                  
                  {/* Badge */}
                  {link.badge && (
                    <span className="ml-auto bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded-full border border-gray-200">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}

        {/* Settings */}
        <div className="flex flex-col gap-1 mt-2">
          <Link 
            href="/dashboard/settings"
            onClick={() => setMobileSidebarOpen(false)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors group ${
              pathname === "/dashboard/settings" ? 'bg-blue-50 text-[#0052CC]' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
             <span className={`${pathname === "/dashboard/settings" ? 'text-[#0052CC]' : 'text-gray-400 group-hover:text-gray-600'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
             </span>
             Settings
          </Link>
        </div>
      </div>

      {/* Upgrade to Premium Card */}
      <div className="p-4 mb-4">
        <div className="bg-gradient-to-br from-[#0B1B3D] to-[#0052CC] rounded-xl p-4 text-white shadow-lg relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zm0 7.5l-10-5v10l10 5 10-5v-10l-10 5z"></path></svg>
          </div>
          <h4 className="text-sm font-bold mb-1">Upgrade to Premium</h4>
          <p className="text-[10px] text-blue-100 mb-4 opacity-90 pr-2">Unlock unlimited courses, certifications and more.</p>
          <button className="bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold py-2 px-4 rounded-lg transition-colors shadow-sm inline-flex items-center gap-1 z-10 relative">
            Upgrade Now
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </button>
        </div>
      </div>
    </aside>
    </>
  );
}
