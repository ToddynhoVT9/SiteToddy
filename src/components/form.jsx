export default function Form({ placeholder, id, name, type = "text" }) {
  return (
    <div className="grid gap-2">
      <label className="text-sm text-[#beb8b8]" htmlFor={id}>
        {name}
      </label>

      <input
        id={id}
        name={id}
        type={type}
        autoComplete={id}
        required
        placeholder={placeholder}
        className="w-full rounded-xl bg-[#202020] border border-[#3d3d3d]
                   px-4 py-3 text-white placeholder-[#7d7d7d]
                   outline-none focus:border-[#545454]"
      />
    </div>
  );
}
