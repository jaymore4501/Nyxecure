export const analyzePhishingUrl = (url) => {
  let score = 0;
  const reasons = [];

  // 1. Check HTTP vs HTTPS
  if (!url.startsWith('https://')) {
    score += 30;
    reasons.push("Missing HTTPS (encryption)");
  }

  // 2. Suspicious keywords
  const suspiciousKeywords = ['login', 'verify', 'bank', 'secure', 'account', 'update', 'auth'];
  const lowerUrl = url.toLowerCase();
  
  let keywordCount = 0;
  suspiciousKeywords.forEach(keyword => {
    if (lowerUrl.includes(keyword)) {
      keywordCount++;
    }
  });

  if (keywordCount > 0) {
    score += (keywordCount * 20); // Cap later if needed
    reasons.push(`Contains ${keywordCount} suspicious keyword(s)`);
  }

  // 3. Dot counting
  const urlObj = safeUrlParse(url);
  const hostname = urlObj ? urlObj.hostname : url;
  
  const dotCount = (hostname.match(/\./g) || []).length;
  if (dotCount > 3) {
    score += 15;
    reasons.push(`Unusual number of subdomains (dots)`);
  }

  // 4. URL length
  if (url.length > 75) {
    score += 10;
    reasons.push("Suspiciously long URL");
  }

  // Cap score at 100
  score = Math.min(score, 100);

  let status = "Safe";
  if (score >= 31 && score <= 70) status = "Suspicious";
  if (score >= 71) status = "Dangerous";

  if (score === 0) {
    reasons.push("No immediate surface threats detected.");
  }

  return { score, status, reasons };
};

const safeUrlParse = (string) => {
  try {
    return new URL(string.startsWith('http') ? string : `http://${string}`);
  } catch (_) {
    return null;
  }
};
