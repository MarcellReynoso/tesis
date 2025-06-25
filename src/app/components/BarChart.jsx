"use client";
import { useRef, useEffect, useState } from "react";
import { Chart } from "chart.js/auto";
import { getApiPath } from "@/lib/utils";

export default function BarChart({ apiUrl, width, color }) {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [datos, setDatos] = useState([]);

  async function fetchData() {
    const response = await fetch(getApiPath(apiUrl));
    const data = await response.json();
    setDatos(data);
  }

  useEffect(() => {
    fetchData();
    const intervalo = setInterval(fetchData, 10000);
    return () => clearInterval(intervalo);
  }, [apiUrl]);

  useEffect(() => {
    if (chartRef.current) {
      const context = chartRef.current.getContext("2d");

      // Destruir gráfico anterior si existe
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const etiquetas = datos.map((d) => `Kit ${d.kitId}`);
      const valores = datos.map((d) => d.promedio);


      // Crear nuevo gráfico
      const newChart = new Chart(context, {
        type: "bar",
        data: {
          labels: etiquetas,
          datasets: [
            {
              data: valores,
              backgroundColor: color,
            },
          ],
        },
        options: {
          responsive: false,
          animation: false,
          plugins: {
            legend: {display: false},
          },
          scales: {
            x: {
              type: "category",
            },
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      // Guardar instancia
      chartInstanceRef.current = newChart;
    }

    // Cleanup cuando se desmonta el componente
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [datos]);

  return (
    <div>
      <canvas width={width} ref={chartRef} />
    </div>
  );
}
