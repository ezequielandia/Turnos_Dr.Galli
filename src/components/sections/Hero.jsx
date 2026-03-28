import React from 'react';
import { motion } from 'framer-motion';
import styles from './Hero.module.css';
import Button from '../common/Button';
import DoctorCard from '../common/DoctorCard';
import doctorPortrait from '../../assets/doctor_portrait.jpg';
import heroBackground from '../../assets/hero_background.jpg';

const Hero = ({ onBookClick }) => {
  return (
    <section className={styles.hero} id="inicio">
      <div 
        className={styles.background} 
        style={{ backgroundImage: `url(${heroBackground})` }}
      ></div>
      <div className={styles.overlay}></div>
      
      <div className={styles.container}>
        <div className={styles.content}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className={styles.badge}>Cirujano General y Oncológico</span>
            <h1 className={styles.title}>
              Medicina quirúrgica moderna,<br />centrada en vos
            </h1>
            <p className={styles.description}>
              Enfoques menos invasivos, recuperaciones más rápidas y atención 
              personalizada en Gral. La Madrid y alrededores.
            </p>
            <div className={styles.actions}>
              <Button label="Agendar Turno" size="large" onClick={onBookClick} />
              <Button label="Conocer más" variant="secondary" size="large" onClick={() => document.getElementById('sobre-mi').scrollIntoView({ behavior: 'smooth' })} />
            </div>
          </motion.div>
        </div>

        <motion.div 
          className={styles.floatingCardContainer}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <DoctorCard 
            image={doctorPortrait}
            name="Dr. Fermín Galli"
            specialty="Médico Cirujano M.P. 82294"
            rating="5.0"
            years="8+"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
