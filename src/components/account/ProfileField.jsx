import { useState, useEffect } from "react";

/**
 * ProfileField
 * Campo de leitura/edição de dado do perfil do usuário.
 *
 * Props:
 *   label      string           — rótulo do campo
 *   value      string           — valor atual
 *   editable   boolean          — se o campo pode ser editado
 *   type       string           — tipo do input (default: "text")
 *   onSave     (newValue) => Promise<void>
 *   validate   (value) => string | null  — retorna mensagem de erro ou null
 */
export default function ProfileField({
  label,
  value,
  editable = false,
  type = "text",
  onSave,
  validate,
}) {
  const [draft, setDraft] = useState(value);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  // Sincroniza draft quando value muda externamente (ex.: cancelar edição)
  // Controlado pelo pai: `editable` virar false reseta o draft
  useEffect(() => {
    setDraft(value);
    setError(null);
  }, [value, editable]);

  async function handleSave() {
    const err = validate ? validate(draft) : null;
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    setSaving(true);
    try {
      await onSave(draft);
    } catch (e) {
      setError(e.message ?? "Erro ao salvar. Tente novamente.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="grid gap-1">
      <span className="text-xs font-semibold tracking-wider text-[#7d7d7d] uppercase">
        {label}
      </span>

      {editable ? (
        <div className="flex gap-2 items-center">
          <input
            type={type}
            value={draft}
            onChange={(e) => {
              setDraft(e.target.value);
              setError(null);
            }}
            disabled={saving}
            className="flex-1 rounded-xl bg-[#202020] border border-[#3d3d3d]
                       px-4 py-2 text-white text-sm placeholder-[#7d7d7d]
                       outline-none focus:border-[#545454] disabled:opacity-50"
          />
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-xl bg-[#3d3d3d] hover:bg-[#545454] text-white
                       text-sm font-semibold px-4 py-2 transition disabled:opacity-50"
          >
            {saving ? "Salvando…" : "Salvar"}
          </button>
        </div>
      ) : (
        <p className="text-white text-sm py-2">{value || "—"}</p>
      )}

      {error && (
        <p className="text-red-400 text-xs mt-0.5">{error}</p>
      )}
    </div>
  );
}
