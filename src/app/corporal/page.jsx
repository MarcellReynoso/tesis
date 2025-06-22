import React from "react";
import OptimizedImage from "../components/OptimizedImage";
import Card from "../components/Card";
import Tabla from "../components/Tabla";

function page() {
  return (
    <div>
      <h1 className="text-[#033e42] roboto h1 text-3xl md:text-4xl font-bold py-5 text-center lg:text-left">
        {"Variables corporales".toUpperCase()}
      </h1>

      <h2 className="text-[#033e42] roboto text-xl md:text-3xl font-semibold py-2 md:text-left text-center">
        Temperatura corporal (ºC)
      </h2>

      <h3 className="hidden md:block text-[#033e42] roboto text-xl md:text-2xl py-2 text-center md:text-left text-center">
        Dashboard
      </h3>

      <div className="flex flex-col lg:flex-row justify-between gap-5 mx-auto">
        {/* Alumno 1 */}
        <div className="flex flex-col justify-center items-center w-full gap-5">
          <h4>
            Alumno Nº1
          </h4>
          <div className="flex mb-5">
            <OptimizedImage
              src={"/img/persona.png"}
              alt={"Imagen de persona"}
              width={100}
            />
          </div>
          <div className="lg:w-full w-2/3">
            <Card color={`bg-[#2c5e72]`} valor={85} titulo={`Temperatura actual (ºC)`} />
          </div>
          <div className="flex">
            <Tabla
            apiURL={`/api/corporal/4`}
            campo={"temperaturaCorporal"}
            />
          </div>
        </div>

        {/* Alumno 2 */}
        <div className="flex flex-col justify-center items-center w-full gap-5">
          <h4>
            Alumno Nº2
          </h4>
          <div className="flex mb-5">
            <OptimizedImage
              src={"/img/persona.png"}
              alt={"Imagen de persona"}
              width={100}
            />
          </div>
          <div className="lg:w-full w-2/3">
            <Card color={`bg-[#2c5e72]`} valor={85} titulo={`Temperatura actual (ºC)`} />
          </div>
          <div className="flex">
            <Tabla
            apiURL={`/api/corporal/5`}
            campo={"temperaturaCorporal"}
            />
          </div>
        </div>

        {/* Alumno 3 */}
        <div className="flex flex-col justify-center items-center  w-full gap-5">
          <h4>
            Alumno Nº3
          </h4>
          <div className="flex mb-5">
            <OptimizedImage
              src={"/img/persona.png"}
              alt={"Imagen de persona"}
              width={100}
            />
          </div>
          <div className="lg:w-full w-2/3">
            <Card color={`bg-[#2c5e72]`} valor={85} titulo={`Temperatura actual (ºC)`} />
          </div>
          <div className="flex">
            <Tabla
            apiURL={`/api/corporal/6`}
            campo={"temperaturaCorporal"}
            />
          </div>
        </div>

        {/* Alumno 4 */}
        <div className="flex flex-col justify-center items-center w-full gap-5">
          <h4>
            Alumno Nº4
          </h4>
          <div className="flex mb-5">
            <OptimizedImage
              src={"/img/persona.png"}
              alt={"Imagen de persona"}
              width={100}
            />
          </div>
          <div className="lg:w-full w-2/3">
            <Card color={`bg-[#2c5e72]`} valor={85} titulo={`Temperatura actual (ºC)`} />
          </div>
          <div className="flex">
            <Tabla
            apiURL={`/api/corporal/7`}
            campo={"temperaturaCorporal"}
            />
          </div>
        </div>

        {/* Alumno 5 */}
        <div className="flex flex-col justify-center items-center w-full gap-5">
          <h4 className="">
            Alumno Nº5
          </h4>
          <div className="flex mb-5">
            <OptimizedImage
              src={"/img/persona.png"}
              alt={"Imagen de persona"}
              width={100}
            />
          </div>
          <div className="lg:w-full w-2/3">
            <Card color={`bg-[#2c5e72]`} valor={85} titulo={`Temperatura actual (ºC)`} />
          </div>
          <div className="flex">
            <Tabla
            apiURL={`/api/corporal/8`}
            campo={"temperaturaCorporal"}
            />
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default page;
