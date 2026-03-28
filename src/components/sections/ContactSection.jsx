import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './ContactSection.module.css';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import Button from '../common/Button';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Gracias por tu mensaje. Nos pondremos en contacto a la brevedad.");
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section className={styles.section} id="contacto">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.subtitle}>Contacto</span>
          <h2 className={styles.title}>¿Cómo podemos ayudarte?</h2>
          <p className={styles.description}>
            Comunicate por WhatsApp para urgencias o completá el formulario 
            para consultas generales y solicitud de turnos.
          </p>
        </div>

        <div className={styles.grid}>
          {/* Contact Info */}
          <motion.div 
            className={styles.infoColumn}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>Información de Contacto</h3>
              
              <ul className={styles.infoList}>
                <li>
                  <div className={styles.iconWrapper}>
                    <MapPin size={20} />
                  </div>
                  <div className={styles.infoContent}>
                    <h4>Ubicación</h4>
                    <p>Gral. La Madrid, Buenos Aires, Argentina</p>
                  </div>
                </li>
                <li>
                  <div className={styles.iconWrapper}>
                    <Phone size={20} />
                  </div>
                  <div className={styles.infoContent}>
                    <h4>WhatsApp</h4>
                    <p>+54 9 2284 72-2879</p>
                  </div>
                </li>
                <li>
                  <div className={styles.iconWrapper}>
                    <Mail size={20} />
                  </div>
                  <div className={styles.infoContent}>
                    <h4>Correo Electrónico</h4>
                    <p>Cirugia.galli@gmail.com</p>
                  </div>
                </li>
                <li>
                  <div className={styles.iconWrapper}>
                    <Clock size={20} />
                  </div>
                  <div className={styles.infoContent}>
                    <h4>Horarios de Atención</h4>
                    <p>Lunes a Viernes: 08:00 - 20:00<br/>Sábados: 09:00 - 13:00</p>
                  </div>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            className={styles.formColumn}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Nombre Completo</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ej. Juan Pérez"
                  required 
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="email">Correo Electrónico</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="ejemplo@correo.com"
                  required 
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="subject">Asunto</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Consulta sobre..."
                  required 
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="message">Mensaje</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Escribí tu mensaje acá..."
                  required
                ></textarea>
              </div>

              <Button 
                label="Enviar Mensaje" 
                size="large" 
                icon={Send} 
                className={styles.submitBtn} 
              />
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
