import React from 'react';
import styles from './Button.module.css';

const Button = ({ label, variant = 'primary', size = 'medium', icon: Icon, onClick, className = '' }) => {
  return (
    <button 
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${className}`} 
      onClick={onClick}
    >
      {Icon && <Icon className={styles.icon} size={18} />}
      {label}
    </button>
  );
};

export default Button;
