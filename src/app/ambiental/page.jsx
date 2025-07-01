"use client";
import { useEffect, useState } from "react";
import OptimizedImage from "@/app/components/OptimizedImage";
import Card from "@/app/components/Card";
import LineChart from "@/app/components/LineChart";
import { getApiPath } from "@/lib/utils";
import Tabla from "../components/Tabla";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

export default function Page() {
  const [temperaturaPromedio, setTemperaturaPromedio] = useState(null);
  const [kitsTemperatura, setKitsTemperatura] = useState([]);

  const [humedadPromedio, setHumedadPromedio] = useState(null);
  const [kitsHumedad, setKitsHumedad] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const temperaturaRes = await fetch(getApiPath("/api/ambiental/temperatura"));
        const temperaturaData = await temperaturaRes.json();
        setTemperaturaPromedio(temperaturaData.temperaturaPromedio);
        setKitsTemperatura(temperaturaData.temperaturaActualPorKit);

        const humedadRes = await fetch(getApiPath("/api/ambiental/humedad"));
        const humedadData = await humedadRes.json();
        setHumedadPromedio(humedadData.humedadPromedio);
        setKitsHumedad(humedadData.humedadActualPorKit);
      } catch (error) {
        console.error("Error obteniendo datos:", error);
      }
    }

    fetchData();
    const intervalo = setInterval(fetchData, 5000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <div>
      <h1 className="text-[#033e42] roboto h1 text-3xl md:text-4xl font-bold py-5 text-center lg:text-left">
        VARIABLES AMBIENTALES
      </h1>
      <TabGroup>
        <div className="bg-gray-500 w-min rounded-full mx-auto lg:mx-0">
          <TabList className="flex items-center lg:w-full justify-center gap-5 my-3">
            <Tab className="rounded-full px-3 py-2 text-xl md:text-lg text-white roboto focus:outline-none data-[selected]:bg-[#033e42] data-[selected]:text-white data-[selected]:font-semibold hover:bg-[#336164] hover:text-white hover:cursor-pointer hover:font-semibold">
              Temperatura
            </Tab>
            <Tab className="rounded-full px-3 py-2 text-xl md:text-lg text-white roboto focus:outline-none data-[selected]:bg-[#033e42] data-[selected]:text-white data-[selected]:font-semibold hover:bg-[#336164] hover:text-white hover:cursor-pointer hover:font-semibold">
              Humedad
            </Tab>
          </TabList>
        </div>

        <TabPanels>
          {/* TEMPERATURA */}
          <TabPanel>
            <h2 className="text-[#033e42] roboto text-xl md:text-3xl font-semibold py-2 text-center lg:text-left">
              Temperatura ambiental (ºC)
            </h2>

            <div className="flex flex-col lg:flex-row flex-wrap justify-center lg:justify-between gap-4 py-4">
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/7">
                <OptimizedImage
                  src="/img/temperatura.png"
                  alt="Temperatura"
                  className="w-[60px] mx-auto lg:mx-0"
                />
              </div>
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/7 px-15 lg:px-0">
                <Card
                  titulo="Promedio"
                  valor={temperaturaPromedio}
                  color="bg-[#51722c]"
                  subtitulo="Temperatura (ºC)"
                />
              </div>
              {kitsTemperatura.map((kit) => (
                <div key={kit.kitId} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/7 px-15 lg:px-0">
                  <Card
                    titulo={`Kit ${kit.kitId}`}
                    valor={kit.temperaturaActual}
                    color="bg-[#082d30]"
                    subtitulo="Temperatura actual"
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col lg:flex-row gap-4 lg:gap-10">
              <div className="flex flex-col lg:flex-row w-full lg:w-1/2 justify-between gap-4 px-15 lg:px-0">
                {kitsTemperatura.map((kit) => (
                  <div key={kit.kitId} className="flex flex-col w-full lg:w-1/3">
                    <h3 className="text-[#033e42] roboto text-lg md:text-2xl font-semibold py-2 text-center lg:text-left">
                      Kit {kit.kitId}
                    </h3>
                    <Tabla
                      apiURL={`/api/ambiental/${kit.kitId}`}
                      campo="temperatura"
                      cantidadData={15}
                    />
                  </div>
                ))}
              </div>

              <div className="hidden lg:flex lg:flex-col w-full lg:w-1/2 ">
                {kitsTemperatura.map((kit) => (
                  <div key={kit.kitId} className="flex flex-col">
                    <h3 className="text-[#033e42] roboto text-lg md:text-2xl font-semibold text-center lg:text-left">
                      Kit {kit.kitId}
                    </h3>
                    <LineChart
                      apiUrl={`/api/ambiental/${kit.kitId}`}
                      campo="temperatura"
                      label="Tendencia de temperatura (ºC)"
                      width={800}
                      height={110}
                      cantidadData={15}
                      tension={0.3}
                    />
                  </div>
                ))}
              </div>
            </div>
          </TabPanel>

          {/* HUMEDAD */}
          <TabPanel>
            <h2 className="text-[#033e42] roboto text-xl md:text-3xl font-semibold py-2 text-center lg:text-left">
              Humedad relativa (%)
            </h2>

            <div className="flex flex-col lg:flex-row flex-wrap justify-center lg:justify-between gap-4 py-4">
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/7">
                <OptimizedImage
                  src="/img/humedad.png"
                  alt="Humedad"
                  className="w-[110px] mx-auto lg:mx-0"
                />
              </div>
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/7 px-15 lg:px-0">
                <Card
                  titulo="Promedio"
                  valor={humedadPromedio}
                  color="bg-[#2c5e72]"
                  subtitulo="Humedad (%)"
                />
              </div>
              {kitsHumedad.map((kit) => (
                <div key={kit.kitId} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/7 px-15 lg:px-0">
                  <Card
                    titulo={`Kit ${kit.kitId}`}
                    valor={kit.humedadActual}
                    color="bg-[#043248]"
                    subtitulo="Humedad actual"
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col lg:flex-row gap-4 lg:gap-10">
              <div className="flex flex-col lg:flex-row w-full lg:w-1/2 justify-between gap-4 px-15 lg:px-0">
                {kitsHumedad.map((kit) => (
                  <div key={kit.kitId} className="flex flex-col w-full lg:w-1/3">
                    <h3 className="text-[#033e42] roboto text-lg md:text-2xl font-semibold py-2 text-center lg:text-left">
                      Kit {kit.kitId}
                    </h3>
                    <Tabla
                      apiURL={`/api/ambiental/${kit.kitId}`}
                      campo="humedad"
                      cantidadData={15}
                    />
                  </div>
                ))}
              </div>

              <div className="hidden lg:flex lg:flex-col w-full lg:w-1/2">
                {kitsHumedad.map((kit) => (
                  <div key={kit.kitId} className="flex flex-col">
                    <h3 className="text-[#033e42] roboto text-lg md:text-2xl font-semibold text-center lg:text-left">
                      Kit {kit.kitId}
                    </h3>
                    <LineChart
                      apiUrl={`/api/ambiental/${kit.kitId}`}
                      campo="humedad"
                      label="Tendencia de humedad (%)"
                      width={800}
                      height={110}
                      cantidadData={15}
                      tension={0.3}
                    />
                  </div>
                ))}
              </div>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
}
