// src/lib/analytics.ts
// Google Analytics integration for SPA


declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

const GA_MEASUREMENT_ID = "G-B2VZY2MRDX";

export function initGA() {
  if (typeof window === "undefined") return;
  if (window.gtag) return; // Prevent double-initialization

  // Insert the gtag script
  const script1 = document.createElement("script");
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script1);

  const script2 = document.createElement("script");
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
  `;
  document.head.appendChild(script2);
}

export function trackPageView(url: string) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag('event', 'page_view', {
    page_path: url,
  });
}
