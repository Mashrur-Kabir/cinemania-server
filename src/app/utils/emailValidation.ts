import dns from "node:dns/promises";

/**
 * Common disposable email providers to block at the gate.
 */
const DISPOSABLE_DOMAINS = [
  "mailinator.com",
  "temp-mail.org",
  "guerrillamail.com",
  "10minutemail.com",
  "trashmail.com",
  "yopmail.com",
  "dispostable.com",
];

export const EmailValidator = {
  /**
   * Checks if the domain is in our manual blocklist of disposable providers.
   */
  isDisposable: (email: string): boolean => {
    const domain = email.split("@")[1]?.toLowerCase();
    return DISPOSABLE_DOMAINS.includes(domain);
  },

  /**
   * Performs a DNS lookup to verify the domain has valid MX (Mail Exchange) records.
   * This confirms the domain is real and configured to receive emails.
   */
  hasValidMX: async (email: string): Promise<boolean> => {
    const domain = email.split("@")[1];
    if (!domain) return false;

    try {
      const records = await dns.resolveMx(domain);
      return records && records.length > 0;
    } catch (_error) {
      // If DNS lookup fails (e.g. ENOTFOUND), the domain is likely fake/dead
      return false;
    }
  },
};
