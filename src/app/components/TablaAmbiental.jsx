"use client";
import React, { useState, useEffect } from "react";

export default function TablaAmbiental() {
  const [datos, setDatos] = useState([]);
  async function fetchData() {
    const response = await fetch("/api/ambiental");
    const data = await response.json();
    setDatos(data);
  }

  useEffect(() => {
    fetchData();
    const intervalo = setInterval(fetchData, 30000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="flex justify-center mb-4">
      <table className="w-xl bg-gray-100 border border-gray-300 rounded-lg shadow-md">
        <thead className="bg-gray-200">
          <tr className="text-left">
            <th>Fecha y hora</th>
            <th>Temperatura (ºC)</th>
            <th>Humedad (%)</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {datos.map((d) => (
            <tr key={d.id} className="hover:bg-gray-100">
              <td>{new Date(d.fecha).toLocaleString()}</td>
              <td>{d.temperatura}</td>
              <td>{d.humedad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
