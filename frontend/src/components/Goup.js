import './Goup.css'
import { BsArrowUpCircle } from 'react-icons/bs'
import React, { useState, useEffect } from 'react';

function GoToTopButton() {
  const [scroll, setScroll] = useState(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    if (position > 99) {
      setScroll(1);
    } else {
      setScroll(0);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleButtonClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className={`up_btn ${scroll === 1 ? 'up_btn_vis' : 'up_btn_invis'}`} onClick={handleButtonClick}>
      <BsArrowUpCircle size={45} />
    </div>
  );
}

export default GoToTopButton;
