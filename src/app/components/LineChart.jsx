"use client";
import { useRef, useEffect, useState } from "react";
import { Chart } from "chart.js/auto";
import { getApiPath } from "@/lib/utils";

export default function LineChart({ apiUrl, campo, label, width, height, cantidadData, tension }) {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [datos, setDatos] = useState([]);

  async function fetchData() {
    const response = await fetch(getApiPath(apiUrl));
    const data = await response.json();
    // console.log(data);
    const ultimos = data.slice(0, cantidadData).reverse();
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
            tension,
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
            display: true,
            title: { display: true},
          },
        },
      },
    });

    chartInstanceRef.current = newChart;
  }, [datos, campo, label]);

  return (
    <div className="">
      <canvas width={width} height={height} ref={chartRef} />
    </div>
  );
}
