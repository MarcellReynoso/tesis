import BarraNavegacion from "./components/BarraNavegacion";
import "./globals.css";

export const metadata = {
  title: "Impacto del bienestar térmico",
  description:
    "Tesis de Marcell Reynoso para la carrera de Ingeniería en Sistemas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <BarraNavegacion />
        <main className="container mx-auto py-8">{children}</main>
      </body>
    </html>
  );
}
