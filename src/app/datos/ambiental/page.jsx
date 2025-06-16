import TablaAmbiental from "@/app/components/TablaAmbiental";

async function loadData() {
  const response = await fetch(`${process.env.URL}/api/ambiental`, {
    cache: "no-store",
  });
  const data = await response.json();
  console.log(data);
  return data;
}

export default async function Page() {
  const datosAmbientales = await loadData();
  return (
    <main className="container mx-auto p-4">
      <h1 className="flex justify-center text-2xl font-bold my-4">
        Datos ambientales
      </h1>
      <TablaAmbiental />
    </main>
  );
}
