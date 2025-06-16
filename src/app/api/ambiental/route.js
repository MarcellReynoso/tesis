import { conn } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [results, fields] = await conn.query(
      "SELECT * FROM ambiental ORDER BY fecha DESC"
    );
    // console.log(fields);
    return NextResponse.json(results);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const form = await request.formData();
    const temperatura = form.get("temperatura");
    const humedad = form.get("humedad");

    const results = await conn.query(
      "INSERT INTO ambiental (temperatura, humedad) VALUES (?, ?)",
      [temperatura, humedad]
    );
    return NextResponse.json({
      results,
      message: "Datos ambientales insertados correctamente",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Error al insertar los datos",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
