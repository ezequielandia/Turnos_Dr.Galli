import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import Button from '../common/Button';
import { Menu, X } from 'lucide-react';

const Navbar = ({ onBookClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Sobre mí', href: '#sobre-mi' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contacto', href: '#contacto' },
  ];

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <a href="#" className={styles.logoLink}>
            <h1 className={styles.title}>Dr. Fermín Galli</h1>
            <span className={styles.subtitle}>Médico Cirujano</span>
          </a>
        </div>

        {/* Desktop Menu */}
        <div className={styles.desktopMenu}>
          {links.map((link) => (
             <a key={link.name} href={link.href} className={styles.navLink}>
               {link.name}
             </a>
          ))}
          <Button label="CONSULTAS" size="small" onClick={onBookClick} />
        </div>

        {/* Mobile Toggle */}
        <button 
          className={styles.mobileToggle} 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={styles.mobileMenu}>
          {links.map((link) => (
             <a 
               key={link.name} 
               href={link.href} 
               className={styles.mobileNavLink}
               onClick={() => setMobileMenuOpen(false)}
             >
               {link.name}
             </a>
          ))}
          <Button label="CONSULTAS" size="medium" onClick={onBookClick} />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
