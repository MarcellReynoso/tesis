"use client";
import React, { useEffect, useState } from "react";
import { getApiPath } from "@/lib/utils";

export default function KPI({ apiUrl, campo}) {
  const [valorActual, setValorActual] = useState(null);
  const [valorPromedio, setValorPromedio] = useState(null);

  useEffect(() => {
    async function fetchKPI() {
      try {
        const res = await fetch(getApiPath(apiUrl));
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
    <div className="grid content-around gap-5 w-full justify-end">
      <div className="tarjeta text-white px-6 py-4 rounded-2xl shadow-lg w-50 lg:w-60  text-center">
        <h3 className="text-xs font-bold">
          ACTUAL
        </h3>
        <p className="text-4xl lg:text-6xl mt-2 font-semibold">{valorActual ?? "0.00"} </p>
      </div>
      <div className="tarjeta2 text-white px-6 py-4 rounded-2xl shadow-lg w-50 lg:w-60 text-center">
        <h3 className="text-xs font-bold">
          PROMEDIO
        </h3>
        <p className="text-4xl lg:text-6xl mt-2 font-semibold">
          {valorPromedio ?? "0.00"}{" "}
        </p>
      </div>
    </div>
  );
}
