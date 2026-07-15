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
  
  const docRef = await addDoc(reportesRef, {
    ...reporte,
    uidReportador: user ? user.uid : null,
    emailReportador: user ? user.email : null,
    fechaReporte: serverTimestamp(),
    estado: "encontrado",
    notificado: false
  });
  return docRef.id;
}

export async function obtenerAnimalesEncontrados() {
  const q = query(reportesRef, orderBy("fechaReporte", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function obtenerMisReportes() {
  const user = auth.currentUser;
  if (!user) throw new Error("Debes iniciar sesión");
  
  const q = query(reportesRef, where("uidReportador", "==", user.uid));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function actualizarReporte(id, datos) {
  const docRef = doc(db, "reportes_animales", id);
  await updateDoc(docRef, datos);
}

export async function eliminarReporte(id) {
  const docRef = doc(db, "reportes_animales", id);
  await deleteDoc(docRef);
}

export async function buscarMascotaPerdida(criterios) {
  let q = reportesRef;
  
  if (criterios.especie) {
    q = query(q, where("especie", "==", criterios.especie));
  }
  if (criterios.color) {
    q = query(q, where("color", "==", criterios.color));
  }
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
