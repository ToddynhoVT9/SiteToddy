import { useParams } from "react-router-dom";

export default function PortfolioCategory() {
  const { categoria } = useParams();

  return (
    <section className="text-white">
      <h1 className="text-3xl font-semibold">Categoria: {categoria}</h1>
      <p className="mt-4 text-[#beb8b8]">
        Aqui sera a pagina vertical desta categoria com imagens em tamanho real.
      </p>
    </section>
  );
}
