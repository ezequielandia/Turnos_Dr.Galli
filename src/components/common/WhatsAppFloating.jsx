import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import styles from './WhatsAppFloating.module.css';

const WhatsAppFloating = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
      // Ocultar tooltip después de unos segundos
      setTimeout(() => setShowTooltip(false), 5000);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const phoneNumber = "5492284722879";
  const message = "Hola Dr. Galli, me gustaría hacer una consulta.";
  const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className={styles.container}>
      {showTooltip && (
        <div className={styles.tooltip}>
          ¿Tenés una urgencia?<br />Hablá conmigo ahora.
        </div>
      )}
      <a 
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.fab}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle size={32} />
      </a>
    </div>
  );
};

export default WhatsAppFloating;
