/**
 * SCRIPT DE SINCRONIZACIÓN FIREBASE -> GOOGLE CALENDAR
 * 
 * INSTRUCCIONES:
 * 1. Ve a https://script.google.com/ y crea un Nuevo Proyecto.
 * 2. Pega todo este código.
 * 3. En Firebase Console, ve a Configuración del proyecto -> Cuentas de servicio -> Generar nueva clave privada.
 * 4. Pega los datos de la clave privada en la variable FIREBASE_CONFIG abajo.
 * 5. Haz clic en "Ejecutar" en la función setupTrigger() por primera vez para autorizar.
 */

// Reemplazar con los datos de tu Service Account de Firebase
const FIREBASE_CONFIG = {
  "project_id": "dr-fermin-galli",
  "private_key": "-----BEGIN PRIVATE KEY-----\nTU_CLAVE_PRIVADA_AQUI\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxxxx@dr-fermin-galli.iam.gserviceaccount.com"
};

const CALENDAR_ID = 'primary'; // 'primary' usa tu calendario principal, o pon el email del calendario.

function syncTurnosToCalendar() {
  // Lógica simplificada: Buscar turnos nuevos en Firestore (Requiere librería externa o REST API)
  // En Apps Script, para conectar con Firestore se recomienda la librería externa "FirestoreApp":
  // ID de la librería: 1VUSl4b1r1eoNcRWotZM3e87i0Ob0v018BvzG01IlP3g523E_n7kK9aQk
  
  const firestore = getFirestore();
  
  // Buscar turnos con status 'pending'
  const turnos = firestore.query("turnos").where("status", "==", "pending").execute();
  
  turnos.forEach(turno => {
    const data = turno.fields;
    
    // Parse fecha y hora
    // date: "2026-06-15", time: "16:30"
    const [year, month, day] = data.date.stringValue.split('-');
    const [hours, minutes] = data.time.stringValue.split(':');
    
    const startTime = new Date(year, month - 1, day, hours, minutes);
    const endTime = new Date(year, month - 1, day, parseInt(hours), parseInt(minutes) + 30);
    
    // Crear el evento en Google Calendar
    CalendarApp.getCalendarById(CALENDAR_ID).createEvent(
      `Turno: ${data.name.stringValue}`, 
      startTime, 
      endTime, 
      {
        description: `Teléfono: ${data.phone.stringValue}\nEmail: ${data.email.stringValue}`
      }
    );
    
    // Actualizar a "confirmed"
    firestore.updateDocument(`turnos/${turno.name.split('/').pop()}`, {
      status: 'confirmed'
    });
  });
}

// Helper genérico para inicializar Firestore usando la REST API si no se usa librería
function getFirestore() {
  // Aquí se inicializa la conexión OAuth con Firebase usando la private_key.
  // Para evitar código masivo, recomendamos añadir la librería FirestoreApp en el editor.
  // Instrucciones: Resources > Libraries > Pegar ID: 1VUSl4b1r1eoNcRWotZM3e87i0Ob0v018BvzG01IlP3g523E_n7kK9aQk
  return FirestoreApp.getFirestore(FIREBASE_CONFIG.client_email, FIREBASE_CONFIG.private_key, FIREBASE_CONFIG.project_id);
}

// Corre esta función una vez manualmente para configurar el robot para que se ejecute cada 15 minutos automatically
function setupTrigger() {
  ScriptApp.newTrigger("syncTurnosToCalendar")
    .timeBased()
    .everyMinutes(15)
    .create();
}
