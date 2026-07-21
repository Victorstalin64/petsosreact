import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
    paddingBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: "#FBBC05",
  },
  logoSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  logoText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#293A4E",
  },
  logoAccent: {
    color: "#FBBC05",
  },
  dateText: {
    fontSize: 10,
    color: "#6c757d",
    textAlign: "right",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#293A4E",
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 18,
    padding: 12,
    backgroundColor: "#f0f4f8",
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#293A4E",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 5,
  },
  row: {
    flexDirection: "row",
    marginBottom: 6,
  },
  label: {
    width: "40%",
    fontSize: 11,
    fontWeight: "bold",
    color: "#293A4E",
  },
  value: {
    width: "60%",
    fontSize: 11,
    color: "#555",
  },
  descriptionBox: {
    marginTop: 8,
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 6,
    borderLeftWidth: 3,
    borderLeftColor: "#FBBC05",
  },
  descriptionText: {
    fontSize: 11,
    color: "#555",
    lineHeight: 1.5,
  },
  badge: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: "#2e9e5b22",
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#2e9e5b",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  footerText: {
    fontSize: 9,
    color: "#6c757d",
  },
  photoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#f0f4f8",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    alignSelf: "center",
    overflow: "hidden",
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    objectFit: "cover",
    alignSelf: "center",
    marginBottom: 15,
  },
});

function MascotaPDF({ mascota }) {
  const fechaGeneracion = new Date().toLocaleDateString("es-EC", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.logoSection}>
            <Text style={styles.logoText}>
              Pet <Text style={styles.logoAccent}>SOS</Text>
            </Text>
          </View>
          <View>
            <Text style={styles.dateText}>Fecha de generación:</Text>
            <Text style={styles.dateText}>{fechaGeneracion}</Text>
          </View>
        </View>

        <Text style={styles.title}>Ficha de Mascota</Text>

        {mascota.fotoUrl && (
          <Image src={mascota.fotoUrl} style={styles.photo} />
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información General</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Nombre:</Text>
            <Text style={styles.value}>{mascota.nombre || "Sin especificar"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Especie:</Text>
            <Text style={styles.value}>{mascota.especie || "Sin especificar"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Raza:</Text>
            <Text style={styles.value}>{mascota.raza || "Sin especificar"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Edad:</Text>
            <Text style={styles.value}>
              {mascota.edad ? `${mascota.edad} años` : "Sin especificar"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Sexo:</Text>
            <Text style={styles.value}>{mascota.sexo || "Sin especificar"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Color:</Text>
            <Text style={styles.value}>{mascota.color || "Sin especificar"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Tamaño:</Text>
            <Text style={styles.value}>{mascota.tamano || "Sin especificar"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Peso:</Text>
            <Text style={styles.value}>
              {mascota.peso ? `${mascota.peso} kg` : "Sin especificar"}
            </Text>
          </View>
        </View>

        {mascota.descripcionFisica && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Descripción Física</Text>
            <View style={styles.descriptionBox}>
              <Text style={styles.descriptionText}>{mascota.descripcionFisica}</Text>
            </View>
          </View>
        )}

        {mascota.enfermedades && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Enfermedades / Condiciones</Text>
            <View style={styles.descriptionBox}>
              <Text style={styles.descriptionText}>{mascota.enfermedades}</Text>
            </View>
          </View>
        )}

        {mascota.vacunas && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Vacunas</Text>
            <View style={styles.descriptionBox}>
              <Text style={styles.descriptionText}>{mascota.vacunas}</Text>
            </View>
          </View>
        )}

        {mascota.caracteristicas && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Características Adicionales</Text>
            <View style={styles.descriptionBox}>
              <Text style={styles.descriptionText}>{mascota.caracteristicas}</Text>
            </View>
          </View>
        )}

        {mascota.esterilizado && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>✓ Esterilizado/a</Text>
          </View>
        )}

        <View style={styles.footer}>
          <Text style={styles.footerText}>PetSOS - Protege a tus mascotas</Text>
          <Text style={styles.footerText}>Documento generado automáticamente</Text>
        </View>
      </Page>
    </Document>
  );
}

function ReporteAnimalPDF({ animal }) {
  const fechaGeneracion = new Date().toLocaleDateString("es-EC", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const fechaReporte = animal.fechaReporte
    ? animal.fechaReporte.toDate
      ? animal.fechaReporte.toDate().toLocaleDateString("es-EC")
      : new Date(animal.fechaReporte).toLocaleDateString("es-EC")
    : "Fecha no disponible";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.logoSection}>
            <Text style={styles.logoText}>
              Pet <Text style={styles.logoAccent}>SOS</Text>
            </Text>
          </View>
          <View>
            <Text style={styles.dateText}>Generado: {fechaGeneracion}</Text>
          </View>
        </View>

        <Text style={styles.title}>Reporte de Animal Encontrado</Text>

        {animal.fotoUrl && (
          <Image src={animal.fotoUrl} style={styles.photo} />
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información del Animal</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Especie:</Text>
            <Text style={styles.value}>{animal.especie || "Sin especificar"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Color:</Text>
            <Text style={styles.value}>{animal.color || "Sin especificar"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Tamaño:</Text>
            <Text style={styles.value}>{animal.tamano || "Sin especificar"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Estado:</Text>
            <Text style={styles.value}>{animal.estadoAnimal || "Sin especificar"}</Text>
          </View>
        </View>

        {animal.descripcionVisual && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Descripción Visual</Text>
            <View style={styles.descriptionBox}>
              <Text style={styles.descriptionText}>{animal.descripcionVisual}</Text>
            </View>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ubicación del Hallazgo</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Dirección:</Text>
            <Text style={styles.value}>{animal.direccionHallazgo || "Sin especificar"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Barrio:</Text>
            <Text style={styles.value}>{animal.barrio || "Sin especificar"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Ciudad:</Text>
            <Text style={styles.value}>{animal.ciudad || "Sin especificar"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Referencia:</Text>
            <Text style={styles.value}>{animal.referenciaUbicacion || "Sin especificar"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Fecha del reporte:</Text>
            <Text style={styles.value}>{fechaReporte}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Datos del Reportador</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Nombre:</Text>
            <Text style={styles.value}>{animal.nombreReportador || "Anónimo"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Teléfono:</Text>
            <Text style={styles.value}>{animal.telefonoReportador || "Sin especificar"}</Text>
          </View>
        </View>

        {animal.notasAdicionales && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notas Adicionales</Text>
            <View style={styles.descriptionBox}>
              <Text style={styles.descriptionText}>{animal.notasAdicionales}</Text>
            </View>
          </View>
        )}

        <View style={styles.footer}>
          <Text style={styles.footerText}>PetSOS - Protege a tus mascotas</Text>
          <Text style={styles.footerText}>Documento generado automáticamente</Text>
        </View>
      </Page>
    </Document>
  );
}

export { MascotaPDF, ReporteAnimalPDF };
