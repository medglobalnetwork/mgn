// ==========================================
// Email Validation Utility
// 1. Format validation (regex)
// 2. MX record check (DNS)
// 3. Disposable email check
// ==========================================

// Common disposable email domains (block these)
const DISPOSABLE_DOMAINS = new Set([
  'tempmail.com', 'throwaway.email', 'guerrillamail.com', 'mailinator.com',
  'yopmail.com', 'trashmail.com', 'fakeinbox.com', 'sharklasers.com',
  'guerrillamailblock.com', 'grr.la', 'dispostable.com', 'maildrop.cc',
  'temp-mail.org', 'tempmailo.com', 'tempail.com', 'tempr.email',
  'tempinbox.com', 'mohmal.com', 'getnada.com', 'emailondeck.com',
  '33mail.com', 'mytemp.email', 'burnermail.io', 'mailnesia.com',
  'discard.email', 'discardmail.com', 'mailexpire.com', 'mailshell.com',
  'mailsiphon.com', 'mailslurp.com', 'objectmail.com', 'proxymail.eu',
  'rcpt.at', 'reallymymail.com', 'recode.me', 'regbypass.com',
  's0ny.net', 'safe-mail.net', 'safersignup.de', 'safetymail.info',
  'sandelf.de', 'saynotospams.com', 'scatmail.com', 'schafmail.de',
  'schrott-email.de', 'secretemail.de', 'secure-mail.biz', 'sendspam.ca',
  'shared-email.com', 'sheer.me', 'shiftmail.com', 'shitmail.me',
  'shitware.nl', 'shmeriously.com', 'shortmail.net', 'sibmail.com',
  'sinnlos-mail.de', 'skeefmail.com', 'slaskpost.se', 'slipry.net',
  'slopsbox.com', 'slowslow.de', 'slutty.horse', 'smashmail.de',
  'smtpmail.top', 'snakemail.com', 'sneakemail.com', 'sneakymail.de',
  'snkmail.com', 'sofimail.com', 'sofort-mail.de', 'softpls.asia',
  'sogetthis.com', 'soodonims.com', 'spam.la', 'spam.su',
  'spam4.me', 'spamavert.com', 'spambob.com', 'spambob.net',
  'spambob.org', 'spambog.com', 'spambog.de', 'spambog.ru',
  'spambox.info', 'spambox.irishspringrealty.com', 'spambox.us',
  'spamcannon.com', 'spamcannon.net', 'spamcero.com', 'spamcorptastic.com',
  'spamcowboy.com', 'spamcowboy.net', 'spamcowboy.org', 'spamday.com',
  'spamex.com', 'spamfighter.cf', 'spamfighter.ga', 'spamfighter.gq',
  'spamfighter.ml', 'spamfighter.tk', 'spamfree.eu', 'spamfree24.com',
  'spamfree24.de', 'spamfree24.eu', 'spamfree24.info', 'spamfree24.net',
  'spamfree24.org', 'spamgourmet.com', 'spamgourmet.net', 'spamgourmet.org',
  'spamherelots.com', 'spamhereplease.com', 'spamhole.com', 'spamify.com',
  'spaminator.de', 'spamkill.info', 'spaml.com', 'spaml.de',
  'spammotel.com', 'spamobox.com', 'spamoff.de', 'spamslicer.com',
  'spamspot.com', 'spamstack.net', 'spamthis.co.uk', 'spamthisplease.com',
  'spamtrail.com', 'spamtrap.ro', 'speed.1s.fr', 'spoofmail.de',
  'stuffmail.de', 'superrito.com', 'superstachel.de', 'suremail.info',
  'svk.jp', 'sweetxxx.de', 'tafmail.com', 'tagyoureit.com',
  'talkinator.com', 'tapchicuoihoi.com', 'teewars.org', 'teleworm.us',
  'temp-mail.io', 'temp-mail.org', 'tempalias.com', 'tempe17.com',
  'tempemail.biz', 'tempemail.co.za', 'tempemail.com', 'tempemail.net',
  'tempinbox.co.uk', 'tempmail.eu', 'tempmail.it', 'tempmail2.com',
  'tempmaildemo.com', 'tempmailer.com', 'tempmailer.de', 'tempomail.fr',
  'temporarily.de', 'temporarioemail.com.br', 'temporaryemail.net',
  'temporaryemail.us', 'temporaryforwarding.com', 'temporaryinbox.com',
  'temporarymailaddress.com', 'tempthe.net', 'thankyou2010.com',
  'thecloudindex.com', 'thetempmail.com', 'throwawayemailaddress.com',
  'tittbit.in', 'tizi.com', 'tmailinator.com', 'toiea.com',
  'toomail.biz', 'topranklist.de', 'tradermail.info', 'trash-amil.com',
  'trash-me.com', 'trash2009.com', 'trashdevil.com', 'trashdevil.de',
  'trashemail.de', 'trashmail.at', 'trashmail.com', 'trashmail.de',
  'trashmail.me', 'trashmail.net', 'trashmail.org', 'trashmail.ws',
  'trashmailer.com', 'trashymail.com', 'trashymail.net', 'trialmail.de',
  'trbvm.com', 'trbvn.com', 'trbvu.com', 'trbvw.com',
  'trbvx.com', 'trbwv.com', 'turual.com', 'twinmail.de',
  'tyldd.com', 'uggsrock.com', 'umail.net', 'upliftnow.com',
  'uplipht.com', 'venompen.com', 'veryrealliemail.com', 'viditag.com',
  'viewcastmedia.com', 'viewcastmedia.net', 'viewcastmedia.org',
  'vomoto.com', 'vpn.st', 'vsimcard.com', 'vubby.com',
  'wasteland.rfc822.org', 'webemail.me', 'weg-werf-email.de',
  'wegwerfadresse.de', 'wegwerfemail.com', 'wegwerfemail.de',
  'wegwerfmail.de', 'wegwerfmail.net', 'wegwerfmail.org',
  'wetrainbayarea.com', 'wetrainbayarea.org', 'wh4f.org',
  'whatiaas.com', 'whatpaas.com', 'whyspam.me', 'wikidocuslice.com',
  'wilemail.com', 'willhackforfood.biz', 'willselfdestruct.com',
  'winemaven.info', 'wronghead.com', 'wuzup.net', 'wuzupmail.net',
  'wwwnew.eu', 'xagloo.com', 'xemaps.com', 'xents.com',
  'xjoi.com', 'xmaily.com', 'xoxy.net', 'yapped.net',
  'yeah.net', 'yep.it', 'yogamaven.com', 'yomail.info',
  'yopmail.com', 'yopmail.fr', 'yopmail.gq', 'ypmail.webarnak.fr',
  'yuurok.com', 'zehnminutenmail.de', '10minutemail.com',
  '10minutemail.co.za', 'guerrillamail.com', 'guerrillamail.de',
  'guerrillamail.net', 'guerrillamail.org', 'tempail.com',
  'tempalias.com', 'tempemail.biz', 'tempemail.com',
]);

// Email format validation regex (RFC 5322 simplified)
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export interface EmailValidationResult {
  valid: boolean;
  error?: string;
  suggestion?: string;
}

/**
 * Validate email format
 */
export function validateEmailFormat(email: string): EmailValidationResult {
  if (!email || !email.trim()) {
    return { valid: false, error: 'Email is required' };
  }

  const trimmed = email.trim().toLowerCase();

  // Check format
  if (!EMAIL_REGEX.test(trimmed)) {
    return { valid: false, error: 'Invalid email format' };
  }

  // Check for @ symbol
  if (!trimmed.includes('@')) {
    return { valid: false, error: 'Email must contain @ symbol' };
  }

  // Check domain has at least one dot
  const domain = trimmed.split('@')[1];
  if (!domain || !domain.includes('.')) {
    return { valid: false, error: 'Invalid email domain' };
  }

  // Check TLD length
  const tld = domain.split('.').pop();
  if (!tld || tld.length < 2) {
    return { valid: false, error: 'Invalid email domain' };
  }

  return { valid: true };
}

/**
 * Check if email domain is disposable
 */
export function isDisposableEmail(email: string): EmailValidationResult {
  const domain = email.trim().toLowerCase().split('@')[1];

  if (domain && DISPOSABLE_DOMAINS.has(domain)) {
    return {
      valid: false,
      error: 'Disposable/temporary email addresses are not allowed',
    };
  }

  return { valid: true };
}

/**
 * Check if email domain has MX records (actually deliverable)
 */
export async function validateEmailDomain(email: string): Promise<EmailValidationResult> {
  const domain = email.trim().toLowerCase().split('@')[1];

  if (!domain) {
    return { valid: false, error: 'Invalid email domain' };
  }

  try {
    // Use DNS-over-HTTPS to check MX records
    const response = await fetch(
      `https://dns.google/resolve?name=${domain}&type=MX`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );

    const data = await response.json();

    // If MX records exist, domain can receive email
    if (data.Answer && data.Answer.length > 0) {
      return { valid: true };
    }

    // No MX records — try A record as fallback
    const aResponse = await fetch(
      `https://dns.google/resolve?name=${domain}&type=A`,
      { next: { revalidate: 3600 } }
    );

    const aData = await aResponse.json();

    if (aData.Answer && aData.Answer.length > 0) {
      return { valid: true };
    }

    return {
      valid: false,
      error: 'This email domain does not exist or cannot receive emails',
    };
  } catch {
    // If DNS check fails, don't block — just pass
    return { valid: true };
  }
}

/**
 * Full email validation (format + disposable + domain)
 */
export async function validateEmail(email: string): Promise<EmailValidationResult> {
  // 1. Format check
  const formatResult = validateEmailFormat(email);
  if (!formatResult.valid) return formatResult;

  // 2. Disposable email check
  const disposableResult = isDisposableEmail(email);
  if (!disposableResult.valid) return disposableResult;

  // 3. Domain check (async)
  const domainResult = await validateEmailDomain(email);
  if (!domainResult.valid) return domainResult;

  return { valid: true };
}
