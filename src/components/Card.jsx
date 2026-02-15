export default function Card({ title, description }) {
  return (
    <div className="bg-[#121212] p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-semibold text-red-300">{title}</h3>
      <p className="mt-2 text-[#7d7d7d]">{description}</p>
    </div>
  );
}
//"   [#121212]   [#202020]   [#545454]   [#3d3d3d]   [#7d7d7d]   [#beb8b8]   "
