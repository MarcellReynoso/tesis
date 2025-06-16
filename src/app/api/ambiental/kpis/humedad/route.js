import { conn } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [rows, fields] = await conn.query(`
        SELECT 
            (SELECT humedad FROM ambiental ORDER BY fecha DESC LIMIT 1) AS humedadActual,
            ROUND(AVG(humedad), 2) AS humedadPromedio
        FROM ambiental`);
    return NextResponse.json(rows[0]);
  } catch (error) {
    return NextResponse.json({
        message: error.message,
    }, {
        status: 500,
    })
  }
}
