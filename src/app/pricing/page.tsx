import Link from "next/link";
import React from "react";

export default function PricingPage() {
  return (
    <div className="flex flex-col w-full bg-gray-50 font-sans min-h-screen">
      {/* Header */}
      <section className="w-full bg-[#0B1B3D] pt-20 pb-24 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-[url('/grid-pattern.svg')] bg-repeat z-0"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-blue-200 font-medium">
            Join the Founding Member Program today and secure lifetime access for free.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="w-full -mt-16 px-4 sm:px-6 lg:px-8 relative z-20 mb-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Basic Free Tier */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 flex flex-col h-full transform transition-transform hover:-translate-y-1">
            <h3 className="text-2xl font-bold text-[#0B1B3D] mb-2">Basic</h3>
            <p className="text-gray-500 mb-6">For students and healthcare enthusiasts exploring the network.</p>
            <div className="mb-8">
              <span className="text-5xl font-black text-[#0B1B3D]">₹0</span>
              <span className="text-gray-500 font-medium">/forever</span>
            </div>
            
            <ul className="flex flex-col gap-4 mb-8 flex-1">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                <span className="text-gray-600">Standard Profile Creation</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                <span className="text-gray-600">View Public Jobs</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                <span className="text-gray-600">Basic Community Access</span>
              </li>
            </ul>

            <Link href="/auth/signup" className="w-full block text-center bg-gray-100 text-gray-700 font-bold py-4 rounded-xl hover:bg-gray-200 transition-colors">
              Get Started Basic
            </Link>
          </div>

          {/* Professional Plan (Founding Member Offer) */}
          <div className="bg-white rounded-3xl shadow-2xl border-2 border-[#00A67E] p-8 flex flex-col h-full transform transition-transform hover:-translate-y-2 relative">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#00A67E] text-white px-6 py-2 rounded-full text-sm font-black uppercase tracking-wider shadow-md whitespace-nowrap">
              Founding Member Offer
            </div>

            <h3 className="text-2xl font-bold text-[#0B1B3D] mb-2 mt-4">Professional</h3>
            <p className="text-gray-500 mb-6">Full access to networking, premium jobs, and learning resources.</p>
            <div className="mb-8 flex flex-col">
              <div className="flex items-center gap-3">
                <span className="text-5xl font-black text-[#0B1B3D]">₹0</span>
                <span className="text-gray-500 font-medium">/lifetime</span>
              </div>
              <span className="text-sm font-bold text-red-500 line-through mt-1">Instead of ₹999/year</span>
            </div>
            
            <ul className="flex flex-col gap-4 mb-8 flex-1">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#00A67E] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                <span className="text-gray-800 font-semibold">Founding Member Badge</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#00A67E] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                <span className="text-gray-600">Priority Verification Status</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#00A67E] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                <span className="text-gray-600">Full Access to All Jobs</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#00A67E] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                <span className="text-gray-600">Premium Learning Hub Access</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#00A67E] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                <span className="text-gray-600">Direct Product Feedback Channel</span>
              </li>
            </ul>

            <Link href="/auth/signup" className="w-full block text-center bg-[#00A67E] text-white font-black py-4 rounded-xl hover:bg-[#008f6b] shadow-lg shadow-[#00A67E]/30 transition-colors">
              Claim Free Professional Plan
            </Link>
            <p className="text-xs text-center text-gray-400 mt-4 font-medium">Limited to the first 1000 members.</p>
          </div>

        </div>
      </section>

      {/* FAQ Placeholder or Additional Info */}
      <section className="w-full bg-white py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-[#0B1B3D] mb-4">Why is it free right now?</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            We are currently in our Early Access phase. We want to reward our earliest believers—the Founding Members—who will help us shape the platform with their feedback. Once we hit 1000 members, the Professional Plan will revert to its standard pricing of ₹999/year.
          </p>
        </div>
      </section>

    </div>
  );
}
