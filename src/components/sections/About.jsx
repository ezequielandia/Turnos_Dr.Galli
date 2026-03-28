import React from 'react';
import { motion } from 'framer-motion';
import styles from './About.module.css';
import { CheckCircle } from 'lucide-react';
import doctorPortrait from '../../assets/doctor_portrait.jpg';

const About = () => {
  const highlights = [
    "Cirugía Minimamente Invasiva",
    "Recuperación Acelerada",
    "Atención Personalizada",
    "Tecnología de Vanguardia"
  ];

  return (
    <section className={styles.section} id="sobre-mi">
      <div className={styles.container}>
        <motion.div 
          className={styles.imageColumn}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.imageWrapper}>
            <img src={doctorPortrait} alt="Dr. Fermín Galli" className={styles.image} />
            <div className={styles.experienceBadge}>
              <span className={styles.experienceNumber}>8+</span>
              <span className={styles.experienceText}>Años de<br/>Experiencia</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className={styles.contentColumn}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <span className={styles.subtitle}>Sobre Mí</span>
          <h2 className={styles.title}>Dr. Fermín Galli</h2>
          <h3 className={styles.qualification}>Médico Cirujano (M.P. 82294)</h3>
          
          <div className={styles.bio}>
            <p>
              Soy médico cirujano de 33 años, especializado en Cirugía General, Laparoscópica, 
              Mínimamente Invasiva y de Trauma. Mi objetivo es brindar una medicina quirúrgica 
              moderna y segura.
            </p>
            <p>
              Me enfoco en el bienestar y la recuperación rápida de mis pacientes, utilizando 
              técnicas quirúrgicas menos invasivas que garantizan excelentes resultados estéticos 
              y un menor tiempo de convalecencia.
            </p>
          </div>

          <div className={styles.highlightsGrid}>
            {highlights.map((highlight, index) => (
              <div key={index} className={styles.highlightItem}>
                <CheckCircle className={styles.checkIcon} size={20} />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
