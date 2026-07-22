import { 
  collection, 
  addDoc, 
  getDoc,
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  serverTimestamp 
} from "firebase/firestore";
import { db, auth } from "../firebase";

const mascotasRef = collection(db, "mascotas");

export async function registrarMascota(mascota) {
  const user = auth.currentUser;
  if (!user) throw new Error("Debes iniciar sesión para registrar una mascota");
  
  try {
    const docRef = await addDoc(mascotasRef, {
      ...mascota,
      uidDueno: user.uid,
      emailDueno: user.email,
      fechaRegistro: serverTimestamp(),
      estado: "activo"
    });
    return docRef.id;
  } catch (error) {
    console.error("Error al registrar mascota en Firestore:", error.code, error.message);
    throw error;
  }
}

export async function obtenerMisMascotas() {
  const user = auth.currentUser;
  if (!user) throw new Error("Debes iniciar sesión");
  
  try {
    const q = query(mascotasRef, where("uidDueno", "==", user.uid));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error al obtener mascotas:", error.code, error.message);
    throw error;
  }
}

export async function obtenerMascotaPorId(id) {
  const docRef = doc(db, "mascotas", id);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) throw new Error("Mascota no encontrada");
  return { id: snapshot.id, ...snapshot.data() };
}

export async function actualizarMascota(id, datos) {
  const docRef = doc(db, "mascotas", id);
  try {
    await updateDoc(docRef, datos);
  } catch (error) {
    console.error("Error al actualizar mascota:", error.code, error.message);
    throw error;
  }
}

export async function eliminarMascota(id) {
  const docRef = doc(db, "mascotas", id);
  try {
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error al eliminar mascota:", error.code, error.message);
    throw error;
  }
}
