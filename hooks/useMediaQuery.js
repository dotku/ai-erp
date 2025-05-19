import { useState, useEffect } from 'react';

/**
 * Custom hook for responsive design
 * @param {string} query - Media query string
 * @returns {boolean} - Whether the media query matches
 */
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Create a media query list
    const mediaQuery = window.matchMedia(query);
    
    // Set the initial value
    setMatches(mediaQuery.matches);
    
    // Define a callback function to handle changes
    const handleResize = (event) => {
      setMatches(event.matches);
    };
    
    // Add the event listener
    mediaQuery.addEventListener('change', handleResize);
    
    // Clean up
    return () => {
      mediaQuery.removeEventListener('change', handleResize);
    };
  }, [query]);

  return matches;
};

export default useMediaQuery;
