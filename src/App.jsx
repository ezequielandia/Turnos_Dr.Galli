import React, { useState } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Services from './components/sections/Services';
import About from './components/sections/About';
import FAQSection from './components/sections/FAQSection';
import ContactSection from './components/sections/ContactSection';
import WhatsAppFloating from './components/common/WhatsAppFloating';
import BookingModal from './components/common/BookingModal';

function App() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const openBookingModal = () => setIsBookingModalOpen(true);
  const closeBookingModal = () => setIsBookingModalOpen(false);

  return (
    <HelmetProvider>
      <Helmet>
        <title>Dr. Fermín Galli | Cirujano General y Oncológico</title>
        <meta name="description" content="Medicina quirúrgica moderna, cirugías laparoscópicas y tratamientos oncológicos en Gral. La Madrid." />
      </Helmet>
      
      <div className="app-container">
        <Navbar onBookClick={openBookingModal} />
        
        <main>
          <Hero onBookClick={openBookingModal} />
          <Services />
          <About />
          <FAQSection />
          <ContactSection />
        </main>

        <Footer />
        
        <WhatsAppFloating />
        
        <BookingModal 
          isOpen={isBookingModalOpen} 
          onClose={closeBookingModal} 
        />
      </div>
    </HelmetProvider>
  );
}

export default App;
