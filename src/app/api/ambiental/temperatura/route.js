import { conn } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Obtener la temperatura actual por cada kit
    const [queryTemperaturaActualPorKit] = await conn.query(`
      SELECT DISTINCT a.kitId, a.temperatura
      FROM ambiental a
      INNER JOIN (
          SELECT kitId, MAX(fecha) AS max_fecha
          FROM ambiental
          GROUP BY kitId
      ) b ON a.kitId = b.kitId AND a.fecha = b.max_fecha
      ORDER BY a.kitId
    `);

    const temperaturaActualPorKit = queryTemperaturaActualPorKit.map(
      (item) => ({
        kitId: item.kitId,
        temperaturaActual: parseFloat(item.temperatura),
      })
    );

    const sumaTemperaturas = temperaturaActualPorKit.reduce(
      (acum, kit) => acum + kit.temperaturaActual,
      0
    );

    const temperaturaPromedio = parseFloat(
      (sumaTemperaturas / temperaturaActualPorKit.length).toFixed(2)
    );

    return NextResponse.json({
      temperaturaPromedio,
      temperaturaActualPorKit,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
