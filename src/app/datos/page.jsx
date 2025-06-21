import React from "react";
import OptimizedImage from "../components/OptimizedImage";
import LineChart from "../components/LineChart";
import KPI from "../components/KPI";
import TablaTemperatura from "../components/TablaTemperatura";
import TablaHumedad from "../components/TablaHumedad";
import TablaTemperaturaCorporal from "../components/TablaTemperaturaCorporal";
import TablaFrecuenciaCardiaca from "../components/TablaFrecuenciaCardiaca";

export default function page() {
  return (
    <div>
      <h1 className="text-[#033e42] roboto h1 text-3xl md:text-4xl font-bold py-5 text-center lg:text-left">
        {("Dashboard principal").toUpperCase()}
      </h1>
      {[
        {
          titulo: "TEMPERATURA AMBIENTAL (ºC)",
          imagen: "/img/temperatura.png",
          apiKPI: "/api/ambiental/kpis/temperatura",
          campoKPI: "temperatura",
          apiChart: "/api/ambiental",
          campoChart: "temperatura",
          labelChart: "Temperatura (ºC)",
          Tabla: TablaTemperatura,
          apiURL: "/api/ambiental",
        },
        {
          titulo: "HUMEDAD RELATIVA (%)",
          imagen: "/img/humedad.png",
          apiKPI: "/api/ambiental/kpis/humedad",
          campoKPI: "humedad",
          apiChart: "/api/ambiental",
          campoChart: "humedad",
          labelChart: "Humedad (%)",
          Tabla: TablaHumedad,
        },
        {
          titulo: "TEMPERATURA CORPORAL (ºC)",
          imagen: "/img/temperaturaCorporal.png",
          apiKPI: "/api/corporal/kpis/temperatura",
          campoKPI: "temperaturaCorporal",
          apiChart: "/api/corporal",
          campoChart: "temperaturaCorporal",
          labelChart: "Temperatura corporal (ºC)",
          Tabla: TablaTemperaturaCorporal,
        },
        {
          titulo: "FRECUENCIA CARDIACA (bpm)",
          imagen: "/img/bpm.png",
          apiKPI: "/api/corporal/kpis/bpm",
          campoKPI: "frecuenciaCardiaca",
          apiChart: "/api/corporal",
          campoChart: "frecuenciaCardiaca",
          labelChart: "Latidos por minuto (bpm)",
          Tabla: TablaFrecuenciaCardiaca,
        },
      ].map((seccion, index) => (
        <div key={index} className="flex flex-col gap-6 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-1/4 flex flex-col items-center lg:items-start gap-4¡ mx-auto">
              <h2 className="roboto text-xl font-semibold lg:text-left mb-4">
                {seccion.titulo}
              </h2>
              <div className="flex items-center">
                <div className="w-[150px] sm:w-[150px] flex justify-center">
                  <OptimizedImage
                    src={seccion.imagen}
                    alt={seccion.titulo}
                    width={150}
                    height={150}
                    className="w-full"
                  />
                </div>
                <KPI
                  apiUrl={seccion.apiKPI}
                  campo={seccion.campoKPI}
                />
              </div>
            </div>

            <div className="w-full lg:w-2/3 flex flex-col lg:flex-row gap-6">
              <div className="w-full lg:w-2/3 grid content-between">
                <h4 className="font-semibold text-xl roboto lg:text-left">
                  TENDENCIA
                </h4>
                <LineChart
                  apiUrl={seccion.apiChart}
                  campo={seccion.campoChart}
                  label={seccion.labelChart}
                />
              </div>
              <div className="w-full lg:w-1/3 grid content-between">
                <h4 className="font-semibold text-xl roboto lg:text-left">
                  ÚLTIMOS DATOS
                </h4>
                {seccion.Tabla === TablaTemperatura ? (
                  <seccion.Tabla apiURL={seccion.apiURL} />
                ) : (
                  <seccion.Tabla />
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
