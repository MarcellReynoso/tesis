import {conn} from '@/lib/db'
import {NextResponse} from 'next/server'

export async function GET() {
    try {
        const [queryHumedadActualPorKit] = await conn.query(`
            SELECT DISTINCT a.kitId, a.humedad
            FROM ambiental a
            INNER JOIN (
                SELECT kitId, MAX(fecha) AS max_fecha
                FROM ambiental
                GROUP BY kitId
            ) b ON a.kitId = b.kitId AND a.fecha = b.max_fecha
            ORDER BY a.kitId
            `);

            const humedadActualPorKit = queryHumedadActualPorKit.map((e) => ({
                kitId: e.kitId,
                humedadActual: parseFloat(e.humedad),
            }));

            const sumaHumedad = humedadActualPorKit.reduce(
                (acum, kit) => acum + kit.humedadActual,
                0 
            );

            const humedadPromedio = parseFloat(
                (sumaHumedad / humedadActualPorKit.length).toFixed(2)
            );

            return NextResponse.json({
                humedadPromedio,
                humedadActualPorKit,
            })

    } catch (error) {
        return NextResponse.json({
            message: error.message
        }, {
            status: 500,
        })
    }
}