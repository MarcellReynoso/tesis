import { conn } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [results, fields] = await conn.query(`
          SELECT kitId, ROUND(AVG(temperaturaCorporal), 2) AS promedio
          FROM corporal
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
