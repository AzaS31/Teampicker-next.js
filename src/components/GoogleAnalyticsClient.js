// components/GoogleAnalyticsClient.js
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const GoogleAnalyticsClient = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (!window.gtag) return;

    window.gtag('config', 'G-BHFG50VY5T', {
      page_path: pathname,
    });
  }, [pathname]);

  return null;
};

export default GoogleAnalyticsClient;
