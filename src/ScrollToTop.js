import { useEffect } from 'react';

export default function ScrollToTop() {
  useEffect(() => {
    document.querySelector('.main-view').scrollTo(0, 0);
  }, []);

  return null;
}
