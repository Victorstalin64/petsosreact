import { useState, useEffect } from "react";
import { solicitarPermisoNotificaciones, escucharMensajesPush } from "../firebase";

export function useNotificacionesPush() {
  const [token, setToken] = useState(null);
  const [ultimoMensaje, setUltimoMensaje] = useState(null);
  const [permiso, setPermiso] = useState(
    typeof Notification !== "undefined" ? Notification.permission : "default"
  );

  useEffect(() => {
    async function solicitar() {
      const t = await solicitarPermisoNotificaciones();
      if (t) {
        setToken(t);
        setPermiso("granted");
      }
    }
    solicitar();

    const unsubscribe = escucharMensajesPush((payload) => {
      setUltimoMensaje(payload);
      if (Notification.permission === "granted") {
        new Notification(payload.notification?.title || "PetSOS", {
          body: payload.notification?.body || "Tienes una nueva notificación",
          icon: "/pet.png"
        });
      }
    });

    return () => {
      if (typeof unsubscribe === "function") unsubscribe();
    };
  }, []);

  const solicitarPermiso = async () => {
    const t = await solicitarPermisoNotificaciones();
    if (t) {
      setToken(t);
      setPermiso("granted");
      return true;
    }
    return false;
  };

  return { token, permiso, ultimoMensaje, solicitarPermiso };
}
