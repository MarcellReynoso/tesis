import { conn } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [results, fields] = await conn.query(`
    SELECT kitId, ROUND(AVG(temperatura), 2) AS promedio
    FROM ambiental 
    WHERE temperatura > 0
    GROUP BY kitId
    ORDER BY kitId
        `);
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
