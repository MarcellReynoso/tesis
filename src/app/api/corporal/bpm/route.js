import { NextResponse } from "next/server";
import { conn } from "@/lib/db";

export async function GET() {
  try {
    let [results, fields] = await conn.query(`
            SELECT DISTINCT c.kitId, c.frecuenciaCardiaca
            FROM corporal c
            INNER JOIN (
                SELECT kitId, MAX(fecha) AS max_fecha
                FROM corporal
                GROUP BY kitId
            ) b ON c.kitId = b.kitId AND c.fecha = b.max_fecha
            ORDER BY c.kitId
            `);

    let frecuenciaCardiacaActualPorKit = results.map((e) => ({
      kitId: e.kitId,
      frecuenciaCardiaca: parseFloat(e.frecuenciaCardiaca),
    }));

    let suma = frecuenciaCardiacaActualPorKit.reduce(
      (acum, kit) => acum + kit.frecuenciaCardiaca,
      0
    );

    let promedio = parseFloat((suma / frecuenciaCardiacaActualPorKit.length).toFixed(2));

    return NextResponse.json({
      promedio,
      frecuenciaCardiacaActualPorKit,
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
