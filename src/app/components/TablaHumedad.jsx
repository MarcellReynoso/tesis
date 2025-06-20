"use client";
import React, { useState, useEffect } from "react";
import { getApiPath } from "@/lib/utils";

export default function TablaHumedad() {
  const [datos, setDatos] = useState([]);

  async function fetchData() {
<<<<<<< HEAD
    const response = await fetch(`${process.env.HOSTNAME}/api/ambiental`);
=======
    const response = await fetch(getApiPath("/api/ambiental"));
>>>>>>> 3c7b3f64763050fb31546be81c57b8b768ccca6f
    const data = await response.json();
    const ultimos = data.slice(0, 10);
    setDatos(ultimos);
  }

  useEffect(() => {
    fetchData();
    const intervalo = setInterval(fetchData, 30000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="pb-4">
      <table className="w-full text-xs lg:text-base">
        <thead className="tarjeta text-white">
          <tr>
            <th scope="col" className="px-6  py-4">
              Fecha
            </th>
            <th scope="col" className="px-6">
              Humedad
            </th>
          </tr>
        </thead>
        <tbody>
          {datos.map((d) => (
            <tr
              key={d.id}
              className="text-dark bg-white border-b dark:border-gray-700 text-center"
            >
              <td
                scope="row"
                className="min-w-[150px]"
              >
                {new Date(d.fecha).toLocaleString()}
              </td>
              <td className="px-6">{d.humedad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
