import Image from "next/image";
import Link from "next/link";
import RotatingText from "@/components/RotatingText";
import CountdownTimer from "@/components/CountdownTimer";
import FoundingMemberBenefits from "@/components/FoundingMemberBenefits";
import AuthRedirect from "@/components/AuthRedirect";
import { getSupabaseServer } from "@/lib/supabase";

export const revalidate = 0; // Ensure fresh data on every load

export default async function Home() {
  const supabase = getSupabaseServer();
  const { count, error } = await supabase
    .from('users')
    .select('*', { count: 'exact', head: true });

  // Fallback to 0 if no users or error
  const userCount = count || 0;
  const targetSpots = 1000;
  const spotsFilled = Math.min(userCount, targetSpots);
  const percentage = (spotsFilled / targetSpots) * 100;
  const remaining = targetSpots - spotsFilled;
  return (
    <div className="flex flex-col w-full bg-white font-sans text-[#1F2937]">
      <AuthRedirect />
      {/* Hero Section */}
      <section className="w-full relative overflow-hidden pb-12 pt-8 lg:pt-16 lg:pb-20 bg-white border-b border-gray-100">
        <div className="absolute top-0 right-0 w-1/2 h-full hero-dots opacity-50 z-0"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-start relative z-20">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-[1.1] text-[#0B1B3D] drop-shadow-sm">
              One Network.<br />
              <span className="text-[#00A67E]">Endless Opportunities.</span>
            </h1>
            
            <p className="text-[#4B5563] text-lg lg:text-xl leading-relaxed mt-6 max-w-xl font-medium">
              MNP connects healthcare professionals, students, organizations, and businesses on a single platform to learn, grow, collaborate, and thrive.
            </p>

            <div className="flex flex-wrap items-center gap-6 mt-8 text-[#0B1B3D] font-bold text-sm md:text-base">
               <span className="flex items-center gap-2"><svg className="w-5 h-5 text-[#0052CC]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg> Connect</span>
               <span className="flex items-center gap-2"><svg className="w-5 h-5 text-[#00A67E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg> Learn</span>
               <span className="flex items-center gap-2"><svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg> Grow</span>
               <span className="flex items-center gap-2"><svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg> Thrive</span>
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-8 w-full">
              <Link href="/auth/signup" className="flex items-center justify-center bg-[#0052CC] text-white px-8 py-3.5 rounded-lg font-bold text-lg hover:bg-blue-700 transition-all shadow-md">
                Get Started – It's Free
              </Link>
              <Link href="#features" className="flex items-center justify-center bg-white text-[#0052CC] border border-gray-300 px-8 py-3.5 rounded-lg font-bold text-lg hover:bg-gray-50 transition-all shadow-sm">
                Explore Features
              </Link>
            </div>

            <div className="flex items-center gap-2 text-gray-500 font-medium mt-8">
              <svg className="w-5 h-5 text-[#0052CC]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Trusted | Verified | Healthcare Focused
            </div>
            
            <div className="mt-8 opacity-70">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">⏳ Early Access Ends In</p>
                <CountdownTimer days={12} hours={8} minutes={22} />
            </div>
          </div>

          <div className="relative flex justify-center items-center w-full z-10 lg:scale-110 lg:origin-right mt-10 lg:mt-0">
            <Image 
              src="/hero.svg" 
              alt="MGN Hero Illustration" 
              width={1000} 
              height={800} 
              className="w-full h-auto object-contain drop-shadow-2xl" 
              priority 
              unoptimized
            />
          </div>
        </div>
      </section>

      {/* Founding Member Benefits Section */}
      <FoundingMemberBenefits />

      {/* Platform Features Grid */}
      <section id="features" className="w-full bg-[#F9FAFB] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-black text-[#0B1B3D] text-center mb-12 flex flex-col md:flex-row items-center justify-center gap-2">
            <span>One Platform.</span>
            <RotatingText 
              texts={['Multiple Opportunities.', 'Endless Growth.', 'Global Network.']} 
              mainClassName="px-3 md:px-4 bg-[#00A67E] text-white overflow-hidden py-1 md:py-2 justify-center rounded-lg"
              staggerFrom="last"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={3000}
            />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {/* Profile */}
             <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
               <div className="w-14 h-14 bg-blue-50 text-[#0052CC] rounded-xl flex items-center justify-center mb-6">
                 <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
               </div>
               <h4 className="text-xl font-bold text-[#0B1B3D] mb-3">Profile Management</h4>
               <p className="text-gray-600 leading-relaxed">Create a professional healthcare profile that highlights your qualifications, achievements, experience, and interests.</p>
             </div>
             {/* Feed */}
             <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
               <div className="w-14 h-14 bg-green-50 text-[#00A67E] rounded-xl flex items-center justify-center mb-6">
                 <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path></svg>
               </div>
               <h4 className="text-xl font-bold text-[#0B1B3D] mb-3">Community Feed</h4>
               <p className="text-gray-600 leading-relaxed">Share knowledge, participate in discussions, and stay updated with industry developments.</p>
             </div>
             {/* Job Portal */}
             <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
               <div className="w-14 h-14 bg-blue-50 text-[#0052CC] rounded-xl flex items-center justify-center mb-6">
                 <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
               </div>
               <h4 className="text-xl font-bold text-[#0B1B3D] mb-3">Job Portal</h4>
               <p className="text-gray-600 leading-relaxed">Find opportunities from hospitals, clinics, institutions, startups, and healthcare organizations.</p>
             </div>
             {/* Learning Hub */}
             <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
               <div className="w-14 h-14 bg-green-50 text-[#00A67E] rounded-xl flex items-center justify-center mb-6">
                 <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
               </div>
               <h4 className="text-xl font-bold text-[#0B1B3D] mb-3">Learning Hub</h4>
               <p className="text-gray-600 leading-relaxed">Access educational resources designed to support continuous professional growth.</p>
             </div>
             {/* Marketplace */}
             <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
               <div className="w-14 h-14 bg-blue-50 text-[#0052CC] rounded-xl flex items-center justify-center mb-6">
                 <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
               </div>
               <h4 className="text-xl font-bold text-[#0B1B3D] mb-3">Marketplace</h4>
               <p className="text-gray-600 leading-relaxed">Connect with healthcare-focused businesses, services, and professional solutions.</p>
             </div>
          </div>
        </div>
      </section>

      {/* For Professionals Section */}
      <section className="w-full bg-white py-20 border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 relative w-full aspect-square md:aspect-video lg:aspect-square flex justify-center items-center rounded-2xl overflow-hidden">
            <Image 
              src="/ready.svg" 
              alt="Empowering Professionals" 
              width={600} 
              height={600} 
              className="w-full h-auto drop-shadow-xl" 
            />
          </div>
          <div className="order-1 lg:order-2 flex flex-col items-start">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1B3D] mb-6">Empowering Healthcare Professionals</h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Whether you are a doctor, nurse, student, or allied health worker, MGN provides the tools you need to build your reputation, find the right opportunities, and continuously grow.
            </p>
            <ul className="flex flex-col gap-4 w-full">
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-[#0052CC] flex items-center justify-center shrink-0 mt-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg></div>
                <div>
                  <h4 className="text-lg font-bold text-[#0B1B3D]">Verified Identity</h4>
                  <p className="text-gray-500">Stand out with a verified professional healthcare badge.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-green-100 text-[#00A67E] flex items-center justify-center shrink-0 mt-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg></div>
                <div>
                  <h4 className="text-lg font-bold text-[#0B1B3D]">Direct Recruitment</h4>
                  <p className="text-gray-500">Get approached by top hospitals and institutions directly.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0 mt-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg></div>
                <div>
                  <h4 className="text-lg font-bold text-[#0B1B3D]">Peer Collaboration</h4>
                  <p className="text-gray-500">Discuss complex cases and collaborate on research.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* For Organizations Section */}
      <section className="w-full bg-[#F0F9FF] py-20 border-b border-[#E0F2FE]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-start">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1B3D] mb-6">A Complete Solution For Organizations</h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Hospitals, recruiters, and training institutes can seamlessly manage talent acquisition, brand presence, and partnerships on MGN.
            </p>
            <ul className="flex flex-col gap-4 w-full">
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-[#0052CC] flex items-center justify-center shrink-0 mt-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg></div>
                <div>
                  <h4 className="text-lg font-bold text-[#0B1B3D]">Targeted Hiring</h4>
                  <p className="text-gray-500">Post jobs and find verified candidates based on precise specialties.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-green-100 text-[#00A67E] flex items-center justify-center shrink-0 mt-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg></div>
                <div>
                  <h4 className="text-lg font-bold text-[#0B1B3D]">Brand Building</h4>
                  <p className="text-gray-500">Create an organizational page to showcase your culture and facilities.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 mt-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg></div>
                <div>
                  <h4 className="text-lg font-bold text-[#0B1B3D]">B2B Marketplace</h4>
                  <p className="text-gray-500">Procure medical equipment or find business partners.</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="relative w-full aspect-square md:aspect-video lg:aspect-square flex justify-center items-center bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
            <Image 
              src="/org_solution.png" 
              alt="Organizations Solution" 
              width={800} 
              height={800} 
              className="w-full h-full object-cover" 
            />
          </div>
        </div>
      </section>

      {/* Pre-Footer Final CTA Section */}
      <section className="w-full bg-[#0052CC] py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[url('/hero-dots.svg')] bg-repeat z-0"></div>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
            Become A Founding Member
          </h2>
          <p className="text-blue-100 text-lg md:text-xl font-medium mb-10 max-w-2xl">
            Help Shape The Future Of Healthcare Networking. Limited To First 1000 Members.
          </p>
          
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl mb-12 shadow-2xl">
             <p className="text-sm font-black text-blue-200 uppercase tracking-[0.2em] mb-6">Offer Expires In</p>
             <CountdownTimer days={12} hours={8} minutes={22} />
          </div>

          <Link href="/auth/signup" className="inline-block bg-white text-[#0052CC] px-12 py-5 rounded-xl font-black text-xl hover:bg-gray-50 shadow-[0_20px_50px_-12px_rgba(255,255,255,0.3)] transition-transform hover:-translate-y-1">
            Reserve My Spot Now
          </Link>
        </div>
      </section>

    </div>
  );
}
