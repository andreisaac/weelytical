"use client";

import React, { useEffect, useState, useRef, useCallback } from 'react';



function getBaseDomain(url:string) {
  if(url){
    try {
      let newUrl = new URL(url);
      return newUrl.origin;
    } catch (e) {
      console.error("Invalid URL provided:", e);
      return "";
    }
  }
}

const Weelytical = () => {
  const [currentUrl, setCurrentUrl] = useState<string>();
  const isFirstRender = useRef(true);
  
  const trackPageView = useCallback(async () => {
    try {
      let visitorId = localStorage.getItem('visitor_id');
      if (!visitorId) {
        visitorId = crypto.randomUUID();
        localStorage.setItem('visitor_id', visitorId);
      }

      const trackingData = {
        visitor_id: visitorId,
        domain: window.location.hostname,
        page: window.location.pathname,
        referrer: getBaseDomain(document.referrer),
        userAgent: window.navigator.userAgent
      };

      await fetch('http://localhost:3080/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(trackingData),
      });
    } catch (error) {
      console.error("Error tracking page view:", error);
    }
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      trackPageView();
      isFirstRender.current = false;
    } else {
      const handleUrlChange = () => {
        const newUrl = window.location.pathname;
        if (newUrl !== currentUrl) {
          setCurrentUrl(newUrl);
          trackPageView();
        }
      };

      window.addEventListener('popstate', handleUrlChange);
      
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
        window.history.pushState = originalPushState;
        window.history.replaceState = originalReplaceState;
      };
    }
  }, [currentUrl, trackPageView]);

  return null;
};

export default Weelytical;
