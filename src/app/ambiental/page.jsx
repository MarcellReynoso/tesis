"use client";
import { useEffect, useState } from "react";
import OptimizedImage from "@/app/components/OptimizedImage";
import Card from "@/app/components/Card";
import LineChart from "@/app/components/LineChart";
<<<<<<< HEAD
import TablaTemperatura from "../components/TablaTemperatura";
=======
import { getApiPath } from "@/lib/utils";
>>>>>>> 3c7b3f64763050fb31546be81c57b8b768ccca6f

export default function Page() {
  const [temperaturaPromedio, setTemperaturaPromedio] = useState(null);
  const [kits, setKits] = useState([]);

  useEffect(() => {
    async function fetchData() {
<<<<<<< HEAD
      const res = await fetch(`/api/ambiental/temperatura`);
      console.log(`/api/ambiental/temperatura`);
      const data = await res.json();
=======
      try {
        const res = await fetch(getApiPath("/api/ambiental/temperatura"));
        const data = await res.json();
>>>>>>> 3c7b3f64763050fb31546be81c57b8b768ccca6f

        setTemperaturaPromedio(data.temperaturaPromedio);
        setKits(data.temperaturaActualPorKit);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
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
      <h3 className="text-[#033e42] roboto text-xl md:text-2xl  py-5 text-center lg:text-left">
        Dashboard
      </h3>

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
            <div
              key={kit.kitId}
              className="flex flex-col lg:flex-row gap-4 items-center"
            >
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
      <h3 className="text-[#033e42] roboto text-xl md:text-2xl  py-5 text-center lg:text-left">
        Información por Kit
      </h3>

      <div className="flex flex-col justify-between gap-10 lg:flex-row items-center py-5">
        {kits.map((k) => (
          <div key={k.kitId}>
            <h4 className="text-[#033e42] roboto text-xl md:text-2xl font-semibold py-5 text-center lg:text-left">
              Kit {k.kitId}
            </h4>
            <TablaTemperatura
              apiURL={`/api/ambiental/${k.kitId}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
