import React from 'react';
import styles from './ServiceCard.module.css';

const ServiceCard = ({ icon: Icon, title, description }) => {
  return (
    <div className={styles.card}>
      <div className={styles.iconWrapper}>
        {Icon && <Icon className={styles.icon} size={28} />}
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default ServiceCard;
