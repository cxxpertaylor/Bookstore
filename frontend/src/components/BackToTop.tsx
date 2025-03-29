//component to scroll back to the top of the page

import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <button
      className={`btn btn-primary position-fixed bottom-0 end-0 m-3 ${visible ? '' : 'd-none'}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      ↑ Top
    </button>
  );
}

export default BackToTop;
