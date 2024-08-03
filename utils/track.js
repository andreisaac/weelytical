"use client"
import { useEffect } from 'react';

const TrackingScript = ({ projectId }) => {
  useEffect(() => {
    const trackingUrl = 'https://your-api-domain.com/api/track';
    
     console.log(window.navigator.geolocation);
     console.log("window.location");
    const trackPageView = () => {
      fetch(trackingUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          projectId,
          url: window.location.href,
        })
      }).catch((error) => console.error('Tracking error:', error));
    };

    // Track initial page load
    trackPageView();

    // Optionally, track Single Page App (SPA) navigations
    window.addEventListener('popstate', trackPageView);
    window.history.pushState = ((f) => function pushState() {
      const ret = f.apply(this, arguments);
      trackPageView();
      return ret;
    })(window.history.pushState);

    return () => {
      window.removeEventListener('popstate', trackPageView);
    };
  }, [projectId]);
  
  return null; // This component does not render anything
};

export default TrackingScript;