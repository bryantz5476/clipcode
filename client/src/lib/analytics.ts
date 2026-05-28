declare global {
  interface Window {
    gtag: (command: string, action: string, params?: Record<string, unknown>) => void;
    dataLayer: unknown[];
  }
}

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

export function initializeAnalytics() {
  if (!GA_MEASUREMENT_ID) {
    console.log('Google Analytics not configured - VITE_GA_MEASUREMENT_ID missing');
    return;
  }

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };
  window.gtag('js', new Date().toISOString());
  window.gtag('config', GA_MEASUREMENT_ID);
}

export function trackPageView(pagePath?: string) {
  if (!GA_MEASUREMENT_ID || typeof window.gtag !== 'function') return;
  window.gtag('event', 'page_view', {
    page_path: pagePath || window.location.pathname,
    page_title: document.title,
  });
}

export function trackPlanClick(planId: string, planName: string, planPrice: string) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'select_item', {
      item_list_id: 'plans',
      item_list_name: 'Service Plans',
      items: [{ item_id: planId, item_name: planName, currency: 'EUR' }],
    });
  }
}

export function trackScrollDepth(section: string) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'scroll_depth', {
      section_name: section,
    });
  }
}

export function trackCTAClick(ctaName: string, location: string) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'cta_click', {
      cta_name: ctaName,
      cta_location: location,
    });
  }
  
  console.log(`[Analytics] CTA clicked: ${ctaName} at ${location}`);
}
