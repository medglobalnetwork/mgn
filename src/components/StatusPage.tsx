import Link from 'next/link';
import { ReactNode } from 'react';

interface StatusPageProps {
  badge: string;
  title: string;
  description: string;
  buttonText: string;
  buttonHref?: string;
  icon?: ReactNode;
}

export default function StatusPage({ badge, title, description, buttonText, buttonHref = "#", icon }: StatusPageProps) {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-[#F8FAFC] px-6 py-20 text-center font-sans">
      <div className="w-20 h-20 bg-blue-50 text-[#0052CC] rounded-2xl flex items-center justify-center mb-8 shadow-sm">
        {icon || (
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
        )}
      </div>
      
      <span className="inline-block px-4 py-1.5 bg-white border border-gray-200 text-[#0052CC] text-xs font-bold uppercase tracking-wider rounded-full mb-6 shadow-sm">
        {badge}
      </span>
      
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0B1B3D] mb-6 tracking-tight max-w-3xl leading-tight">
        {title}
      </h1>
      
      <p className="text-[#4B5563] text-lg font-medium max-w-2xl mb-10 leading-relaxed">
        {description}
      </p>
      
      <Link href={buttonHref} className="bg-[#0052CC] text-white px-8 py-3.5 rounded-lg font-bold shadow-[0_4px_14px_0_rgba(0,82,204,0.39)] hover:shadow-[0_6px_20px_rgba(0,82,204,0.23)] hover:bg-[#0043a4] transition-all flex items-center gap-2">
        {buttonText}
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
      </Link>
    </div>
  );
}
