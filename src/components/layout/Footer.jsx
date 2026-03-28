import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

const InstagramIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Brand & Intro */}
          <div className={styles.brandSection}>
            <h2 className={styles.title}>Dr. Fermín Galli</h2>
            <p className={styles.subtitle}>Médico Cirujano (M.P. 82294)</p>
            <p className={styles.description}>
              Medicina quirúrgica moderna, segura y centrada en vos. 
              Recuperaciones más rápidas con enfoques menos invasivos.
            </p>
            <div className={styles.social}>
              <a href="https://www.instagram.com/cirugia.fgalli/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <InstagramIcon size={20} />
              </a>
              <a href="https://www.facebook.com/Cirugia.fgalli/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FacebookIcon size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.linksSection}>
            <h3 className={styles.heading}>Enlaces Rápidos</h3>
            <ul className={styles.linksList}>
              <li><a href="#sobre-mi">Sobre mí</a></li>
              <li><a href="#servicios">Servicios</a></li>
              <li><a href="#faq">Preguntas Frecuentes</a></li>
              <li><a href="#contacto">Contacto</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className={styles.contactSection}>
            <h3 className={styles.heading}>Contacto</h3>
            <ul className={styles.contactList}>
              <li>
                <MapPin size={18} className={styles.icon} />
                <span>Gral. La Madrid, Buenos Aires, Argentina</span>
              </li>
              <li>
                <Phone size={18} className={styles.icon} />
                <span>+54 9 2284 72-2879</span>
              </li>
              <li>
                <Mail size={18} className={styles.icon} />
                <span>Cirugia.galli@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} Dr. Fermín Galli. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
