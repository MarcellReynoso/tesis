"use client";
import React, { useEffect, useState } from "react";
import { getApiPath } from "@/lib/utils";

export default function Tabla({ apiURL, campo }) {
  const [datos, setDatos] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(getApiPath(apiURL));
      const data = await response.json();
      setDatos(data.slice(0, 10));
    } catch (error) {
      console.error("Error cargando datos:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalo = setInterval(fetchData, 30000);
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
      label = "Temperatura (ºC)";
      break;
    case "frecuenciaCardiaca":
      label = "Frecuencia cardiaca (bpm)";
      break;

    default:
      break;
  }

  return (
    <div className="pb-4">
      <table className="w-full text-xs lg:text-base">
        <thead className="tarjeta text-white">
          <tr>
            <th className="px-6 py-4">Fecha</th>
            <th className="px-6">{label}</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((d) => (
            <tr
              key={d.id}
              className="text-dark bg-white border-b dark:border-gray-700 text-center"
            >
              <td className="min-w-[150px]">
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
