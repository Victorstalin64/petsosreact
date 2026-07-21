import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBqe_tA28isUtepPCND2HE_0wAAoUhpVDk",
  authDomain: "petsos-app-69847.firebaseapp.com",
  projectId: "petsos-app-69847",
  storageBucket: "petsos-app-69847.appspot.com",
  messagingSenderId: "589161654283",
  appId: "1:589161654283:web:02fb3c7f2b8ccd5ac87f0e"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

let messaging = null;
try {
  if (typeof window !== "undefined" && "serviceWorker" in navigator) {
    messaging = getMessaging(app);
  }
} catch {
  console.warn("Firebase Messaging no disponible en este entorno");
}

export { messaging };

export async function solicitarPermisoNotificaciones() {
  if (!messaging) return null;
  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") return null;
    const token = await getToken(messaging, {
      vapidKey: "BEl62iUYgUivxIkv69yViEuuiJqzI-cCQ4R5dY95sFQnYK4g9SvYKx2K8e3P7G5Q9T3R6W8J1M0N4"
    });
    return token;
  } catch (err) {
    console.error("Error al obtener token de notificación:", err);
    return null;
  }
}

export function escucharMensajesPush(callback) {
  if (!messaging) return () => {};
  return onMessage(messaging, (payload) => {
    callback(payload);
  });
}
