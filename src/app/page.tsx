import Image from "next/image";
import Link from "next/link";
import { Users, BookOpen, TrendingUp, Star, Briefcase, GraduationCap, ShoppingCart, ShieldCheck, Gift, Crown, Zap } from "lucide-react";
import CountUp from "@/components/CountUp";
import SplitText from "@/components/SplitText";
import ShinyText from "@/components/ShinyText";
import CountdownTimer from "@/components/CountdownTimer";
import LogoLoop from "@/components/LogoLoop";
import { getSupabaseServer } from "@/lib/supabase";

export const revalidate = 0;

export default async function Home() {
  const supabase = getSupabaseServer();
  
  // Fetch real counts from database
  let professionalsCount = 0;
  let jobsCount = 0;
  let coursesCount = 0;

  try {
    const { count: uCount, error: uErr } = await supabase.from('users').select('*', { count: 'exact', head: true });
    if (!uErr && uCount !== null) professionalsCount = uCount;

    const { count: jCount, error: jErr } = await supabase.from('jobs').select('*', { count: 'exact', head: true });
    if (!jErr && jCount !== null) jobsCount = jCount;

    const { count: cCount, error: cErr } = await supabase.from('courses').select('*', { count: 'exact', head: true });
    if (!cErr && cCount !== null) coursesCount = cCount;
  } catch (e) {
    // silently fail and show 0 if tables don't exist
  }
  return (
    <div className="flex flex-col w-full bg-white font-sans text-[#1F2937] overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="w-full relative pb-16 pt-12 lg:pt-20 lg:pb-24 bg-white">
        <div className="absolute top-0 right-0 w-2/3 h-full hero-dots opacity-30 pointer-events-none"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="flex flex-col items-start lg:col-span-6 relative z-20">
            <h1 className="text-5xl lg:text-[64px] font-black tracking-tight leading-[1.05] drop-shadow-sm">
              <span className="text-[#0B1B3D]">One Network.</span><br />
              <span className="text-[#00A67E]">Endless Opportunities.</span>
            </h1>
            
            <p className="text-[#4B5563] text-lg leading-relaxed mt-6 max-w-lg font-medium">
              MGN connects healthcare professionals, students, organizations, and businesses on a single platform to learn, grow, collaborate, and thrive.
            </p>

            <div className="flex flex-wrap items-center gap-6 mt-8 font-bold text-sm text-[#0B1B3D]">
               <span className="flex items-center gap-2"><Users className="w-5 h-5 text-[#183670]" /> Connect</span>
               <span className="flex items-center gap-2"><BookOpen className="w-5 h-5 text-[#00A67E]" /> Learn</span>
               <span className="flex items-center gap-2"><TrendingUp className="w-5 h-5 text-green-500" /> Grow</span>
               <span className="flex items-center gap-2"><Star className="w-5 h-5 text-orange-400" /> Thrive</span>
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-10 w-full">
              <Link href="/auth/signup" className="flex items-center justify-center bg-[#183670] text-white px-8 py-3.5 rounded-md font-bold text-base hover:bg-[#0B1B3D] transition-all shadow-md">
                Join Early Access
              </Link>
              <Link href="#features" className="flex items-center justify-center bg-white text-[#183670] border border-gray-300 px-8 py-3.5 rounded-md font-bold text-base hover:bg-gray-50 transition-all">
                Explore Features
              </Link>
            </div>

            <CountdownTimer />

            <div className="flex items-center gap-2 text-gray-500 font-medium mt-8 text-sm">
              <ShieldCheck className="w-5 h-5 text-[#183670]" />
              Trusted | Verified | Healthcare Focused
            </div>
          </div>

          <div className="lg:col-span-6 relative flex justify-center items-center w-full z-10">
            <div className="relative w-full max-w-lg lg:max-w-none aspect-square lg:aspect-auto lg:h-[600px]">
              {/* Note: Using hero.svg placeholder for the composition */}
              <Image 
                src="/hero.svg" 
                alt="MGN Platform Preview" 
                fill
                className="object-contain lg:object-right" 
                priority 
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>

      {/* Early Access Benefits Banner */}
      <section className="w-full bg-[#183670] text-white py-6 border-y border-blue-900/50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/grid-pattern.svg')] bg-repeat"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 shrink-0">
            <h3 className="font-bold text-lg uppercase tracking-wide text-center md:text-left">
              <ShinyText text="Early Access Benefits:" className="text-blue-200" speed={3} />
            </h3>
          </div>
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-8 gap-y-4 flex-1">
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-yellow-400 shrink-0" />
              <span className="font-medium text-sm">Founding Member Badge</span>
            </div>
            <div className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-green-400 shrink-0" />
              <span className="font-medium text-sm">6 Months Free Premium</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400 shrink-0" />
              <span className="font-medium text-sm">Priority Support</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-blue-300 shrink-0" />
              <span className="font-medium text-sm">Exclusive Network Access</span>
            </div>
          </div>
        </div>
      </section>

      {/* Hospital Logo Loop */}
      <LogoLoop />

      {/* Everything You Need Grid */}
      <section id="features" className="w-full py-16 bg-[#F8FAFC]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B1B3D] text-center mb-12">
            <SplitText text="Everything You Need. All in One Platform." />
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-5 text-[#183670]">
                <Users size={24} />
              </div>
              <h3 className="text-lg font-bold text-[#0B1B3D] mb-3">Professional Network</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-6 flex-grow">
                Connect with verified healthcare professionals, expand your network, and collaborate.
              </p>
              <Link href="/auth/signup" className="text-[#183670] font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                Explore Network <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
            
            {/* Card 2 */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mb-5 text-[#00A67E]">
                <Briefcase size={24} />
              </div>
              <h3 className="text-lg font-bold text-[#0B1B3D] mb-3">Jobs & Opportunities</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-6 flex-grow">
                Discover the right career opportunities and build your future.
              </p>
              <Link href="/auth/signup" className="text-[#183670] font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                Find Jobs <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-5 text-[#183670]">
                <GraduationCap size={24} />
              </div>
              <h3 className="text-lg font-bold text-[#0B1B3D] mb-3">Learning & Growth</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-6 flex-grow">
                Access courses, certifications, and resources to upskill and stay ahead.
              </p>
              <Link href="/auth/signup" className="text-[#183670] font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                Start Learning <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mb-5 text-[#00A67E]">
                <ShoppingCart size={24} />
              </div>
              <h3 className="text-lg font-bold text-[#0B1B3D] mb-3">Marketplace</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-6 flex-grow">
                Buy, sell, and discover healthcare products, services, and equipment.
              </p>
              <Link href="/auth/signup" className="text-[#183670] font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                Explore Marketplace <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Who is MNP For Section */}
      <section className="w-full py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B1B3D] text-center mb-12">
            <SplitText text="Who Is MGN For?" />
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-blue-50 border-[3px] border-white shadow-md mb-4 overflow-hidden relative">
                <Image src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200&auto=format&fit=crop" alt="Doctor" fill className="object-cover" unoptimized/>
              </div>
              <h4 className="text-[#183670] font-bold mb-2">Healthcare Professionals</h4>
              <p className="text-xs text-gray-500 leading-relaxed max-w-[200px]">Doctors, Nurses, Therapists, Technicians & more</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-blue-50 border-[3px] border-white shadow-md mb-4 overflow-hidden relative">
                <Image src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=200&auto=format&fit=crop" alt="Student" fill className="object-cover" unoptimized/>
              </div>
              <h4 className="text-[#183670] font-bold mb-2">Students & Learners</h4>
              <p className="text-xs text-gray-500 leading-relaxed max-w-[200px]">Medical, Paramedical & Allied Health Students</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-blue-50 border-[3px] border-white shadow-md mb-4 overflow-hidden relative">
                <Image src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=200&auto=format&fit=crop" alt="Hospital" fill className="object-cover" unoptimized/>
              </div>
              <h4 className="text-[#183670] font-bold mb-2">Organizations</h4>
              <p className="text-xs text-gray-500 leading-relaxed max-w-[200px]">Hospitals, Clinics, Institutions & Recruiters</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-blue-50 border-[3px] border-white shadow-md mb-4 overflow-hidden relative">
                <Image src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=200&auto=format&fit=crop" alt="Business" fill className="object-cover" unoptimized/>
              </div>
              <h4 className="text-[#183670] font-bold mb-2">Businesses</h4>
              <p className="text-xs text-gray-500 leading-relaxed max-w-[200px]">Suppliers, Manufacturers & Service Providers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="w-full">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-[#183670] rounded-2xl py-10 px-8 text-white flex flex-col md:flex-row flex-wrap items-center justify-between gap-8 md:gap-4 shadow-xl">
            <div className="flex items-center gap-4">
              <Users className="w-8 h-8 text-blue-300 opacity-80" strokeWidth={1.5} />
              <div>
                <p className="text-2xl font-bold">
                  <CountUp end={professionalsCount} suffix="+" />
                </p>
                <p className="text-xs text-blue-100/70">Healthcare Professionals<br/>Onboarded</p>
              </div>
            </div>
            
            <div className="hidden md:block w-px h-12 bg-white/10"></div>
            
            <div className="flex items-center gap-4">
              <Briefcase className="w-8 h-8 text-blue-300 opacity-80" strokeWidth={1.5} />
              <div>
                <p className="text-2xl font-bold">
                  <CountUp end={jobsCount} suffix="+" />
                </p>
                <p className="text-xs text-blue-100/70">Job Opportunities<br/>Posted</p>
              </div>
            </div>
            
            <div className="hidden md:block w-px h-12 bg-white/10"></div>
            
            <div className="flex items-center gap-4">
              <GraduationCap className="w-8 h-8 text-blue-300 opacity-80" strokeWidth={1.5} />
              <div>
                <p className="text-2xl font-bold">
                  <CountUp end={coursesCount} suffix="+" />
                </p>
                <p className="text-xs text-blue-100/70">Courses & Learning<br/>Resources</p>
              </div>
            </div>
            
            <div className="hidden md:block w-px h-12 bg-white/10"></div>
            
            <div className="flex items-center gap-4">
              <ShieldCheck className="w-8 h-8 text-blue-300 opacity-80" strokeWidth={1.5} />
              <div>
                <p className="text-2xl font-bold">
                  <CountUp end={100} suffix="%" />
                </p>
                <p className="text-xs text-blue-100/70">Verified & Trusted<br/>Community</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App Download Section */}
      <section className="w-full py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-4 relative h-[400px] flex justify-center items-center">
            {/* Mockup Placeholder */}
            <div className="relative w-[280px] h-full">
              <Image src="/hero.svg" alt="App Preview" fill className="object-contain" unoptimized />
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
            <h2 className="text-3xl font-bold text-[#0B1B3D] mb-4">
              Take MGN Wherever You Go
            </h2>
            <p className="text-[#4B5563] mb-8 text-sm leading-relaxed max-w-sm">
              Stay connected, discover opportunities, and grow your career — anytime, anywhere.
            </p>
            
            <div className="flex gap-4">
              <Link href="#" className="block w-36 h-12 relative hover:opacity-90 transition-opacity">
                <Image src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" fill className="object-contain" unoptimized />
              </Link>
              <Link href="#" className="block w-36 h-12 relative hover:opacity-90 transition-opacity">
                <Image src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="Download on the App Store" fill className="object-contain" unoptimized />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="bg-[#F8FAFC] border border-blue-50 rounded-2xl p-6 shadow-sm flex items-start gap-4 max-w-sm">
              <div className="bg-white rounded-full p-2 shadow-sm shrink-0 border border-gray-50">
                <ShieldCheck className="w-8 h-8 text-[#00A67E]" />
              </div>
              <div>
                <h4 className="font-bold text-[#183670] mb-2">Safe. Secure. Verified.</h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  We ensure a trusted environment with verified profiles, secure communication, and privacy you can count on.
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="w-full pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-[#183670] rounded-xl relative overflow-hidden flex flex-col md:flex-row items-center shadow-lg min-h-[220px]">
            <div className="p-8 md:p-12 md:w-3/5 relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Ready to Connect, Grow & Thrive?
              </h2>
              <p className="text-blue-100/90 mb-6 max-w-md text-sm leading-relaxed">
                Join thousands of healthcare professionals and organizations building the future together.
              </p>
              <Link href="/auth/signup" className="inline-block bg-white text-[#183670] px-6 py-2.5 rounded-md font-bold text-sm hover:bg-gray-50 transition-colors shadow-sm">
                Join MGN Today - It's Free
              </Link>
            </div>
            <div className="hidden md:block absolute right-0 bottom-0 top-0 w-[55%] z-0">
               <Image src="/ready.svg" alt="Professionals" fill className="object-contain object-right-bottom pr-10" unoptimized />
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
}
