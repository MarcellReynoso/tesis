export default function Card({ titulo, valor, color, subtitulo }) {
  return (
    <div className={`${color} text-white rounded-xl p-2 text-center h-full flex flex-col justify-center`}>
      <h4 className="text-lg">{titulo}</h4>
      <p className="text-3xl lg:text-4xl">{valor ?? "0.00"}</p>
      <h5>{subtitulo}</h5>
    </div>
  );
}
