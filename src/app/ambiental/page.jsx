"use client";
import { useEffect, useState } from "react";
import OptimizedImage from "@/app/components/OptimizedImage";
import Card from "@/app/components/Card";
import LineChart from "@/app/components/LineChart";

export default function Page() {
  const [temperaturaPromedio, setTemperaturaPromedio] = useState(null);
  const [kits, setKits] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/ambiental/temperatura");
      const data = await res.json();

      setTemperaturaPromedio(data.temperaturaPromedio);
      setKits(data.temperaturaActualPorKit);
    }

    fetchData();
    const intervalo = setInterval(fetchData, 5000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-[#033e42] roboto text-3xl md:text-4xl font-bold py-5 text-center lg:text-left">
       VARIABLES AMBIENTALES
      </h1>
      <h2 className="text-[#033e42] roboto text-2xl md:text-3xl font-semibold py-5 text-center lg:text-left">
        Temperatura ambiental (ºC)
      </h2>

      {/* ✅ Contenedor general en flex */}
      <div className="flex flex-col gap-10 lg:flex-row items-center py-5">
        {/* Columna 1: Imagen */}
        <div className="flex justify-center px-4">
          <OptimizedImage
            src="/img/temperatura.png"
            alt="Temperatura"
            width={100}
            height={100}
            className="w-[100px]"
          />
        </div>

        {/* Columna 2: Promedio global */}
        <div className="flex items-center justify-center">
          {/* Este div define el ancho del Card */}
          <div className="w-[200px] h-[120px]">
            <Card
              titulo="Promedio global"
              valor={temperaturaPromedio}
              color="bg-[#51722c]"
            />
          </div>
        </div>

        {/* Columna 3: KPIs y Gráficos */}
        <div className="flex flex-col gap-4 flex-1">
          {kits.map((kit) => (
            <div key={kit.kitId} className="flex flex-col lg:flex-row gap-4 items-center">
              {/* ESTE div define el ancho del Card */}
              <div className="w-[200px] h-[120px]">
                <Card
                  titulo={`Kit ${kit.kitId}`}
                  valor={kit.temperaturaActual}
                  color="bg-[#082d30]"
                />
              </div>

              {/* Gráfico ocupa el espacio restante */}
              <div className="hidden lg:block">
                <LineChart
                  apiUrl={`/api/ambiental/${kit.kitId}`}
                  campo="temperatura"
                  label="Tendencia de temperatura (ºC)"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
