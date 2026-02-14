export default function Card({ title, description }) {
  return (
    <div className="bg-zinc-800 p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-semibold text-red-300">{title}</h3>
      <p className="mt-2 text-zinc-400">{description}</p>
    </div>
  );
}
