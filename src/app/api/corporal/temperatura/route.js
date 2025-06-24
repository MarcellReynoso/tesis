import { NextResponse } from "next/server";
import { conn } from "@/lib/db";

export async function GET() {
  try {
    let [results, fields] = await conn.query(`
            SELECT DISTINCT c.kitId, c.temperaturaCorporal
            FROM corporal c
            INNER JOIN (
                SELECT kitId, MAX(fecha) AS max_fecha
                FROM corporal
                GROUP BY kitId
            ) b ON c.kitId = b.kitId AND c.fecha = b.max_fecha
            ORDER BY c.kitId
            `);

    let temperaturaCorporalActualPorKit = results.map((e) => ({
      kitId: e.kitId,
      temperaturaCorporal: parseFloat(e.temperaturaCorporal),
    }));

    console.log(temperaturaCorporalActualPorKit);
    

    let suma = temperaturaCorporalActualPorKit.reduce(
      (acum, kit) => acum + kit.temperaturaCorporal,
      0
    );

    let promedio = parseFloat(
      (suma / temperaturaCorporalActualPorKit.length).toFixed(2)
    );

    return NextResponse.json({
      promedio,
      temperaturaCorporalActualPorKit,
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
