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
        const temperaturaRes = await fetch(
          getApiPath("/api/ambiental/temperatura")
        );
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
      <TabGroup className={""}>
        <div className="bg-gray-500 w-min rounded-full mx-auto lg:mx-0">
          <TabList
            className={
              "flex items-center lg:w-full justify-center gap-5 md:gap-0 md:pr-0 my-3"
            }
          >
            <Tab
              className={
                "rounded-full px-3 py-2 text-xl md:text-lg text-white roboto focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-selected:bg-[#033e42] data-selected:text-white data-selected:font-semibold hover:bg-[#336164] hover:text-white hover:cursor-pointer hover:font-semibold"
              }
            >
              Temperatura
            </Tab>
            <Tab
              className={
                "rounded-full px-3 py-2 text-xl md:text-lg text-white roboto  focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-selected:bg-[#033e42] data-selected:text-white data-selected:font-semibold hover:bg-[#336164] hover:text-white hover:cursor-pointer hover:font-semibold"
              }
            >
              Humedad
            </Tab>
          </TabList>
        </div>
        <TabPanels>
          <TabPanel>
            {/* Temperatura */}
            <h2 className="text-[#033e42] roboto text-xl md:text-3xl font-semibold py-2 md:text-left text-center">
              Temperatura ambiental (ºC)
            </h2>

            <div className="flex flex-col gap-5 lg:gap-10 lg:flex-row items-center py-5">
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
              <div className="flex items-center justify-center lg:w-auto w-[285px]">
                {/* Este div define el ancho del Card */}
                <div className="w-full lg:w-[200px] h-[120px]">
                  <Card
                    titulo="Promedio"
                    valor={temperaturaPromedio}
                    color="bg-[#51722c]"
                    subtitulo={"Temperatura (ºC)"}
                  />
                </div>
              </div>

              <div>
                <h3 className="md:hidden pt-5 flex w-full text-[#033e42] roboto text-xl text-center font-semibold">
                  Temperaturas actuales
                </h3>
              </div>

              {/* Columna 3: KPIs y Gráficos */}
              <div className="flex flex-col gap-4 flex-1 lg:py-5 md:py-0">
                {kitsTemperatura.map((kit) => (
                  <div
                    key={kit.kitId}
                    className="flex flex-col lg:flex-row gap-4 items-center"
                  >
                    {/* ESTE div define el ancho del Card */}
                    <div className="w-full lg:w-[200px] h-[120px]">
                      <Card
                        titulo={`Kit ${kit.kitId}`}
                        valor={kit.temperaturaActual}
                        color="bg-[#082d30]"
                        subtitulo={"Temperatura actual"}
                      />
                    </div>

                    {/* Gráfico ocupa el espacio restante */}
                    <div className="hidden lg:block">
                      <LineChart
                        apiUrl={`/api/ambiental/${kit.kitId}`}
                        campo="temperatura"
                        label="Tendencia de temperatura (ºC)"
                        width={500}
                        height={130}
                        cantidadData={10}
                      />
                    </div>
                    <div>
                      <Tabla
                        apiURL={`/api/ambiental/${kit.kitId}`}
                        campo="temperatura"
                        cantidadData={3}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            {/* Humedad */}
            <h2 className="text-[#033e42] roboto text-xl md:text-3xl font-semibold py-2 md:text-left text-center">
              Humedad relativa (%)
            </h2>

            <div className="flex flex-col gap-5 lg:gap-10 lg:flex-row items-center py-5">
              <div className="flex justify-center ">
                <OptimizedImage
                  src="/img/humedad.png"
                  alt="Humedad"
                  className="w-[100px]"
                />
              </div>

              <div className="flex items-center justify-center">
                <div className="lg:w-auto w-[285px] h-[120px]">
                  <Card
                    titulo="Promedio"
                    valor={humedadPromedio}
                    color="bg-[#2c5e72]"
                    subtitulo={"Humedad relativa"}
                  />
                </div>
              </div>

              <div>
                <h3 className="md:hidden pt-5 flex w-full text-[#033e42] roboto text-xl text-center">
                  Humedades actuales
                </h3>
              </div>

              <div className="flex flex-col gap-4 flex-1 lg:py-5 md:py-0">
                {kitsHumedad.map((kit) => (
                  <div
                    key={kit.kitId}
                    className="flex flex-col lg:flex-row gap-4 items-center"
                  >
                    <div className="w-full lg:w-[200px] h-[120px]">
                      <Card
                        titulo={`Kit ${kit.kitId}`}
                        valor={kit.humedadActual}
                        color="bg-[#043248]"
                        subtitulo={"Humedad actual"}
                      />
                    </div>
                    <div className="hidden lg:block">
                      <LineChart
                        apiUrl={`/api/ambiental/${kit.kitId}`}
                        campo="humedad"
                        label="Tendencia de humedad (%)"
                        width={500}
                        cantidadData={10}
                      />
                    </div>
                    <div>
                      <Tabla
                        apiURL={`/api/ambiental/${kit.kitId}`}
                        campo="humedad"
                        cantidadData={3}
                        width={350}
                      />
                    </div>
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
