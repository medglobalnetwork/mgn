// ==========================================
// Device Detection Utility
// Detects if user is on mobile, tablet, or desktop
// ==========================================

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

export function detectDevice(userAgent?: string): DeviceType {
  const ua = userAgent || (typeof navigator !== 'undefined' ? navigator.userAgent : '');

  if (!ua) return 'desktop';

  // Mobile detection
  const mobileKeywords = [
    'Android',
    'webOS',
    'iPhone',
    'iPad',
    'iPod',
    'BlackBerry',
    'Windows Phone',
    'Opera Mini',
    'IEMobile',
    'Mobile',
  ];

  // Tablet detection (must be before mobile check)
  const tabletKeywords = [
    'iPad',
    'Tablet',
    'Kindle',
    'Silk',
    'Android', // tablets also have Android
    'PlayBook',
    'Nexus 7',
    'Nexus 10',
    'SM-T',
  ];

  const lowerUA = ua.toLowerCase();

  // Check tablet first
  for (const keyword of tabletKeywords) {
    if (lowerUA.includes(keyword.toLowerCase())) {
      // iPad is always tablet
      if (keyword === 'iPad') return 'tablet';

      // Android — check if mobile or tablet
      if (keyword === 'Android') {
        // Mobile Android has "Mobile" in UA
        if (lowerUA.includes('mobile')) return 'mobile';
        // Otherwise tablet
        return 'tablet';
      }

      return 'tablet';
    }
  }

  // Check mobile
  for (const keyword of mobileKeywords) {
    if (lowerUA.includes(keyword.toLowerCase())) {
      return 'mobile';
    }
  }

  return 'desktop';
}

// Server-side detection from request headers
export function detectDeviceFromHeaders(headers: Headers): DeviceType {
  const userAgent = headers.get('user-agent') || '';
  return detectDevice(userAgent);
}

// Generate a device fingerprint for session tracking
export function generateSessionToken(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 15);
  return `${timestamp}-${random}`;
}
