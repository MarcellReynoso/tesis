import React from "react";
import LineChart from "../components/LineChart";
import KPI from "../components/KPI";

export default function page() {
  return (
    <main className="container mx-auto py-8">
      <h1 className="h1 text-4xl font-bold py-2">Data en tiempo real</h1>
      {/* Temperatura ambiental */}
      <div>
        <h2 className="text-2xl font-semibold">Temperatura ambiental (ºC)</h2>
        <div className="flex">
          <div className="flex justify-center items-center">
            <img src="/temperatura.png" alt="Temperatura" className="h-50" />
          </div>
          <KPI
            apiUrl={"/api/ambiental/kpis/temperatura"}
            campo={"temperatura"}
            label={"Temperatura"}
          />
          <LineChart
            apiUrl="/api/ambiental"
            campo="temperatura"
            label="Temperatura (ºC)"
          />
        </div>
      </div>

      {/* Humedad relativa */}
      <div>
        <h2 className="text-2xl font-semibold">Humedad relativa (%)</h2>
        <div className="flex">
          <div className="flex justify-center items-center">
            <img src="/humedad.png" alt="Temperatura" className="h-50" />
          </div>
          <KPI
            apiUrl={"/api/ambiental/kpis/humedad"}
            campo={"humedad"}
            label={"Humedad"}
          />
          <LineChart
            apiUrl="/api/ambiental"
            campo={"humedad"}
            label={"Humedad (%)"}
          />
        </div>
      </div>

      {/* Temperatura corporal */}
      <div>
        <h2 className="text-2xl font-semibold">Temperatura corporal (ºC)</h2>
        <div className="flex">
          <div className="flex justify-center items-center">
            <img
              src="/temperaturaCorporal.png"
              alt="Temperatura corporal"
              className="h-50"
            />
          </div>
          <KPI
            apiUrl={"/api/corporal/kpis/temperatura"}
            campo={"temperaturaCorporal"}
            label={"Temperatura corporal"}
          />
          <LineChart
            apiUrl="/api/corporal"
            campo={"temperaturaCorporal"}
            label={"Temperatura corporal (ºC)"}
          />
        </div>
      </div>

      {/* Frecuencia cardiaca*/}
      <div>
        <h2 className="text-2xl font-semibold">Frecuencia cardiaca (bpm)</h2>
        <div className="flex">
          <div className="flex justify-center items-center">
            <img
              src="/bpm.png"
              alt="Temperatura corporal"
              className="h-32"
            />
          </div>
          <KPI
            apiUrl={"/api/corporal/kpis/bpm"}
            campo={"frecuenciaCardiaca"}
            label={"Frecuencia cardiaca"}
          />
          <LineChart
            apiUrl="/api/corporal"
            campo={"frecuenciaCardiaca"}
            label={"Latidos por minuto (bpm)"}
          />
        </div>
      </div>
    </main>
  );
}
