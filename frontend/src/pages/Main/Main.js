import { useRef } from 'react';
import Header from '../../components/Main/Header';
import MainContent from '../../components/Main/Content';
import '../../styles/main.css';
import { useEffect } from 'react';


const Main = () => {
  useEffect(() => {
    document.body.classList.add('main-page');
    return () => {
      document.body.classList.remove('main-page');
    };
  }, []);
  const homeRef = useRef(null);
  const contactRef = useRef(null);
  const menuRef = useRef(null);
  const aboutUsRef = useRef(null);

  const scrollToHome = () => {
    homeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.scrollBy(0, -150);
  };

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToMenu = () => {
    menuRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToAboutUs = () => {
    aboutUsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
  <div className="page-wrapper">
    <Header
      scrollToHome={scrollToHome}
      scrollToContact={scrollToContact}
      scrollToMenu={scrollToMenu}
      scrollToAboutUs={scrollToAboutUs}
    />
    <MainContent
      homeRef={homeRef}
      contactRef={contactRef}
      menuRef={menuRef}
      aboutUsRef={aboutUsRef}
      scrollToHome={scrollToHome}
      scrollToContact={scrollToContact}
      scrollToMenu={scrollToMenu}
      scrollToAboutUs={scrollToAboutUs}
    />
    <footer className="footer">
      © 2025 FastFood. All rights reserved.
    </footer>
  </div>
);
};

export default Main;
