"use client";
import React, { useEffect, useRef, useState } from "react";
import { getApiPath } from "@/lib/utils";

export default function Tabla({ apiURL, campo, cantidadData, width }) {
  const [datos, setDatos] = useState([]);
  const [highlight, setHighlight] = useState(false);
  const prevPrimerDato = useRef(null);

  const fetchData = async () => {
    try {
      const response = await fetch(getApiPath(apiURL));
      const data = await response.json();
      const nuevosDatos = data.slice(0, cantidadData);

      if (
        nuevosDatos.length > 0 &&
        prevPrimerDato.current &&
        nuevosDatos[0].fecha !== prevPrimerDato.current.fecha
      ) {
        setHighlight(true);
        setTimeout(() => setHighlight(false), 5000);
      }

      prevPrimerDato.current = nuevosDatos[0];
      setDatos(nuevosDatos);
    } catch (error) {
      console.error("Error cargando datos:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalo = setInterval(fetchData, 10000);
    return () => clearInterval(intervalo);
  }, []);

  let columnas = [];

  if (Array.isArray(campo)) {
    columnas = campo.map((c) => ({
      key: c,
      label:
        c === "temperatura"
          ? "Temperatura (ºC)"
          : c === "humedad"
          ? "Humedad (%)"
          : c === "temperaturaCorporal"
          ? "T (ºC)"
          : c === "frecuenciaCardiaca"
          ? "Latidos (bpm)"
          : c,
    }));
  } else {
    columnas = [
      {
        key: campo,
        label:
          campo === "temperatura"
            ? "Temperatura (ºC)"
            : campo === "humedad"
            ? "Humedad (%)"
            : campo === "temperaturaCorporal"
            ? "T (ºC)"
            : campo === "frecuenciaCardiaca"
            ? "Latidos (bpm)"
            : campo,
      },
    ];
  }

  return (
    <div className={`pb-4 lg:pb-0 lg:w-[${width}px]`}>
      <table className="w-full border border-gray-300 rounded-xl overflow-hidden shadow-sm">
        <thead className="tarjeta text-white text-xs">
          <tr>
            <th className="py-2 border-b border-gray-300">Fecha</th>
            {columnas.map((col) => (
              <th key={col.key} className="py-2 border-b border-gray-300">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {datos.map((d, i) => (
            <tr
              key={d.id}
              className={`text-dark text-[14px] border-b border-gray-200 text-center transition ${
                i === 0 && highlight
                  ? "bg-[#b7e1cd] animate-pulse"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              <td className="min-w-[100px]">
                {new Date(d.fecha).toLocaleString()}
              </td>
              {columnas.map((col) => (
                <td key={col.key}>{d[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
