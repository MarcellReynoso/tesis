"use client";
import BarChart from "../components/BarChart";
import OptimizedImage from "@/app/components/OptimizedImage";

const chartConfigs = [
  {
    title: "Temperatura corporal promedio de cada alumno",
    apiUrl: "/api/corporal/temperatura/promedioPorKit",
  },
  {
    title: "Frecuencia cardiaca promedio de cada alumno",
    apiUrl: "/api/corporal/bpm/promedioPorKit",
  },
  {
    title: "Temperatura promedio por kit",
    apiUrl: "/api/ambiental/temperatura/promedioPorKit",
  },
  {
    title: "Humedad promedio por cada kit",
    apiUrl: "/api/ambiental/humedad/promedioPorKit",
  },
];

export default function SensoresPage() {
  return (
    <div>
      <h1 className="text-[#033e42] roboto text-3xl md:text-4xl font-bold py-5 text-center lg:text-left">
        {"Sensores".toUpperCase()}
      </h1>

      <div className="flex flex-col lg:flex-row w-full">
        <div className="flex flex-col gap-4 w-full p-4">
          {chartConfigs.slice(0, 2).map(({ title, apiUrl }) => (
            <div key={apiUrl} className="flex flex-col items-start w-full">
              <h2 className="text-[#033e42] roboto text-xl md:text-3xl font-semibold py-5 text-left w-full">
                {title}
              </h2>
              <div className="flex justify-center lg:gap-10 gap-0">
                <OptimizedImage
                  src={"/img/persona.png"}
                  width={90}
                  className={`hidden lg:block`}
                />
                <BarChart apiUrl={apiUrl} width={400} color={`#2c5e72`} />
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 w-full p-4">
          {chartConfigs.slice(2).map(({ title, apiUrl }) => (
            <div key={apiUrl} className="flex flex-col items-start w-full">
              <h2 className="text-[#033e42] roboto text-xl md:text-3xl font-semibold py-5 text-left w-full">
                {title}
              </h2>
              <div className="flex justify-center lg:gap-10 gap-0">
                <OptimizedImage
                  src={"/img/temperatura.png"}
                  width={90}
                  className={`hidden lg:block`}
                />
                <BarChart apiUrl={apiUrl} width={400} color={`#336164`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
