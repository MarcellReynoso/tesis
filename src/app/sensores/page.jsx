"use client";
import BarChart from "../components/BarChart";
import Tabla from "../components/Tabla";

const chartConfigs = [
  {
    title: "Temperatura corporal promedio por kit",
    apiUrl: "/api/corporal/temperatura/promedioPorKit",
  },
  {
    title: "Frecuencia cardiaca promedio por kit",
    apiUrl: "/api/corporal/bpm/promedioPorKit",
  },
  {
    title: "Temperatura promedio por kit",
    apiUrl: "/api/ambiental/temperatura/promedioPorKit",
  },
  {
    title: "Humedad promedio por kit",
    apiUrl: "/api/ambiental/humedad/promedioPorKit",
  },
];

export default function SensoresPage() {
  return (
    <div>
      <h1 className="text-[#033e42] roboto text-3xl md:text-4xl font-bold py-5 text-center lg:text-left">
        {"Sensores".toUpperCase()}
      </h1>
      <div className="flex flex-col gap-6 px-4">
        <h2 className="text-[#033e42] roboto text-2xl md:text-3xl font-bold pt-5 text-left w-full">
          {"Datos por Kit".toUpperCase()}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3].map((kitId) => (
            <div key={kitId}>
              <h3 className="text-[#033e42] roboto text-lg md:text-xl font-semibold text-center mb-2">
                Kit {kitId}
              </h3>
              <Tabla
                apiURL={`/api/ambiental/${kitId}`}
                campo={["temperatura", "humedad"]}
                width={280}
                cantidadData={10}
              />
            </div>
          ))}
          <div key={4}>
            <h3 className="text-[#033e42] roboto text-lg md:text-xl font-semibold text-center mb-2">
              Kit 4
            </h3>
            <Tabla
              apiURL={`/api/corporal/4`}
              campo={["temperaturaCorporal", "frecuenciaCardiaca"]}
              width={280}
              cantidadData={10}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[5, 6, 7, 8].map((kitId) => (
            <div key={kitId}>
              <h3 className="text-[#033e42] roboto text-lg md:text-xl font-semibold text-center mb-2">
                Kit {kitId}
              </h3>
              <Tabla
                apiURL={`/api/corporal/${kitId}`}
                campo={["temperaturaCorporal", "frecuenciaCardiaca"]}
                width={280}
                cantidadData={10}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="hidden lg:flex lg:flex-col lg:flex-row justify-center">
        <div className="flex flex-col gap-4 w-full p-4">
          {chartConfigs.slice(0, 2).map(({ title, apiUrl }) => (
            <div key={apiUrl} className="flex flex-col items-start w-full">
              <h2 className="text-[#033e42] roboto text-xl md:text-3xl font-semibold py-5 text-left w-full">
                {title}
              </h2>
              <div className="flex justify-center lg:gap-10 gap-0">
                <BarChart apiUrl={apiUrl} width={700} color={`#2c5e72`} />
              </div>
            </div>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-col gap-4 w-full p-4">
          {chartConfigs.slice(2).map(({ title, apiUrl }) => (
            <div key={apiUrl} className="flex flex-col items-start w-full">
              <h2 className="text-[#033e42] roboto text-xl md:text-3xl font-semibold py-5 text-left w-full">
                {title}
              </h2>
              <div className="flex justify-center lg:gap-10 gap-0">
                <BarChart apiUrl={apiUrl} width={700} color={`#336164`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
