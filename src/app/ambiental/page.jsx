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
    <div className="px-6">
      <h1 className="text-[#033e42] roboto text-2xl md:text-4xl font-bold py-2 md:text-left text-center">
        VARIABLES AMBIENTALES
      </h1>
      <TabGroup className={"bg-red"}>
        <TabList
          className={
            "flex justify-center md:justify-start gap-10 mx-auto pr-4 md:pr-0 py-3 "
          }
        >
          <Tab
            className={
              "rounded-full px-3 py-2 text-xl md:text-lg text-[#033e42] roboto focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-selected:bg-[#033e42] data-selected:text-white data-selected:font-semibold hover:bg-[#336164] hover:text-white hover:cursor-pointer"
            }
          >
            Temperatura
          </Tab>
          <Tab
            className={
              "rounded-full px-3 py-2 text-xl md:text-lg text-[#033e42] roboto font-semibold focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-selected:bg-[#033e42] data-selected:text-white data-selected:font-semibold hover:bg-[#336164] hover:text-white hover:cursor-pointer"
            }
          >
            Humedad
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {/* Temperatura */}
            <h2 className="text-[#033e42] roboto text-xl md:text-3xl font-semibold py-2 md:text-left text-center">
              Temperatura ambiental (ºC)
            </h2>
            <h3 className="hidden md:block text-[#033e42] roboto text-xl md:text-2xl  py-2 text-center md:text-left text-center">
              Dashboard
            </h3>

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

              <div>
                <h3 className="md:hidden pt-5 flex w-full text-[#033e42] roboto text-xl text-center">
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
            <h3 className="text-[#033e42] roboto text-xl md:text-2xl text-center md:text-left pt-5">
              Información por Kit
            </h3>
            <div className="flex flex-col justify-between gap-10 lg:flex-row items-center">
              {kitsTemperatura.map((k) => (
                <div key={k.kitId}>
                  <h4 className="text-[#033e42] roboto text-xl md:text-2xl font-semibold py-3 text-left">
                    Kit {k.kitId}
                  </h4>
                  <Tabla
                    apiURL={`/api/ambiental/${k.kitId}`}
                    campo="temperatura"
                  />
                </div>
              ))}
            </div>
          </TabPanel>
          <TabPanel>
            {/* Humedad */}
            <h2 className="text-[#033e42] roboto text-xl md:text-3xl font-semibold py-2 md:text-left text-center">
              Humedad relativa (%)
            </h2>
            <h3 className="hidden md:block text-[#033e42] roboto text-xl md:text-2xl  py-2 text-center lg:text-left">
              Dashboard
            </h3>

            <div className="flex flex-col gap-5 lg:gap-10 lg:flex-row items-center py-5">
              <div className="flex justify-center ">
                <OptimizedImage
                  src="/img/humedad.png"
                  alt="Humedad"
                  className="w-[100px]"
                />
              </div>

              <div className="flex items-center justify-center">
                <div className="w-[200px] h-[120px]">
                  <Card
                    titulo="Promedio global"
                    valor={humedadPromedio}
                    color="bg-[#2c5e72]"
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
                    <div className="w-[200px] h-[120px]">
                      <Card
                        titulo={`Kit ${kit.kitId}`}
                        valor={kit.humedadActual}
                        color="bg-[#043248]"
                      />
                    </div>
                    <div className="hidden lg:block">
                      <LineChart
                        apiUrl={`/api/ambiental/${kit.kitId}`}
                        campo="humedad"
                        label="Tendencia de humedad (%)"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <h3 className="text-[#033e42] roboto text-xl md:text-2xl text-center md:text-left pt-5">
              Información por Kit
            </h3>

            <div className="flex flex-col justify-between gap-10 lg:flex-row items-center">
              {kitsHumedad.map((k) => (
                <div key={k.kitId}>
                  <h4 className="text-[#033e42] roboto text-xl md:text-2xl font-semibold py-3 text-left">
                    Kit {k.kitId}
                  </h4>
                  <Tabla apiURL={`/api/ambiental/${k.kitId}`} campo="humedad" />
                </div>
              ))}
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
}
