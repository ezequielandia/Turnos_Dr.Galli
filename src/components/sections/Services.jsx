import React from 'react';
import { motion } from 'framer-motion';
import styles from './Services.module.css';
import ServiceCard from '../common/ServiceCard';
import { Activity, Thermometer, ShieldCheck, Stethoscope } from 'lucide-react';

const Services = () => {
  const servicesList = [
    {
      icon: ShieldCheck,
      title: "Cirugía General",
      description: "Diagnóstico y tratamiento quirúrgico de afecciones del sistema digestivo, hernias, vesícula y más."
    },
    {
      icon: Activity,
      title: "Cirugía Laparoscópica",
      description: "Técnicas mínimamente invasivas que aseguran menor dolor postoperatorio y rápida recuperación."
    },
    {
      icon: Stethoscope,
      title: "Cirugía Oncológica",
      description: "Enfoque integral y tratamiento quirúrgico especializado de tumores y patologías malignas."
    },
    {
      icon: Thermometer,
      title: "Cirugía de Trauma",
      description: "Atención quirúrgica de urgencia para el manejo agudo de lesiones y accidentes severos."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className={styles.section} id="servicios">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.subtitle}>Especialidades</span>
          <h2 className={styles.title}>Servicios y Tratamientos</h2>
          <p className={styles.description}>
            Brindamos atención quirúrgica de excelencia con tecnología de vanguardia 
            y un enfoque humano y personalizado.
          </p>
        </div>

        <motion.div 
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {servicesList.map((service, index) => (
            <motion.div key={index} variants={itemVariants} style={{ height: '100%' }}>
              <ServiceCard 
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
