# 🏥 Guía Fácil: Cómo conectar tu página web de turnos a tu cuenta

¡Hola Doctor Galli! Esta guía es muy sencilla. Nos servirá para que el nuevo sistema de turnos de tu página web guarde todo directamente en tu **cuenta personal de Google**. De este modo, nadie más tendrá acceso a tus pacientes ni a tu agenda.

Solo tienes que seguir estos 3 pasos (¡es como seguir una receta de cocina!):

---

## 🍳 PASO 1: Prepara "La Libreta Mágica" (Firebase)
Aquí es donde se anotarán los datos de los pacientes cuando pidan un turno. Es 100% gratuito.

1. Ve a la página de [Firebase](https://console.firebase.google.com/) e inicia sesión con el Gmail que usas en el consultorio.
2. Haz clic en el botón blanco grande que dice **"Agregar proyecto"**.
3. Ponle de nombre "Turnos Dr Galli" y dale siempre a "Continuar" hasta que termine de cargar.
4. Cuando entres al proyecto, verás varios íconos en el centro. Haz clic en el que parece un piquito `</>` (que significa "Web").
5. Ponle un apodo (por ejemplo, "Mi web") y haz clic en **"Registrar app"**.
6. Te aparecerá una pantalla con un montón de código con letras y números. **Copia todo eso y envíaselo a la persona que te está armando la web**. (Ellos sabrán qué hacer con eso).

---

## 📅 PASO 2: Comparte tu Calendario (Google Calendar)
La página web necesita "ojos" para ver cuándo estás libre y cuándo estás operando o dando consultas, para no dar turnos superpuestos.

1. Entra a tu [Google Calendar](https://calendar.google.com/) desde la computadora.
2. Arriba a la derecha, haz clic en la "Ruedita" ⚙️ y elige **"Configuración"**.
3. En el menú de la izquierda, busca donde dice "Configuración de mis calendarios" y haz clic en tu nombre.
4. Baja un poquito hasta la parte que dice **"Permisos de acceso de los eventos"**.
5. Marca la casilla que dice **"Hacer que esté disponible para el público"**. 
   - ⚠️ **Mucha atención aquí:** Asegúrate de elegir en el desplegable la opción que dice solo **"Ver la información de libre/ocupado"**. Así protegemos tu privacidad: nadie podrá leer el nombre de tus otros pacientes o tus asuntos personales, solo verán "Ocupado" o "Libre".
6. Sigue bajando hasta una sección que dice **"Integrar el calendario"**.
7. Ahí verás algo que se llama **"ID de calendario"** (suele ser simplemente tu dirección de correo electrónico). Copia ese correo y envíaselo también a la persona que te arma la web.

---

## 🤖 PASO 3: Encender el "Robot" de la Agenda
¡Último paso! Ahora necesitamos encender un robot invisible que tomará los datos de "La Libreta" (del Paso 1) y los dibujará en tu Calendario.

1. Ve a esta página: [Google Apps Script](https://script.google.com/) e inicia sesión con tu Gmail.
2. Haz clic en el botón grande arriba a la izquierda que dice **"+ Nuevo proyecto"**.
3. Te aparecerá una pantalla blanca con algunas palabras inglesas. **Borra todo el texto, déjalo en blanco**.
4. Pega ahí adentro el "Código del Robot" que te dará tu desarrollador web cuando la página esté terminada.
5. Cuentas hasta tres, y haces clic en el ícono del disquete 💾 (Guardar) que está arriba.
6. Por último, haz clic en el botón **"Ejecutar"** (▷). 
7. Google se pondrá un poco miedoso y te abrirá una ventana diciendo "Vaya, esto necesita permisos". Haz clic en **"Revisar permisos"**, elige tu cuenta, luego dale a "Configuración Avanzada" (o "Ir igual aunque no sea seguro") y finalmente en **"Permitir"**.

¡Y ya está! 🥳 

A partir de este momento, cada vez que alguien toque "Confirmar Turno" en tu página web, aparecerá mágicamente acomodado en tu calendario de Google y los datos del paciente quedarán guardados de forma segura en tus registros.
