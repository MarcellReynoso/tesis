"use client";
import React, { useEffect, useState } from "react";

export default function KPI({ apiUrl, campo, label }) {
  const [valorActual, setValorActual] = useState(null);
  const [valorPromedio, setValorPromedio] = useState(null);

  useEffect(() => {
    async function fetchKPI() {
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        setValorActual(data[`${campo}Actual`]);
        setValorPromedio(data[`${campo}Promedio`]);
      } catch (error) {
        console.error("Error al obtener KPI:", error);
      }
    }
    fetchKPI();
    const intervalo = setInterval(fetchKPI, 5000);
    return () => clearInterval(intervalo);
  }, [apiUrl, campo]);

  return (
    <div className="flex flex-col gap-8 mb-6 justify-center">
      <div className="bg-blue-500 text-white px-6 py-4 rounded-xl shadow-lg w-60 text-center">
        <h3 className="text-lg font-semibold">{label} actual</h3>
        <p className="text-3xl mt-2">{valorActual ?? "0.00"} </p>
      </div>
      <div className="bg-green-500 text-white px-6 py-4 rounded-xl shadow-lg w-60 text-center">
        <h3 className="text-lg font-semibold">{label} promedio</h3>
        <p className="text-3xl mt-2">{valorPromedio ?? "0.00"} </p>
      </div>
    </div>
  );
}
