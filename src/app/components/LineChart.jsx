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
    // console.log(data);
    const ultimos = data.slice(0, 10).reverse();
    console.log(ultimos);
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
            borderColor: "#51722c",
            backgroundColor: "#84d7dd",
            tension: 0.5,
            showLine: true,
            pointStyle: false,
          },
        ],
      },
      options: {
        responsive: false,
        animation: false,
        plugins: {
          legend: { display: false },
        },
        scales: {
          y: {
            display: true,
            beginAtZero: false,
            title: { display: false },
          },
          x: {
            display: false,
            title: { display: false},
          },
        },
      },
    });

    chartInstanceRef.current = newChart;
  }, [datos, campo, label]);

  return (
    <div className="">
      <canvas width="700" height="120" ref={chartRef} />
    </div>
  );
}
