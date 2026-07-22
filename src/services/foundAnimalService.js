import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  orderBy,
  serverTimestamp 
} from "firebase/firestore";
import { db, auth } from "../firebase";

const reportesRef = collection(db, "reportes_animales");

export async function reportarAnimalEncontrado(reporte) {
  const user = auth.currentUser;
  
  try {
    const docRef = await addDoc(reportesRef, {
      ...reporte,
      uidReportador: user ? user.uid : null,
      emailReportador: user ? user.email : null,
      fechaReporte: serverTimestamp(),
      estado: "encontrado",
      notificado: false
    });
    return docRef.id;
  } catch (error) {
    console.error("Error al reportar animal en Firestore:", error.code, error.message);
    throw error;
  }
}

export async function obtenerAnimalesEncontrados() {
  try {
    const q = query(reportesRef, orderBy("fechaReporte", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error al obtener animales encontrados:", error.code, error.message);
    throw error;
  }
}

export async function obtenerMisReportes() {
  const user = auth.currentUser;
  if (!user) throw new Error("Debes iniciar sesión");
  
  try {
    const q = query(reportesRef, where("uidReportador", "==", user.uid));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error al obtener mis reportes:", error.code, error.message);
    throw error;
  }
}

export async function actualizarReporte(id, datos) {
  const docRef = doc(db, "reportes_animales", id);
  try {
    await updateDoc(docRef, datos);
  } catch (error) {
    console.error("Error al actualizar reporte:", error.code, error.message);
    throw error;
  }
}

export async function eliminarReporte(id) {
  const docRef = doc(db, "reportes_animales", id);
  try {
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error al eliminar reporte:", error.code, error.message);
    throw error;
  }
}

export async function buscarMascotaPerdida(criterios) {
  try {
    let q = reportesRef;
    
    if (criterios.especie) {
      q = query(q, where("especie", "==", criterios.especie));
    }
    if (criterios.color) {
      q = query(q, where("color", "==", criterios.color));
    }
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error al buscar mascota perdida:", error.code, error.message);
    throw error;
  }
}
