import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const features = [
    { 
      icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>, 
      title: "Connect", 
      desc: "Build meaningful professional connections" 
    },
    { 
      icon: <svg className="w-8 h-8 text-[#00A67E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l9-5-9-5-9 5 9 5z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path></svg>, 
      title: "Learn", 
      desc: "Access quality courses and resources" 
    },
    { 
      icon: <svg className="w-8 h-8 text-[#00A67E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>, 
      title: "Grow", 
      desc: "Discover opportunities and advance your career" 
    },
    { 
      icon: <svg className="w-8 h-8 text-[#0052CC]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>, 
      title: "Thrive", 
      desc: "Be part of a trusted and verified community" 
    }
  ];

  return (
    <div className="min-h-screen lg:h-screen lg:overflow-hidden flex w-full bg-white font-sans text-[#1F2937]">

      {/* Left Panel */}
      <div className="hidden lg:flex flex-col w-1/2 relative overflow-hidden bg-[#F0F4FA]">
         {/* Background Image */}
         <div className="absolute inset-0 z-0">
           <Image 
             src="/login.svg" 
             alt="Healthcare Professionals" 
             fill 
             className="object-contain object-bottom scale-[1.15] origin-bottom" 
             priority 
           />
         </div>

         {/* Top Left Logo */}
         <div className="absolute top-8 left-10 xl:left-14 z-20">
          <Link href="/">
            <img src="/logo.svg" alt="MGN Logo" className="h-7 w-auto object-contain" />
          </Link>
         </div>

         {/* Content Container */}
         <div className="relative z-10 flex flex-col max-w-[540px] mx-auto w-full px-10 xl:px-8 pt-16 xl:pt-20">
            <h1 className="text-4xl xl:text-[44px] font-extrabold text-[#0B1B3D] mb-5 leading-[1.15] tracking-tight">
              One Network.<br/>
              <span className="text-[#00A67E] whitespace-nowrap">Endless Opportunities.</span>
            </h1>

            {/* Paragraph at the top */}
            <p className="text-[#4B5563] text-[15px] max-w-[400px] mb-8 font-medium leading-[1.6]">
              MGN connects healthcare professionals, students, organizations, and businesses on a single platform to learn, grow, collaborate, and thrive.
            </p>

            {/* Features */}
            <div className="grid grid-cols-4 gap-4 w-full mb-8 max-w-[450px]">
               {features.map((f, i) => (
                 <div key={i} className="flex flex-col items-center text-center">
                    <div className="w-10 h-10 flex items-center justify-center text-[#0052CC] mb-2">{f.icon}</div>
                    <h4 className="font-bold text-[#0B1B3D] text-[13px] mb-1">{f.title}</h4>
                    <p className="text-[10px] text-gray-500 leading-[1.3] max-w-[80px] px-1">{f.desc}</p>
                 </div>
               ))}
            </div>
         </div>
      </div>

      {/* Right Panel (Auth Forms) */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center bg-white p-4 sm:p-8 lg:p-12 relative overflow-y-auto">
        {/* Back Button */}
        <div className="w-full max-w-[480px] flex justify-start mb-6">
          <Link href="/" className="flex items-center gap-1.5 text-gray-500 font-bold hover:text-[#0052CC] transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back
          </Link>
        </div>
        
        {/* The Form Container (No Card Styles) */}
        <div className="w-full max-w-[480px] relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
}
