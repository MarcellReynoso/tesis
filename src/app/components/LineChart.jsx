"use client";
import { useRef, useEffect, useState } from "react";
import { Chart } from "chart.js/auto";

export default function LineChart({ apiUrl, campo, label }) {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [datos, setDatos] = useState([]);

  async function fetchData() {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const ultimos = data.slice(0, 20).reverse();
    setDatos(ultimos);
  }

  useEffect(() => {
    fetchData();
    const intervalo = setInterval(fetchData, 10000);
    return () => clearInterval(intervalo);
  }, [apiUrl]);

  useEffect(() => {
    if (!chartRef.current || datos.length === 0) return;

    const context = chartRef.current.getContext("2d");

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const labels = datos.map((d) =>
      new Date(d.fecha).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
    const valores = datos.map((d) => d[campo]);

    const newChart = new Chart(context, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            data: valores,
            fill: false,
            borderColor: "lightblue",
            backgroundColor: "lightblue",
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        animation: false,
        plugins: {
          legend: { display: false },
        },
        scales: {
          y: {
            beginAtZero: false,
            title: { display: true, text: label },
          },
          x: {
            title: { display: true, text: "Hora" },
          },
        },
      },
    });

    chartInstanceRef.current = newChart;
  }, [datos, campo, label]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <canvas ref={chartRef} />
    </div>
  );
}
