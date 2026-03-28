# Landing Page – Dr. Fermín Galli (Cirujano)

Construcción de una Landing Page profesional y escalable en React para el Dr. Fermín Galli,
cirujano general y oncológico. Arquitectura modular con cada componente en su propio archivo,
estilos por CSS Modules y diseño premium (glassmorphism, animaciones sutiles, paleta médica
oscura/elegante).

---

## User Review Required

> [!IMPORTANT]
> El directorio `c:\Users\c5220118\Downloads\Desarrollos\fermin-galli` está **vacío**.
> Se creará un proyecto React completo desde cero usando **Vite + React**.

> [!NOTE]
> Las imágenes del Hero y Sobre Mí utilizarán las fotografías originales del sitio oficial del Dr. Galli.

---

## Stack Técnico

| Herramienta | Uso |
|---|---|
| Vite + React | Framework y bundler |
| CSS Modules | Estilos aislados por componente |
| Lucide-react | Iconos vectoriales médicos |
| Framer Motion | Micro-animaciones de staggered fade-in ("Trust") |
| React Helmet Async | Gestión de SEO y posicionamiento local |
| Firebase (Firestore) | Base de datos gratuita para almacenar reservas |
| Google Calendar API | Obtención de disponibilidad del calendario |

---

## Estructura de Carpetas

```
src/
├── assets/          ← imágenes generadas con IA
├── components/
│   ├── common/
│   │   ├── Button.jsx / Button.module.css
│   │   ├── ServiceCard.jsx / ServiceCard.module.css
│   │   └── DoctorCard.jsx / DoctorCard.module.css
│   ├── layout/
│   │   ├── Navbar.jsx / Navbar.module.css
│   │   └── Footer.jsx / Footer.module.css
│   └── sections/
│       ├── Hero.jsx / Hero.module.css
│       ├── Services.jsx / Services.module.css
│       ├── About.jsx / About.module.css
│       ├── FAQSection.jsx / FAQSection.module.css
│       └── ContactSection.jsx / ContactSection.module.css
├── styles/
│   └── globals.css
├── App.jsx
└── main.jsx
```

---

## Propuesta Visual

- **Paleta**: Blanco roto / Azul marino profundo (`#0B1F3A`) / Dorado sutil (`#C9A84C`) como acento
- **Tipografía**: Google Fonts – *Playfair Display* (títulos elegantes) + *Inter* (cuerpo)
- **Efectos**: LiquidGlass en Navbar (backdrop-filter blur), cards con glassmorphism, animaciones de fade-in al hacer scroll
- **Hero**: Carrusel de 4 imágenes fullwidth con overlay oscuro + DoctorCard flotante + botón CTA flotante

---

## Proposed Changes

### Fase 0 – Scaffolding

#### [NEW] Proyecto Vite + React
`npx create-vite@latest . --template react`

#### [NEW] Dependencias adicionales
`npm install lucide-react framer-motion react-helmet-async`

---

### Fase 1 – Componentes Comunes (common/)

#### [NEW] Button.jsx + Button.module.css
- Props: `label`, `variant` (`primary` | `secondary`), `size`, `icon`, `onClick`
- Variante `primary`: fondo azul marino, bordes redondeados, sombra sutil

#### [NEW] WhatsAppFloating.jsx + WhatsAppFloating.module.css
- Botón flotante de WhatsApp en `fixed bottom-right`.
- Delay de 5 segundos de carga para mostrar tooltip de conversión: "¿Tenés una urgencia? Hablá conmigo ahora".
- Salida rápida al trato humano para quienes abandonen o duden del BookingModal.

#### [NEW] ServiceCard.jsx + ServiceCard.module.css
- Props: `icon`, `title`, `description`
- Glassmorphism card con border sutil y hover lift effect

#### [NEW] DoctorCard.jsx + DoctorCard.module.css
- Props: `image`, `name`, `specialty`, `rating`, `years`
- Card flotante estilo "bokeh" con foto circular, estrella de rating y badge de experiencia

---

### Fase 2 – Layout (layout/)

#### [NEW] Navbar.jsx + Navbar.module.css
- Título "Dr. Fermín Galli" + subtítulo "Médico Cirujano"
- Links: Agenda, Sobre mí, Servicios, Preguntas Frecuentes, Contacto
- CTA botón "CONSULTAS" a la derecha
- LiquidGlass: `backdrop-filter: blur(16px)`, fondo semi-transparente, scroll-aware (solid en scroll)

#### [NEW] Footer.jsx + Footer.module.css
- Copyright, links de política, iconos sociales (placeholder)

---

### Fase 3 – Secciones (sections/)

#### [NEW] Hero.jsx + Hero.module.css
- Imagen de fondo: `hero_background.jpg` (extraída del sitio real)
- Texto principal: "Medicina quirúrgica moderna, centrada en vos"
- DoctorCard del Dr. Galli (Médico Cirujano M.P. 82294) flotando sobre imagen
- Button flotante "Agenda tu turno" (Abre modal con link a Formulario/WhatsApp)

#### [NEW] Services.jsx + Services.module.css
- Tags de categorías quirúrgicas (filtro visual)
- Grid de ServiceCards (Especialidades: Cirugía General, Cirugía Laparoscópica, Cirugía Mínimamente Invasiva, Cirugía de Trauma)

#### [NEW] About.jsx + About.module.css
- Foto principal grande del Dr. Galli (`doctor_portrait.jpg`, original del sitio)
- Texto Biográfico: Médico Cirujano (M.P. 82294), 33 años. Enfoque en medicina quirúrgica moderna, segura, menos invasiva y centrada en el paciente con recuperaciones más rápidas.
- Estadísticas o puntos clave (recuperación rápida, técnicas avanzadas)

#### [NEW] Testimonials.jsx + Testimonials.module.css
- Sección de prueba social clave para cirugía (ej. 750+ Reviews/Pacientes).
- Tarjetas de testimonio (usaremos frases/agradecimientos genéricos como placeholder hasta tener las reales).

#### [NEW] FAQSection.jsx + FAQSection.module.css
- Acordeón con las 17 preguntas y respuestas reales del sitio (ej. ¿Cuándo consultar a un cirujano?, Estudios pre-quirúrgicos, Recuperación, etc.)
- Animación smooth de expand/collapse

#### [NEW] ContactSection.jsx + ContactSection.module.css
- Layout 2 columnas: datos de contacto + formulario
- Datos de contacto: 
  - Ubicación: Gral. La Madrid, Buenos Aires, Argentina
  - WhatsApp: +54 9 2284 72-2879
  - Correo: Cirugia.galli@gmail.com
  - Redes: Instagram (@cirugia.fgalli), Facebook (Cirugia.fgalli)
- Formulario: Nombre, Email, Asunto, Mensaje + botón Enviar

---

### Fase 4 – Integración (App.jsx)

#### [NEW] App.jsx
- Ensambla todos los componentes en orden
- Estado global: `showModal` para el modal de Agenda

#### [NEW] BookingModal.jsx + BookingModal.module.css (Sistema de Turnos Nativo)
- **UI Profesional**: En lugar de iframes o Google Forms, un selector de fechas y horas elegante integrado 100% con los colores de la marca.
- **Lectura de Fechas**: Consulta a la API de Google Calendar (con calendario público) para renderizar en el Front los bloques de tiempo libres.
- **Reserva Backend**: Guarda los datos del paciente en **Firebase Firestore** (gratuito). Posteriormente un Google Apps Script se encargará de impactarlo en el calendario.
- **Flujo final**: Pantalla de confirmación exitosa con la funcionalidad "Agregar a mi calendario" (links para Google Calendar, Outlook, iCal) en lugar de una redirección.

#### [NEW] SEO / React Helmet
- Configuración de `react-helmet-async` en `App.jsx` para el SEO y metadatos locales (ej. "Cirujano Oncológico y General en Gral. La Madrid", "Dr. Fermín Galli").

---

## Open Questions

> [!IMPORTANT]
> **Imágenes y Contenido:** Hemos descargado el logotipo, la imagen de fondo y el retrato oficial del doctor, además de las preguntas frecuentes. El sitio se construirá con el 100% del contenido original.

---

## Verification Plan

### Automated Tests
- `npm run dev` → verificar que el servidor levanta sin errores
- Revisión visual en browser con el subagente

### Manual Verification
- Carrusel Hero funciona automáticamente
- Navbar se vuelve sólido al hacer scroll
- Modal de Agenda se abre desde múltiples CTAs
- Acordeón FAQ abre/cierra correctamente
- Formulario de Contacto envía (muestra alert placeholder)
- Diseño responsive en mobile/desktop
