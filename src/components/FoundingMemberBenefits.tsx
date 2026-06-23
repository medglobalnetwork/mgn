import React from "react";

export default function FoundingMemberBenefits() {
  const benefits = [
    "Founding Member Badge on Profile",
    "Lifetime Free Professional Account",
    "Priority Profile Verification",
    "Early Access to Professional Network",
    "Early Access to Jobs & Opportunities",
    "Early Access to Learning Hub",
    "Exclusive Community Access",
    "Direct Product Feedback Channel",
    "Priority Support",
    "Beta Testing Privileges"
  ];

  return (
    <section className="w-full bg-[#0B1B3D] text-white py-16 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 bg-[url('/grid-pattern.svg')] bg-repeat z-0"></div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-[#0052CC]/30 border border-[#0052CC] text-blue-200 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
            Exclusive Offer
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-white drop-shadow-sm">
            Why Become A Founding Member?
          </h2>
          <p className="text-blue-200 max-w-2xl mx-auto text-lg">
            Join during our early access phase to lock in lifetime benefits and help shape the future of India's largest healthcare network.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-8 gap-y-4 max-w-4xl mx-auto">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="flex items-center gap-3 bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-white/10 transition-colors">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#00A67E]/20 flex items-center justify-center text-[#00A67E]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <span className="font-semibold text-gray-100">{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
