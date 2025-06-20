import { conn } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    let { kitId } = await params;
    const [results, fields] = await conn.query(
      `
            SELECT * FROM ambiental
            WHERE kitId = ?
            ORDER BY fecha DESC
            `,
      [kitId]
    );

    if (results.length === 0) {
      return NextResponse.json(
        {
          message: "Kit id no encontrado",
        },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(results);
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
