import { conn } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [rows, fields] = await conn.query(`
        SELECT 
            (SELECT temperatura FROM ambiental ORDER BY fecha DESC LIMIT 1) AS temperaturaActual,
            ROUND(AVG(temperatura), 2) AS temperaturaPromedio
        FROM ambiental`);
    return NextResponse.json(rows[0]);
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}
