"use client";
import React, { useEffect, useState } from "react";
import OptimizedImage from "../components/OptimizedImage";
import Card from "../components/Card";
import Tabla from "../components/Tabla";
import LineChart from "../components/LineChart";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

export default function Page() {
  const alumnos = [
    { id: 1, kitId: 4 },
    { id: 2, kitId: 5 },
    { id: 3, kitId: 6 },
    { id: 4, kitId: 7 },
    { id: 5, kitId: 8 },
  ];

  const [temperaturas, setTemperaturas] = useState([]);
  const [frecuencias, setFrecuencias] = useState([]);

  useEffect(() => {
    async function fetchDatos() {
      const [tempRes, bpmRes] = await Promise.all([
        fetch("/api/corporal/temperatura"),
        fetch("/api/corporal/bpm"),
      ]);
      const tempData = await tempRes.json();
      const bpmData = await bpmRes.json();

      setTemperaturas(tempData.temperaturaCorporalActualPorKit);
      setFrecuencias(bpmData.frecuenciaCardiacaActualPorKit);
    }

    fetchDatos();
    const interval = setInterval(fetchDatos, 10000);
    return () => clearInterval(interval);
  }, []);

  const obtenerValor = (kitId, data, campo) => {
    const encontrado = data.find((d) => d.kitId === kitId);
    return encontrado ? encontrado[campo] : "-";
  };

  return (
    <div>
      <h1 className="text-[#033e42] roboto h1 text-3xl md:text-4xl font-bold py-5 text-center lg:text-left">
        VARIABLES CORPORALES
      </h1>
      <TabGroup>
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
              Latidos
            </Tab>
          </TabList>
        </div>

        <TabPanels>
          <TabPanel>
            <h2 className="text-[#033e42] roboto text-xl md:text-3xl font-semibold py-2 md:text-left text-center">
              Temperatura corporal (ºC)
            </h2>
            <div className="flex flex-col lg:flex-row justify-between gap-5 mx-auto">
              {alumnos.map((alumno) => (
                <div
                  key={alumno.id}
                  className="flex flex-col justify-center items-center w-full gap-5"
                >
                  <h4 className="roboto font-semibold text-[#336164]">
                    Alumno Nº{alumno.id}
                  </h4>
                  <div className="flex mb-5">
                    <OptimizedImage
                      src="/img/persona.png"
                      alt="Imagen de persona"
                      width={100}
                    />
                  </div>
                  <div className="lg:w-full w-2/3">
                    <Card
                      color="bg-[#2c5e72]"
                      valor={obtenerValor(
                        alumno.kitId,
                        temperaturas,
                        "temperaturaCorporal"
                      )}
                      titulo={`Kit ${alumno.kitId}`}
                      subtitulo="Temperatura actual (ºC)"
                    />
                  </div>
                  <LineChart
                    apiUrl={`/api/corporal/${alumno.id + 3}`}
                    campo="temperaturaCorporal"
                    label="Temperatura"
                    cantidadData={5}
                    width={290}
                  />
                  <div className="flex">
                    <Tabla
                      apiURL={`/api/corporal/${alumno.kitId}`}
                      campo="temperaturaCorporal"
                      cantidadData={5}
                    />
                  </div>
                </div>
              ))}
            </div>
          </TabPanel>
          <TabPanel>
            <h2 className="text-[#033e42] roboto text-xl md:text-3xl font-semibold py-2 md:text-left text-center">
              Frecuencia cardíaca (bpm)
            </h2>

            <div className="flex flex-col lg:flex-row justify-between gap-5 mx-auto">
              {alumnos.map((alumno) => (
                <div
                  key={alumno.id}
                  className="flex flex-col justify-center items-center w-full gap-5"
                >
                  <h4 className="roboto font-semibold text-[#336164]">
                    Alumno Nº{alumno.id}
                  </h4>
                  <div className="flex mb-5">
                    <OptimizedImage
                      src="/img/persona.png"
                      alt="Imagen de persona"
                      width={100}
                    />
                  </div>
                  <div className="lg:w-full w-2/3">
                    <Card
                      color="bg-[#51722c]"
                      valor={obtenerValor(
                        alumno.kitId,
                        frecuencias,
                        "frecuenciaCardiaca"
                      )}
                      titulo={`Kit ${alumno.kitId}`}
                      subtitulo={`Frecuencia cardiaca actual`}
                    />
                  </div>
                  <LineChart
                    apiUrl={`/api/corporal/${alumno.id + 3}`}
                    campo="frecuenciaCardiaca"
                    label="Latidos (bpm)"
                    cantidadData={5}
                    width={290}
                  />
                  <div className="flex">
                    <Tabla
                      apiURL={`/api/corporal/${alumno.kitId}`}
                      campo="frecuenciaCardiaca"
                      cantidadData={5}
                    />
                  </div>
                </div>
              ))}
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
}
