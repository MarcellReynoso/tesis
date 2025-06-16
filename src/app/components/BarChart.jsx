"use client";
import { useRef, useEffect } from 'react';
import { Chart } from 'chart.js/auto';

export default function BarChart() {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const context = chartRef.current.getContext("2d");

      // Destruir gráfico anterior si existe
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      // Crear nuevo gráfico
      const newChart = new Chart(context, {
        type: "bar",
        data: {
          labels: ["John", "Jane", "Doe"],
          datasets: [{
            label: "Info",
            data: [34, 64, 23],
            backgroundColor: "orange",
            borderColor: "red",
            borderWidth: 1,
          }],
        },
        options: {
          responsive: true,
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
  }, []);

  return (
    <div style={{ position: "relative", width: "90vw", height: "80vh" }}>
      <canvas ref={chartRef} />
    </div>
  );
}
