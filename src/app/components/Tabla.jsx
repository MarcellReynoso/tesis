"use client";
import React, { useEffect, useState } from "react";
import { getApiPath } from "@/lib/utils";

export default function Tabla({ apiURL, campo, cantidadData, width }) {
  const [datos, setDatos] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(getApiPath(apiURL));
      const data = await response.json();
      setDatos(data.slice(0, cantidadData));
    } catch (error) {
      console.error("Error cargando datos:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalo = setInterval(fetchData, 10000);
    return () => clearInterval(intervalo);
  }, []);

  let label = 0;

  switch (campo) {
    case "temperatura":
      label = "Temperatura (ºC)";
      break;
    case "humedad":
      label = "Humedad (%)";
      break;
    case "temperaturaCorporal":
      label = "T (ºC)";
      break;
    case "frecuenciaCardiaca":
      label = "Latidos (bpm)";
      break;

    default:
      break;
  }

  return (
    <div className={`pb-4 lg:pb-0 lg:w-[${width}px]`}>
      <table className="w-full text-base border border-gray-300 rounded-xl overflow-hidden shadow-sm">
        <thead className="tarjeta text-white text-xs">
          <tr>
            <th className="px-6 py-4 border-b border-gray-300">Fecha</th>
            <th className="px-6 py-4 border-b border-gray-300">{label}</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((d) => (
            <tr
              key={d.id}
              className="text-dark text-base bg-white border-b border-gray-200 text-center hover:bg-gray-100 transition"
            >
              <td className="min-w-[200px] px-6">
                {new Date(d.fecha).toLocaleString()}
              </td>
              <td className="px-6">{d[campo]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
