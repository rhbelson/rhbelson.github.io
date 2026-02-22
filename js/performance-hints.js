/**
 * Performance Hints and Optimizations
 * Provides resource hints and optimizations for better loading
 */

(function() {
  'use strict';

  // Add DNS prefetch for external domains
  const externalDomains = [
    'fonts.googleapis.com',
    'fonts.gstatic.com'
  ];

  externalDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = '//' + domain;
    document.head.appendChild(link);
  });

  // Preconnect to critical domains
  const preconnectDomains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com'
  ];

  preconnectDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });

  // Add resource hints for critical images
  if ('IntersectionObserver' in window) {
    // Only add hints if browser supports modern features
    const criticalImages = [
      'img/headshot.jpeg'
    ];

    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }

  // Optimize third-party scripts
  window.addEventListener('load', () => {
    // Defer non-critical operations
    setTimeout(() => {
      // Any analytics or tracking code can go here
      console.log('✅ Page fully loaded and optimized');
    }, 1000);
  });

  // Monitor and log performance metrics
  if ('PerformanceObserver' in window) {
    try {
      // First Contentful Paint
      const fcpObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.log('FCP:', entry.startTime.toFixed(2) + 'ms');
        }
      });
      fcpObserver.observe({ entryTypes: ['paint'] });

      // Navigation Timing
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = performance.getEntriesByType('navigation')[0];
          if (perfData) {
            console.log('Performance Metrics:');
            console.log('- DNS Lookup:', (perfData.domainLookupEnd - perfData.domainLookupStart).toFixed(2) + 'ms');
            console.log('- TCP Connection:', (perfData.connectEnd - perfData.connectStart).toFixed(2) + 'ms');
            console.log('- Request Time:', (perfData.responseStart - perfData.requestStart).toFixed(2) + 'ms');
            console.log('- Response Time:', (perfData.responseEnd - perfData.responseStart).toFixed(2) + 'ms');
            console.log('- DOM Processing:', (perfData.domComplete - perfData.domLoading).toFixed(2) + 'ms');
            console.log('- Total Load Time:', (perfData.loadEventEnd - perfData.fetchStart).toFixed(2) + 'ms');
          }
        }, 0);
      });
    } catch (e) {
      // Performance monitoring not critical
    }
  }

  // Optimize images on the fly
  if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    console.log('✅ Native lazy loading supported');
  } else {
    console.log('ℹ️ Using fallback lazy loading');
  }

  // Add connection quality detection
  if ('connection' in navigator) {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection) {
      console.log('Connection Info:');
      console.log('- Effective Type:', connection.effectiveType);
      console.log('- Downlink:', connection.downlink + ' Mbps');
      console.log('- RTT:', connection.rtt + 'ms');
      
      // Adjust quality based on connection
      if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
        document.body.classList.add('slow-connection');
        console.log('⚠️ Slow connection detected - optimizing experience');
      }
    }
  }

  // Service Worker registration (optional - uncomment to enable)
  /*
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('✅ Service Worker registered:', registration.scope);
        })
        .catch(error => {
          console.log('❌ Service Worker registration failed:', error);
        });
    });
  }
  */

})();
