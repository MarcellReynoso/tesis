import "./globals.css";

export const metadata = {
  title: "Tesis - Marcell Reynoso 2025",
  description: "Tesis de Marcell Reynoso para la carrera de Ingeniería en Sistemas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
