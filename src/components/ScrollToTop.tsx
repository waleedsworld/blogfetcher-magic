import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls the window back to the top whenever the route changes, so
 * navigating from a long article to another page never lands you mid-scroll.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
