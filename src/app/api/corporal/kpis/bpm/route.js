import { conn } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [rows, fields] = await conn.query(`
            SELECT 
                (SELECT frecuenciaCardiaca FROM corporal ORDER BY fecha DESC LIMIT 1) AS frecuenciaCardiacaActual,
                ROUND(AVG(frecuenciaCardiaca), 2) AS frecuenciaCardiacaPromedio
            FROM corporal
              `);
    return NextResponse.json(rows[0]);
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
