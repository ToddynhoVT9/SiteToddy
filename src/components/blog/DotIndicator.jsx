export default function DotIndicator({ total = 0, active = 0, onSelect }) {
  if (total <= 1) {
    return null;
  }

  return (
    <div className="flex items-center gap-2" aria-label="Indicador de paginas do trilho">
      {Array.from({ length: total }).map((_, index) => {
        const isActive = index === active;

        return (
          <button
            key={index}
            type="button"
            onClick={() => onSelect(index)}
            aria-label={`Ir para pagina ${index + 1} do trilho`}
            aria-current={isActive ? "page" : undefined}
            className={[
              "h-2.5 w-2.5 rounded-full transition",
              isActive ? "bg-white" : "bg-[#545454] hover:bg-[#7d7d7d]",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
            ].join(" ")}
          />
        );
      })}
    </div>
  );
}
