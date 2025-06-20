import { conn } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [temperaturaPromedio] = await conn.query(`
      SELECT ROUND(AVG(temperatura), 2) AS temperaturaPromedio
      FROM ambiental
    `);

    const [queryTemperaturaActualPorKit] = await conn.query(`
      SELECT a.kitId, a.temperatura
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

    return NextResponse.json({
      temperaturaPromedio: parseFloat(
        temperaturaPromedio[0].temperaturaPromedio
      ),
      temperaturaActualPorKit,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
