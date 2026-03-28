import React from 'react';
import { Star, Award } from 'lucide-react';
import styles from './DoctorCard.module.css';

const DoctorCard = ({ image, name, specialty, rating, years }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={name} className={styles.image} />
      </div>
      <div className={styles.content}>
        <h4 className={styles.name}>{name}</h4>
        <p className={styles.specialty}>{specialty}</p>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <Star size={16} className={styles.iconStar} />
            <span>{rating}</span>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.stat}>
            <Award size={16} className={styles.iconAward} />
            <span>{years} Años Exp.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
