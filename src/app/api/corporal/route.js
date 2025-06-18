import { conn } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [results, fields] = await conn.query(
      "SELECT * FROM corporal ORDER BY fecha DESC"
    );
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

export async function POST(request) {
  try {
    const form = await request.formData();
    const temperaturaCorporal = form.get("temperaturaCorporal");
    const frecuenciaCardiaca = form.get("frecuenciaCardiaca");
    const kitId = form.get("kitId");

    const results = await conn.query(
      "INSERT INTO corporal (temperaturaCorporal, frecuenciaCardiaca, kitId ) VALUES (?, ?, ?)",
      [temperaturaCorporal, frecuenciaCardiaca, kitId]
    );

    return NextResponse.json({
      results,
      message: "Datos corporales insertados correctamente",
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
