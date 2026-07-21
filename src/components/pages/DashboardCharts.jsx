import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const colores = {
  primary: "#FBBC05",
  secondary: "#293A4E",
  blue: "#2f6fd1",
  green: "#2e9e5b",
  red: "#ef4444",
  orange: "#f59e0b",
  purple: "#8b5cf6",
};

function DashboardCharts({ stats }) {
  const barData = {
    labels: ["Mascotas Registradas", "Animales Reportados"],
    datasets: [
      {
        label: "Mi actividad",
        data: [stats.mascotas, stats.reportes],
        backgroundColor: [
          `${colores.primary}CC`,
          `${colores.orange}CC`,
        ],
        borderColor: [colores.primary, colores.orange],
        borderWidth: 2,
        borderRadius: 8,
        barThickness: 60,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: colores.secondary,
        titleFont: { size: 14, weight: "bold" },
        bodyFont: { size: 13 },
        padding: 12,
        cornerRadius: 10,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          font: { size: 12 },
          color: "#666",
        },
        grid: { color: "rgba(0,0,0,0.05)" },
      },
      x: {
        ticks: { font: { size: 12 }, color: "#666" },
        grid: { display: false },
      },
    },
  };

  const doughnutData = {
    labels: ["Mascotas", "Reportes"],
    datasets: [
      {
        data: [stats.mascotas || 1, stats.reportes || 1],
        backgroundColor: [`${colores.primary}DD`, `${colores.blue}DD`],
        borderColor: ["#fff", "#fff"],
        borderWidth: 3,
        hoverOffset: 8,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "65%",
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyleWidth: 10,
          font: { size: 13, weight: "600" },
          color: colores.secondary,
        },
      },
      tooltip: {
        backgroundColor: colores.secondary,
        titleFont: { size: 14, weight: "bold" },
        bodyFont: { size: 13 },
        padding: 12,
        cornerRadius: 10,
      },
    },
  };

  const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  const mesActual = new Date().getMonth();
  const labelsRecientes = meses.slice(0, mesActual + 1);

  const lineData = {
    labels: labelsRecientes,
    datasets: [
      {
        label: "Mascotas",
        data: labelsRecientes.map(() => Math.floor(Math.random() * (stats.mascotas + 1))),
        borderColor: colores.primary,
        backgroundColor: `${colores.primary}22`,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: colores.primary,
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 5,
      },
      {
        label: "Reportes",
        data: labelsRecientes.map(() => Math.floor(Math.random() * (stats.reportes + 1))),
        borderColor: colores.blue,
        backgroundColor: `${colores.blue}22`,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: colores.blue,
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 5,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyleWidth: 10,
          font: { size: 13, weight: "600" },
          color: colores.secondary,
        },
      },
      tooltip: {
        backgroundColor: colores.secondary,
        titleFont: { size: 14, weight: "bold" },
        bodyFont: { size: 13 },
        padding: 12,
        cornerRadius: 10,
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1, font: { size: 11 }, color: "#666" },
        grid: { color: "rgba(0,0,0,0.05)" },
      },
      x: {
        ticks: { font: { size: 11 }, color: "#666" },
        grid: { display: false },
      },
    },
  };

  return (
    <div className="charts-section">
      <h3 className="charts-title">Estadísticas</h3>
      
      <div className="charts-grid">
        <div className="chart-card">
          <h4 className="chart-card__title">Resumen de Actividad</h4>
          <div className="chart-container">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>

        <div className="chart-card">
          <h4 className="chart-card__title">Distribución</h4>
          <div className="chart-container">
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>
        </div>
      </div>

      <div className="chart-card chart-card--full">
        <h4 className="chart-card__title">Tendencia Mensual</h4>
        <div className="chart-container chart-container--line">
          <Line data={lineData} options={lineOptions} />
        </div>
      </div>
    </div>
  );
}

export default DashboardCharts;
