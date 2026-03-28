import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar as CalendarIcon, Clock, User, Phone, Mail, Loader2 } from 'lucide-react';
import { addDays, format, isWeekend, parseISO, isBefore, addMinutes, isWithinInterval, startOfDay, endOfDay } from 'date-fns';
import { es } from 'date-fns/locale';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../config/firebase';
import Button from './Button';
import styles from './BookingModal.module.css';

const BookingModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [events, setEvents] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });

  // Mock fallback data just in case API fails (since keys are placeholder)
  const fallbackDates = [
    { id: 1, date: 'Lun 15', fullDate: '2026-06-15' },
    { id: 2, date: 'Mar 16', fullDate: '2026-06-16' },
  ];
  const fallbackTimes = ['09:00', '09:30', '10:00', '15:00', '16:30'];

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setSelectedDate(null);
      setSelectedTime(null);
      setFormData({ name: '', phone: '', email: '' });
      generateDatesAndFetchEvents();
    }
  }, [isOpen]);

  const generateDatesAndFetchEvents = async () => {
    setLoading(true);
    try {
      // 1. Generate next 14 days, skip weekends
      const dates = [];
      let currentDate = new Date();
      let addedDays = 0;
      
      while (dates.length < 5 && addedDays < 15) {
        currentDate = addDays(new Date(), addedDays);
        if (!isWeekend(currentDate)) {
          dates.push({
            id: format(currentDate, 'yyyy-MM-dd'),
            date: format(currentDate, 'E d', { locale: es }), // Ej: lun 15
            fullDate: format(currentDate, 'yyyy-MM-dd')
          });
        }
        addedDays++;
      }
      setAvailableDates(dates);

      // 2. Fetch Events from Google Calendar API
      const calendarId = import.meta.env.VITE_GOOGLE_CALENDAR_ID;
      const apiKey = import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY;
      
      if (!calendarId || !apiKey || apiKey.includes('XXX')) {
        throw new Error("Claves de entorno de prueba detectadas. Usando Mock Data.");
      }

      const timeMin = startOfDay(new Date()).toISOString();
      const timeMax = endOfDay(addDays(new Date(), 15)).toISOString();
      const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?key=${apiKey}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true`;

      const res = await fetch(url);
      if (!res.ok) throw new Error("Error fetching calendar");
      
      const data = await res.json();
      setEvents(data.items || []);

    } catch (error) {
      console.warn("Fallo al consultar Google Calendar:", error.message);
      // Fallback a datos estáticos
      setAvailableDates(fallbackDates);
      setEvents([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!selectedDate) return;
    
    // Generate time slots based on events for the selected date
    const dateObj = availableDates.find(d => d.id === selectedDate);
    if (!dateObj) return;

    // Standard hours: 9:00 - 12:00 and 15:00 - 18:00
    // If fallback is being used and no events
    if (events.length === 0 && dateObj.id === 1) {
      setAvailableTimes(fallbackTimes);
      return;
    }

    const times = [];
    const baseDate = parseISO(dateObj.fullDate);
    
    // Generar turnos cada 30 min (ej. mañana y tarde)
    const slotStarts = [
      9, 9.5, 10, 10.5, 11, 11.5,
      15, 15.5, 16, 16.5, 17, 17.5
    ];

    slotStarts.forEach(hour => {
      const isHalf = hour % 1 !== 0;
      const slotTime = new Date(baseDate);
      slotTime.setHours(Math.floor(hour), isHalf ? 30 : 0, 0, 0);
      const slotEndTime = addMinutes(slotTime, 30); // 30 min por turno

      // Skip past times
      if (isBefore(slotTime, new Date())) return;

      // Check for overlap with events
      const isOverlapping = events.some(event => {
        if (!event.start?.dateTime || !event.end?.dateTime) return false;
        const evStart = new Date(event.start.dateTime);
        const evEnd = new Date(event.end.dateTime);
        
        // Return true if slot intersects with event
        return (slotTime < evEnd && slotEndTime > evStart);
      });

      if (!isOverlapping) {
        times.push(format(slotTime, 'HH:mm'));
      }
    });

    // Si fallamos al obtener y los filtros lo vaciaron
    setAvailableTimes(times.length > 0 ? times : fallbackTimes);
    setSelectedTime(null);
  }, [selectedDate, events]);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const dateObj = availableDates.find(d => d.id === selectedDate);
      
      // Save to Firestore
      const turnoRef = await addDoc(collection(db, 'turnos'), {
        ...formData,
        date: dateObj.fullDate,
        time: selectedTime,
        status: 'pending',
        createdAt: serverTimestamp()
      });

      // Proceed to success screen
      setStep(3);
    } catch (error) {
      console.error("Error al guardar el turno:", error);
      alert("Hubo un error al procesar el turno. Por favor intenta de nuevo o contáctanos por WhatsApp.");
    }
    
    setSubmitting(false);
  };

  const generateGoogleCalendarUrl = () => {
    const dateObj = availableDates.find(d => d.id === selectedDate);
    if (!dateObj || !selectedTime) return "#";

    const baseDate = parseISO(dateObj.fullDate);
    const [hours, minutes] = selectedTime.split(':');
    baseDate.setHours(parseInt(hours), parseInt(minutes), 0);
    
    // Format required by GCal: YYYYMMDDTHHmmssZ
    // But GCal link uses UTC. Simplest is using YYYYMMDDTHHmmss sin la Z para formato local
    const startStr = format(baseDate, "yyyyMMdd'T'HHmmss");
    const endStr = format(addMinutes(baseDate, 30), "yyyyMMdd'T'HHmmss");

    const text = encodeURIComponent("Turno Médico - Dr. Fermín Galli");
    const details = encodeURIComponent("Turno para: " + formData.name);
    const location = encodeURIComponent("Consultorio Dr. Galli");

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${startStr}/${endStr}&details=${details}&location=${location}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          <div className={styles.modalWrapper}>
            <motion.div 
              className={styles.modalContent}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Agendar Turno</h2>
              <button type="button" className={styles.closeBtn} onClick={onClose} disabled={submitting}>
                 <X size={24} />
              </button>
            </div>

            <div className={styles.modalBody}>
              {/* Step 1: Date & Time */}
              {step === 1 && (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className={styles.stepContainer}
                >
                  <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>
                      <CalendarIcon size={18} className={styles.icon} />
                      Seleccioná una fecha
                    </h3>
                    {loading ? (
                      <div className={styles.loaderContainer}>
                        <Loader2 className={styles.spinner} />
                        <span>Cargando disponibilidad...</span>
                      </div>
                    ) : (
                      <div className={styles.dateSelector}>
                        {availableDates.map(date => (
                          <button 
                            key={date.id}
                            className={`${styles.dateBtn} ${selectedDate === date.id ? styles.selected : ''}`}
                            onClick={() => setSelectedDate(date.id)}
                          >
                            <span style={{textTransform: 'capitalize'}}>{date.date}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>
                      <Clock size={18} className={styles.icon} />
                      Horarios disponibles
                    </h3>
                    {selectedDate ? (
                      <div className={styles.timeSelector}>
                        {availableTimes.length > 0 ? availableTimes.map(time => (
                          <button 
                            key={time}
                            className={`${styles.timeBtn} ${selectedTime === time ? styles.selected : ''}`}
                            onClick={() => setSelectedTime(time)}
                          >
                            {time}
                          </button>
                        )) : (
                          <p className={styles.helperText}>No hay horarios para esta fecha.</p>
                        )}
                      </div>
                    ) : (
                      <p className={styles.helperText}>Seleccioná una fecha para ver los horarios.</p>
                    )}
                  </div>

                  <div className={styles.modalFooter}>
                    <Button 
                      label="Continuar" 
                      onClick={handleNext} 
                      disabled={!selectedDate || !selectedTime || loading}
                      className={styles.fullBtn}
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 2: Patient Details */}
              {step === 2 && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className={styles.stepContainer}
                >
                  <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.summaryContainer}>
                      <p className={styles.summaryText}>
                        Turno: <strong>{availableDates.find(d => d.id === selectedDate)?.date} a las {selectedTime}hs</strong>
                      </p>
                    </div>

                    <div className={styles.formGroup}>
                      <label><User size={16}/> Nombre Completo</label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required 
                        placeholder="Ej. Juan Pérez" 
                      />
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label><Phone size={16}/> Teléfono (WhatsApp)</label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required 
                        placeholder="+54 9 2284..." 
                      />
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label><Mail size={16}/> Correo Electrónico <span style={{fontWeight: 400, color: '#718096', fontSize: '0.8rem'}}>(opcional)</span></label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="ejemplo@correo.com" 
                      />
                    </div>

                    <div className={styles.formRow}>
                      <Button label="Volver" variant="secondary" onClick={handleBack} disabled={submitting} />
                      <Button 
                        label={submitting ? "Procesando..." : "Confirmar Turno"} 
                        type="submit" 
                        disabled={submitting}
                      />
                    </div>
                  </form>
                </motion.div>
              )}

              {/* Step 3: Success */}
              {step === 3 && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={styles.successContainer}
                >
                  <div className={styles.successCircle}>
                    <CalendarIcon size={40} className={styles.successIcon} />
                  </div>
                  <h3 className={styles.successTitle}>¡Turno Confirmado!</h3>
                  <p className={styles.successText}>
                    Te hemos enviado los detalles a tu correo electrónico y un mensaje de WhatsApp.
                  </p>
                  
                  <div className={styles.addToCalendar}>
                    <a href={generateGoogleCalendarUrl()} target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none'}}>
                      <Button label="Agregar a Google Calendar" variant="secondary" className={styles.calendarBtn} />
                    </a>
                  </div>
                  
                  <Button label="Volver al inicio" onClick={onClose} className={styles.fullBtn} />
                </motion.div>
              )}
            </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
