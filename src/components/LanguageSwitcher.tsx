"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

export default function LanguageSwitcher() {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    // Check current language from Google Translate cookie
    const match = document.cookie.match(/(?:^|;)\s*googtrans=([^;]*)/);
    if (match && match[1]) {
      // googtrans value is usually like "/en/hi"
      const selectedLang = match[1].split('/').pop();
      if (selectedLang) setLang(selectedLang);
    }

    // Hide all Google Translate default UI completely
    const style = document.createElement("style");
    style.innerHTML = `
      #google_translate_element { display: none !important; }
      .goog-te-banner-frame { display: none !important; }
      .goog-te-gadget { display: none !important; }
      .skiptranslate iframe { display: none !important; }
      body { top: 0 !important; }
      .goog-text-highlight { background-color: transparent !important; box-shadow: none !important; }
      #goog-gt-tt { display: none !important; }
    `;
    document.head.appendChild(style);
  }, []);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    setLang(newLang);

    if (newLang === "en") {
      // Clear cookie to revert to default English
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=" + window.location.hostname + "; path=/;";
    } else {
      document.cookie = `googtrans=/en/${newLang}; path=/`;
      document.cookie = `googtrans=/en/${newLang}; domain=${window.location.hostname}; path=/`;
    }
    
    // Reload to apply translation
    window.location.reload();
  };

  return (
    <div className="flex items-center">
      {/* Hidden Google Translate Element to initialize the engine */}
      <div id="google_translate_element" className="hidden"></div>
      <Script
        id="google-translate-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            function googleTranslateElementInit() {
              new google.translate.TranslateElement(
                {
                  pageLanguage: 'en',
                  includedLanguages: 'en,hi',
                  autoDisplay: false
                },
                'google_translate_element'
              );
            }
          `,
        }}
      />
      <Script
        id="google-translate-script"
        strategy="afterInteractive"
        src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
      />

      {/* Custom Clean UI */}
      <select
        value={lang}
        onChange={handleLanguageChange}
        className="bg-white border border-gray-300 text-gray-700 text-[11px] font-semibold rounded px-2 py-0.5 outline-none cursor-pointer hover:border-[#0052CC] transition-colors appearance-none min-w-[70px] text-center shadow-sm"
        style={{ WebkitAppearance: 'none', MozAppearance: 'none', backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%234b5563%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 4px center', backgroundSize: '8px auto', paddingRight: '16px' }}
      >
        <option value="en">English</option>
        <option value="hi">Hindi</option>
      </select>
    </div>
  );
}
