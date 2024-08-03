"use client"
import { useEffect, useState } from 'react';
import Bowser from 'bowser';

const TrackingScript = () => {
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    const trackPageView = async () => {
      setCurrentUrl(window.location.pathname)
      try {
        let visitorId = localStorage.getItem('visitor_id');
        if (!visitorId) {
          visitorId = crypto.randomUUID();
          localStorage.setItem('visitor_id', visitorId);
        }

        // Detect browser and OS information
        const browser = Bowser.getParser(window.navigator.userAgent);
        const browserName = browser.getBrowserName();
        const osName = browser.getOS().name;

        const trackingData = {
          visitor_id: visitorId,
          domain: window.location.hostname,
          page: window.location.pathname,
          referrer: document.referrer,
          osName,
          browserName,
        };

        console.log(trackingData);

        await fetch('http://localhost:3080/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(trackingData),
        });

        console.log('Page view tracked successfully');
      } catch (error) {
        console.error('Error tracking page view:', error);
      }
    };

    trackPageView();

    
    const handleUrlChange = () => {
      const newUrl = window.location.pathname;
      if (newUrl !== currentUrl) {
        setCurrentUrl(newUrl);
        trackPageView(newUrl);
      }
    };

    // Listen for popstate event to detect back/forward navigation
    window.addEventListener('popstate', handleUrlChange);

    // Override pushState and replaceState to detect URL changes for SPA navigation
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    window.history.pushState = function (...args) {
      originalPushState.apply(window.history, args);
      handleUrlChange();
    };

    window.history.replaceState = function (...args) {
      originalReplaceState.apply(window.history, args);
      handleUrlChange();
    };

    return () => {
      window.removeEventListener('popstate', handleUrlChange);
    };

  }, [currentUrl]);

  return null; // This component does not render anything
};

export default TrackingScript;
