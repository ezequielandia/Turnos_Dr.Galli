import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './FAQSection.module.css';
import { ChevronDown } from 'lucide-react';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "¿Cuándo debo consultar a un cirujano?",
      a: "Consultá ante dolor persistente, hernias, bultos, problemas digestivos o indicación médica. También es útil para una segunda opinión."
    },
    {
      q: "¿Siempre es necesario operarse?",
      a: "No. Muchas patologías pueden tratarse sin cirugía. La indicación es individual y basada en cada caso."
    },
    {
      q: "¿Qué estudios necesito antes de operarme?",
      a: "Generalmente análisis de sangre, estudios cardiológicos e imágenes. Se ajusta según el paciente y la cirugía."
    },
    {
      q: "¿Debo hacer ayuno antes de la cirugía?",
      a: "Sí. Habitualmente 6–8 horas sin sólidos y 2 horas sin líquidos claros."
    },
    {
      q: "¿Qué tipo de cirugía se realiza?",
      a: "Puede ser laparoscópica (mínimamente invasiva) o abierta, según el caso."
    },
    {
      q: "¿Cuánto dura la recuperación?",
      a: "Depende del procedimiento. Puede ser desde pocos días hasta varias semanas."
    },
    {
      q: "¿Cuáles son los signos de alarma?",
      a: "Fiebre, dolor intenso, secreción en la herida o inflamación importante. Consultar de inmediato."
    },
    {
      q: "¿La cirugía es segura?",
      a: "Sí. Actualmente los procedimientos son seguros, con riesgos bajos. Se realizan evaluaciones preoperatorias para minimizar complicaciones."
    },
    {
      q: "¿Cuánto tiempo debo estar internado?",
      a: "Depende del tipo de cirugía. Muchas son ambulatorias, mientras que otras requieren internación breve."
    },
    {
      q: "¿Puedo hacer vida normal después de la cirugía?",
      a: "Sí. La mayoría de los pacientes retoma su vida habitual progresivamente, siguiendo indicaciones médicas."
    },
    {
      q: "¿Cuándo puedo volver a hacer ejercicio?",
      a: "Depende del procedimiento. En general, se recomienda retomar actividad física de forma progresiva luego de algunas semanas."
    },
    {
      q: "¿La cirugía deja cicatriz?",
      a: "Sí, pero en muchos casos son pequeñas, especialmente con técnicas laparoscópicas. Con el tiempo mejoran su aspecto."
    },
    {
      q: "¿Puedo manejar después de operarme?",
      a: "No inmediatamente. Se recomienda evitar conducir hasta estar sin dolor y sin efectos de medicación."
    },
    {
      q: "¿Qué pasa si tengo miedo a la cirugía?",
      a: "Es completamente normal. Se brinda información clara y acompañamiento para que el paciente se sienta seguro y contenido."
    },
    {
      q: "¿Necesito acompañante?",
      a: "Sí. Especialmente en cirugías ambulatorias, es importante contar con alguien que te acompañe al alta."
    },
    {
      q: "¿Qué debo llevar el día de la cirugía?",
      a: "Documentación, estudios previos, medicación habitual y ropa cómoda. Se brindan indicaciones específicas previamente."
    },
    {
      q: "¿Cuándo debo volver a control?",
      a: "Habitualmente entre los 7 y 10 días, o según indicación del cirujano."
    }
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.section} id="faq">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.subtitle}>Respuestas Claras</span>
          <h2 className={styles.title}>Preguntas Frecuentes</h2>
          <p className={styles.description}>
            Entiendo que una cirugía puede generar muchas dudas y ansiedad. 
            Acá respondo a las consultas más comunes de mis pacientes.
          </p>
        </div>

        <div className={styles.accordion}>
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`${styles.item} ${openIndex === index ? styles.itemOpen : ''}`}
            >
              <button 
                className={styles.questionButton} 
                onClick={() => toggleAccordion(index)}
              >
                <h3 className={styles.question}>{faq.q}</h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className={styles.icon} size={24} />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={styles.answer}>
                      <p>{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
