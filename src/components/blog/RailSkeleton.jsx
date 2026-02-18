function SkeletonBlock({ className = "" }) {
  return (
    <div
      className={["animate-pulse rounded-xl bg-[#2b2b2b]", className].join(" ")}
      aria-hidden="true"
    />
  );
}

export default function RailSkeleton({ cards = 3 }) {
  return (
    <section className="space-y-3" aria-label="Carregando artigos">
      <SkeletonBlock className="h-4 w-48" />

      <div className="overflow-hidden">
        <div className="flex gap-3">
          {Array.from({ length: cards }).map((_, index) => (
            <div
              key={index}
              className="w-[85%] max-w-420px shrink-0 rounded-2xl border border-[#3d3d3d] bg-[#121212] p-4 sm:w-[70%] lg:w-[38%] xl:w-[32%]"
            >
              <SkeletonBlock className="aspect-video w-full" />
              <SkeletonBlock className="mt-3 h-3 w-24" />
              <SkeletonBlock className="mt-3 h-5 w-11/12" />
              <SkeletonBlock className="mt-2 h-4 w-full" />
              <SkeletonBlock className="mt-1 h-4 w-4/5" />
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <SkeletonBlock className="h-2.5 w-2.5 rounded-full" />
        <SkeletonBlock className="h-2.5 w-2.5 rounded-full" />
        <SkeletonBlock className="h-2.5 w-2.5 rounded-full" />
      </div>
    </section>
  );
}
