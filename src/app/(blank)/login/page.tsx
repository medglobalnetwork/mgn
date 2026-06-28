'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  signUpWithEmail,
  signInWithEmail,
  signInWithUsername,
  sendPhoneOTP,
  verifyPhoneOTP,
} from '@/lib/auth';
import { detectDevice } from '@/lib/device';

const countries = [
  { code: 'IN', name: 'India', dial: '+91', flag: '\u{1F1EE}\u{1F1F3}' },
  { code: 'US', name: 'United States', dial: '+1', flag: '\u{1F1FA}\u{1F1F8}' },
  { code: 'GB', name: 'United Kingdom', dial: '+44', flag: '\u{1F1EC}\u{1F1E7}' },
  { code: 'CA', name: 'Canada', dial: '+1', flag: '\u{1F1E8}\u{1F1E6}' },
  { code: 'AU', name: 'Australia', dial: '+61', flag: '\u{1F1E6}\u{1F1FA}' },
  { code: 'DE', name: 'Germany', dial: '+49', flag: '\u{1F1E9}\u{1F1EA}' },
  { code: 'FR', name: 'France', dial: '+33', flag: '\u{1F1EB}\u{1F1F7}' },
  { code: 'JP', name: 'Japan', dial: '+81', flag: '\u{1F1EF}\u{1F1F5}' },
  { code: 'CN', name: 'China', dial: '+86', flag: '\u{1F1E8}\u{1F1F3}' },
  { code: 'BR', name: 'Brazil', dial: '+55', flag: '\u{1F1E7}\u{1F1F7}' },
  { code: 'RU', name: 'Russia', dial: '+7', flag: '\u{1F1F7}\u{1F1FA}' },
  { code: 'KR', name: 'South Korea', dial: '+82', flag: '\u{1F1F0}\u{1F1F7}' },
  { code: 'IT', name: 'Italy', dial: '+39', flag: '\u{1F1EE}\u{1F1F9}' },
  { code: 'ES', name: 'Spain', dial: '+34', flag: '\u{1F1EA}\u{1F1F8}' },
  { code: 'MX', name: 'Mexico', dial: '+52', flag: '\u{1F1F2}\u{1F1FD}' },
  { code: 'ID', name: 'Indonesia', dial: '+62', flag: '\u{1F1EE}\u{1F1E9}' },
  { code: 'TR', name: 'Turkey', dial: '+90', flag: '\u{1F1F9}\u{1F1F7}' },
  { code: 'SA', name: 'Saudi Arabia', dial: '+966', flag: '\u{1F1F8}\u{1F1E6}' },
  { code: 'AE', name: 'UAE', dial: '+971', flag: '\u{1F1E6}\u{1F1EA}' },
  { code: 'ZA', name: 'South Africa', dial: '+27', flag: '\u{1F1FF}\u{1F1E6}' },
  { code: 'NG', name: 'Nigeria', dial: '+234', flag: '\u{1F1F3}\u{1F1EC}' },
  { code: 'EG', name: 'Egypt', dial: '+20', flag: '\u{1F1EA}\u{1F1EC}' },
  { code: 'KE', name: 'Kenya', dial: '+254', flag: '\u{1F1F0}\u{1F1EA}' },
  { code: 'PH', name: 'Philippines', dial: '+63', flag: '\u{1F1F5}\u{1F1ED}' },
  { code: 'TH', name: 'Thailand', dial: '+66', flag: '\u{1F1F9}\u{1F1ED}' },
  { code: 'VN', name: 'Vietnam', dial: '+84', flag: '\u{1F1FB}\u{1F1F3}' },
  { code: 'MY', name: 'Malaysia', dial: '+60', flag: '\u{1F1F2}\u{1F1FE}' },
  { code: 'SG', name: 'Singapore', dial: '+65', flag: '\u{1F1F8}\u{1F1EC}' },
  { code: 'PK', name: 'Pakistan', dial: '+92', flag: '\u{1F1F5}\u{1F1F0}' },
  { code: 'BD', name: 'Bangladesh', dial: '+880', flag: '\u{1F1E7}\u{1F1E9}' },
  { code: 'LK', name: 'Sri Lanka', dial: '+94', flag: '\u{1F1F1}\u{1F1F0}' },
  { code: 'NP', name: 'Nepal', dial: '+977', flag: '\u{1F1F3}\u{1F1F5}' },
  { code: 'NZ', name: 'New Zealand', dial: '+64', flag: '\u{1F1F3}\u{1F1FF}' },
  { code: 'SE', name: 'Sweden', dial: '+46', flag: '\u{1F1F8}\u{1F1EA}' },
  { code: 'NO', name: 'Norway', dial: '+47', flag: '\u{1F1F3}\u{1F1F4}' },
  { code: 'DK', name: 'Denmark', dial: '+45', flag: '\u{1F1E9}\u{1F1F0}' },
  { code: 'FI', name: 'Finland', dial: '+358', flag: '\u{1F1EB}\u{1F1EE}' },
  { code: 'NL', name: 'Netherlands', dial: '+31', flag: '\u{1F1F3}\u{1F1F1}' },
  { code: 'BE', name: 'Belgium', dial: '+32', flag: '\u{1F1E7}\u{1F1EA}' },
  { code: 'CH', name: 'Switzerland', dial: '+41', flag: '\u{1F1E8}\u{1F1ED}' },
  { code: 'AT', name: 'Austria', dial: '+43', flag: '\u{1F1E6}\u{1F1F9}' },
  { code: 'PL', name: 'Poland', dial: '+48', flag: '\u{1F1F5}\u{1F1F1}' },
  { code: 'PT', name: 'Portugal', dial: '+351', flag: '\u{1F1F5}\u{1F1F9}' },
  { code: 'GR', name: 'Greece', dial: '+30', flag: '\u{1F1EC}\u{1F1F7}' },
  { code: 'IE', name: 'Ireland', dial: '+353', flag: '\u{1F1EE}\u{1F1EA}' },
  { code: 'IL', name: 'Israel', dial: '+972', flag: '\u{1F1EE}\u{1F1F1}' },
  { code: 'CL', name: 'Chile', dial: '+56', flag: '\u{1F1E8}\u{1F1F1}' },
  { code: 'CO', name: 'Colombia', dial: '+57', flag: '\u{1F1E8}\u{1F1F4}' },
  { code: 'AR', name: 'Argentina', dial: '+54', flag: '\u{1F1E6}\u{1F1F7}' },
  { code: 'PE', name: 'Peru', dial: '+51', flag: '\u{1F1F5}\u{1F1EA}' },
  { code: 'UA', name: 'Ukraine', dial: '+380', flag: '\u{1F1FA}\u{1F1E6}' },
  { code: 'CZ', name: 'Czech Republic', dial: '+420', flag: '\u{1F1E8}\u{1F1FF}' },
  { code: 'RO', name: 'Romania', dial: '+40', flag: '\u{1F1F7}\u{1F1F4}' },
  { code: 'HU', name: 'Hungary', dial: '+36', flag: '\u{1F1ED}\u{1F1FA}' },
];

export default function LoginPage() {
  const router = useRouter();

  const [loaded, setLoaded] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone' | 'username'>('email');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [countrySearch, setCountrySearch] = useState('');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [phoneFull, setPhoneFull] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [referralCode, setReferralCode] = useState('');

  useEffect(() => {
    const t1 = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t1);
  }, []);

  useEffect(() => {
    if (otpCountdown <= 0) return;
    const timer = setInterval(() => setOtpCountdown((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [otpCountdown]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowCountryDropdown(false);
        setCountrySearch('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const resetForm = () => {
    setFullName('');
    setEmail('');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setPhone('');
    setOtp('');
    setReferralCode('');
    setError('');
    setSuccess('');
    setOtpSent(false);
    setOtpCountdown(0);
  };

  const handleSendOtp = async () => {
    setError('');
    if (!fullName.trim()) { setError('Full name is required'); return; }
    if (!phone.trim()) { setError('Phone number is required'); return; }
    setIsSubmitting(true);
    const result = await sendPhoneOTP({ fullName, phone, countryCode: selectedCountry.dial, deviceType: detectDevice() });
    setIsSubmitting(false);
    if (result.success) {
      setOtpSent(true);
      setOtpCountdown(30);
      setPhoneFull(result.phone || '');
      setSuccess('OTP sent!');
    } else {
      setError(result.error || 'Failed to send OTP');
    }
  };

  const handleMethodChange = (method: 'email' | 'phone' | 'username') => {
    setLoginMethod(method);
    resetForm();
  };

  const toggleSignup = () => {
    setIsSignup(!isSignup);
    resetForm();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);
    try {
      if (isSignup) {
        if (!fullName.trim() || !email.trim() || !username.trim() || !password.trim()) {
          setError('All fields are required'); return;
        }
        if (password !== confirmPassword) { setError('Passwords do not match'); return; }
        if (password.length < 6) { setError('Password must be at least 6 characters'); return; }
        const result = await signUpWithEmail({ fullName, email, username, password, referralCode: referralCode || undefined, deviceType: detectDevice() });
        if (result.success) { setSuccess(result.message || 'Account created! Check your email.'); }
        else { setError(result.error || 'Signup failed'); }
      } else if (loginMethod === 'email') {
        if (!email.trim() || !password.trim()) { setError('Email and password are required'); return; }
        const result = await signInWithEmail({ email, password, deviceType: detectDevice() });
        if (result.success) { router.push('/dashboard'); }
        else { setError(result.error || 'Login failed'); }
      } else if (loginMethod === 'username') {
        if (!username.trim() || !password.trim()) { setError('Username and password are required'); return; }
        const result = await signInWithUsername({ username, password, deviceType: detectDevice() });
        if (result.success) { router.push('/dashboard'); }
        else { setError(result.error || 'Login failed'); }
      } else if (loginMethod === 'phone' && otpSent) {
        if (!otp.trim() || otp.length < 4) { setError('Enter a valid OTP'); return; }
        const result = await verifyPhoneOTP({ phone: phoneFull, otp, fullName, deviceType: detectDevice() });
        if (result.success) { router.push('/dashboard'); }
        else { setError(result.error || 'OTP verification failed'); }
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredCountries = countries.filter(
    (c) => c.name.toLowerCase().includes(countrySearch.toLowerCase()) || c.dial.includes(countrySearch) || c.code.toLowerCase().includes(countrySearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <img src="/logo.svg" alt="MGN Logo" className="absolute top-4 left-4 sm:top-6 sm:left-6 h-6 sm:h-8 w-auto select-none pointer-events-none" />

      <div className={`absolute transition-all duration-[1200ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] hidden sm:block ${loaded ? 'left-[22%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-60 md:w-80 lg:w-[28rem]' : 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 md:w-28'}`}>
        <img src="/symbol.svg" alt="" className="w-full h-auto opacity-20 select-none pointer-events-none" />
      </div>

      <div className={`absolute top-1/2 left-1/2 sm:left-auto sm:right-[8%] lg:right-[12%] -translate-x-1/2 sm:translate-x-0 -translate-y-1/2 w-[calc(100%-2rem)] max-w-sm sm:max-w-md bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 sm:p-8 transition-all duration-[1200ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] max-h-[calc(100vh-2rem)] overflow-y-auto ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">{isSignup ? 'Create account' : 'Welcome back'}</h2>
        <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">{isSignup ? 'Create account to get started' : 'Log in to your account'}</p>

        {error && <div className="mb-4 p-3 text-xs sm:text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">{error}</div>}
        {success && <div className="mb-4 p-3 text-xs sm:text-sm text-green-600 bg-green-50 border border-green-200 rounded-lg">{success}</div>}

        {!isSignup && (
          <div className="flex bg-gray-100 rounded-lg p-1 mb-4 sm:mb-6">
            {(['email', 'phone', 'username'] as const).map((method) => (
              <button key={method} type="button" onClick={() => handleMethodChange(method)} className={`flex-1 py-2 text-[10px] sm:text-xs font-medium rounded-md transition-colors capitalize ${loginMethod === method ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                {method === 'username' ? 'Username' : method === 'email' ? 'Email' : 'Phone'}
              </button>
            ))}
          </div>
        )}

        <form className="space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
          {isSignup && (
            <>
              <div>
                <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input id="name" type="text" placeholder="John Doe" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#16697a] focus:border-transparent transition-all" />
              </div>
              <div>
                <label htmlFor="signup-email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Email address</label>
                <input id="signup-email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#16697a] focus:border-transparent transition-all" />
              </div>
              <div>
                <label htmlFor="signup-username" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Username</label>
                <input id="signup-username" type="text" placeholder="johndoe" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#16697a] focus:border-transparent transition-all" />
              </div>
              <div>
                <label htmlFor="signup-password" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Create Password</label>
                <input id="signup-password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#16697a] focus:border-transparent transition-all" />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <input id="confirmPassword" type="password" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#16697a] focus:border-transparent transition-all" />
              </div>
              <div>
                <label htmlFor="referral" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Referral Code <span className="text-gray-400 font-normal">(optional)</span></label>
                <input id="referral" type="text" placeholder="Enter referral code" value={referralCode} onChange={(e) => setReferralCode(e.target.value)} className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#16697a] focus:border-transparent transition-all" />
              </div>
            </>
          )}

          {!isSignup && (
            <>
              {loginMethod === 'email' && (
                <div>
                  <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Email address</label>
                  <input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#16697a] focus:border-transparent transition-all" />
                </div>
              )}

              {loginMethod === 'username' && (
                <div>
                  <label htmlFor="username" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Username</label>
                  <input id="username" type="text" placeholder="johndoe" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#16697a] focus:border-transparent transition-all" />
                </div>
              )}

              {loginMethod === 'phone' && (
                <>
                  {!otpSent && (
                    <div>
                      <label htmlFor="phone-name" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input id="phone-name" type="text" placeholder="John Doe" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#16697a] focus:border-transparent transition-all" />
                    </div>
                  )}
                  <div>
                    <label htmlFor="phone" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Phone number</label>
                    <div className="flex gap-2">
                      <div className="relative flex-shrink-0" ref={dropdownRef}>
                        <button type="button" onClick={() => setShowCountryDropdown(!showCountryDropdown)} disabled={otpSent} className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-2.5 sm:py-3 bg-gray-50 border border-gray-300 rounded-lg text-xs sm:text-sm text-gray-700 hover:bg-gray-100 transition-colors disabled:bg-gray-50 disabled:opacity-60 whitespace-nowrap">
                          <span>{selectedCountry.flag}</span>
                          <span>{selectedCountry.dial}</span>
                          <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </button>
                        {showCountryDropdown && (
                          <div className="absolute top-full left-0 mt-1 w-56 sm:w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-hidden">
                            <div className="p-2 border-b">
                              <input type="text" placeholder="Search country..." value={countrySearch} onChange={(e) => setCountrySearch(e.target.value)} className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#16697a]" autoFocus />
                            </div>
                            <div className="overflow-y-auto max-h-48">
                              {filteredCountries.map((country) => (
                                <button key={country.code} type="button" onClick={() => { setSelectedCountry(country); setShowCountryDropdown(false); setCountrySearch(''); }} className={`w-full flex items-center gap-2 px-3 py-2 text-xs sm:text-sm hover:bg-gray-50 transition-colors ${selectedCountry.code === country.code ? 'bg-blue-50 text-[#16697a]' : 'text-gray-700'}`}>
                                  <span className="text-base">{country.flag}</span>
                                  <span className="flex-1 text-left truncate">{country.name}</span>
                                  <span className="text-gray-400 flex-shrink-0">{country.dial}</span>
                                </button>
                              ))}
                              {filteredCountries.length === 0 && <div className="px-3 py-4 text-xs sm:text-sm text-gray-500 text-center">No country found</div>}
                            </div>
                          </div>
                        )}
                      </div>
                      <input id="phone" type="tel" placeholder="98765 43210" value={phone} onChange={(e) => setPhone(e.target.value)} disabled={otpSent} className="flex-1 min-w-0 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#16697a] focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-500" />
                    </div>
                  </div>
                  {!otpSent && (
                    <button type="button" onClick={handleSendOtp} disabled={isSubmitting} className="w-full py-2.5 sm:py-3 bg-[#16697a] text-white text-sm font-medium rounded-lg hover:bg-[#145c6a] focus:outline-none focus:ring-2 focus:ring-[#16697a] focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                      {isSubmitting ? 'Sending...' : 'Send OTP'}
                    </button>
                  )}
                  {otpSent && (
                    <div>
                      <label htmlFor="otp" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Enter OTP</label>
                      <input id="otp" type="text" placeholder="000000" maxLength={6} value={otp} onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))} className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-400 text-center text-base sm:text-lg tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-[#16697a] focus:border-transparent transition-all" />
                      <div className="mt-2 text-xs sm:text-sm text-center">
                        {otpCountdown > 0 ? (
                          <span className="text-gray-500">Resend OTP in {otpCountdown}s</span>
                        ) : (
                          <button type="button" onClick={handleSendOtp} disabled={isSubmitting} className="text-[#16697a] font-medium hover:underline">Resend OTP</button>
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}

              {(loginMethod === 'email' || loginMethod === 'username') && (
                <div>
                  <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#16697a] focus:border-transparent transition-all" />
                </div>
              )}

              {(loginMethod === 'email' || loginMethod === 'username') && (
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded border-gray-300 text-[#16697a] focus:ring-[#16697a]" />
                    <span className="text-gray-600">Remember me</span>
                  </label>
                  <a href="#" className="text-[#16697a] hover:underline">Forgot password?</a>
                </div>
              )}
            </>
          )}

          {isSignup && (
            <button type="submit" disabled={isSubmitting} className="w-full py-2.5 sm:py-3 bg-[#16697a] text-white text-sm font-medium rounded-lg hover:bg-[#145c6a] focus:outline-none focus:ring-2 focus:ring-[#16697a] focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {isSubmitting ? 'Creating account...' : 'Create account'}
            </button>
          )}

          {!isSignup && (loginMethod === 'email' || loginMethod === 'username') && (
            <button type="submit" disabled={isSubmitting} className="w-full py-2.5 sm:py-3 bg-[#16697a] text-white text-sm font-medium rounded-lg hover:bg-[#145c6a] focus:outline-none focus:ring-2 focus:ring-[#16697a] focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          )}

          {!isSignup && loginMethod === 'phone' && otpSent && (
            <button type="submit" disabled={isSubmitting} className="w-full py-2.5 sm:py-3 bg-[#16697a] text-white text-sm font-medium rounded-lg hover:bg-[#145c6a] focus:outline-none focus:ring-2 focus:ring-[#16697a] focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {isSubmitting ? 'Verifying...' : 'Verify & Login'}
            </button>
          )}
        </form>

        <p className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-gray-500">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button type="button" onClick={toggleSignup} className="text-[#16697a] font-medium hover:underline">
            {isSignup ? 'Login' : 'Create account'}
          </button>
        </p>
      </div>
    </div>
  );
}
