import { useState } from "react";
import { useAuth } from "../lib/auth/authContext";
import UserAvatar from "../components/account/UserAvatar";
import ProfileField from "../components/account/ProfileField";

// ─── Validações ───────────────────────────────────────────────────────────────
function validateName(value) {
  if (!value || value.trim().length < 2)
    return "O nome deve ter ao menos 2 caracteres.";
  if (/\d/.test(value))
    return "O nome não pode conter números.";
  return null;
}

// ─── Formatação de data ───────────────────────────────────────────────────────
function formatDate(iso) {
  if (!iso) return "—";
  try {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

// ─── Componente principal ─────────────────────────────────────────────────────
export default function Profile() {
  const { user, logout, updateUser } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  async function handleNameSave(newName) {
    await updateUser({ name: newName });
    setEditMode(false);
  }

  function handleCancelEdit() {
    setEditMode(false);
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-8 grid gap-6">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header className="rounded-2xl bg-[#121212] border border-[#3d3d3d] p-8
                          flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <UserAvatar
          avatarUrl={user?.avatarUrl}
          name={user?.name}
          size="lg"
        />

        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-2xl font-bold text-white">{user?.name}</h1>
          <p className="mt-1 text-[#7d7d7d] text-sm">{user?.email}</p>
          <p className="mt-1 text-[#545454] text-xs">
            Conta criada em {formatDate(user?.createdAt)}
          </p>
        </div>

        <div className="flex gap-2">
          {editMode ? (
            <button
              onClick={handleCancelEdit}
              className="rounded-xl border border-[#3d3d3d] bg-transparent
                         text-[#beb8b8] hover:text-white hover:border-[#545454]
                         text-sm font-semibold px-4 py-2 transition"
            >
              Cancelar
            </button>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="rounded-xl bg-[#3d3d3d] hover:bg-[#545454]
                         text-white text-sm font-semibold px-4 py-2 transition"
            >
              Editar perfil
            </button>
          )}
        </div>
      </header>

      {/* ── Dados pessoais ─────────────────────────────────────────────────── */}
      <section className="rounded-2xl bg-[#121212] border border-[#3d3d3d] p-6 grid gap-5">
        <h2 className="text-xs font-semibold tracking-wider text-[#7d7d7d] uppercase">
          Dados pessoais
        </h2>

        <ProfileField
          label="Nome"
          value={user?.name ?? ""}
          editable={editMode}
          onSave={handleNameSave}
          validate={validateName}
        />

        {/* Email não editável por ora — requer confirmação de email */}
        <div className="grid gap-1">
          <span className="text-xs font-semibold tracking-wider text-[#7d7d7d] uppercase">
            Email
          </span>
          <p className="text-white text-sm py-2">{user?.email ?? "—"}</p>
          <p className="text-[#545454] text-xs">
            A alteração de email será disponibilizada em breve.
          </p>
        </div>

        <div className="grid gap-1">
          <span className="text-xs font-semibold tracking-wider text-[#7d7d7d] uppercase">
            Senha
          </span>
          <p className="text-[#545454] text-sm py-2">
            Redefinição de senha estará disponível em breve.
          </p>
        </div>
      </section>

      {/* ── Zona de risco ──────────────────────────────────────────────────── */}
      <section className="rounded-2xl bg-[#121212] border border-red-900/40 p-6 grid gap-4">
        <h2 className="text-xs font-semibold tracking-wider text-red-500/70 uppercase">
          Zona de risco
        </h2>

        {!showDeleteConfirm ? (
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-white text-sm font-semibold">Excluir conta</p>
              <p className="text-[#7d7d7d] text-xs mt-0.5">
                Esta ação é irreversível. Todos os seus dados serão removidos.
              </p>
            </div>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="rounded-xl border border-red-800 text-red-400
                         hover:bg-red-900/30 text-sm font-semibold
                         px-4 py-2 transition whitespace-nowrap"
            >
              Excluir conta
            </button>
          </div>
        ) : (
          <div className="grid gap-3">
            <p className="text-red-400 text-sm font-semibold">
              Tem certeza? Esta ação é irreversível.
            </p>
            <div className="flex gap-3">
              <button
                className="rounded-xl bg-red-800 hover:bg-red-700
                           text-white text-sm font-semibold px-4 py-2 transition
                           opacity-50 cursor-not-allowed"
                disabled
                title="Disponível quando houver integração com backend"
              >
                Sim, excluir minha conta
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="rounded-xl border border-[#3d3d3d] text-[#beb8b8]
                           hover:text-white text-sm font-semibold px-4 py-2 transition"
              >
                Cancelar
              </button>
            </div>
            <p className="text-[#545454] text-xs">
              A exclusão real de conta estará disponível com integração de backend.
            </p>
          </div>
        )}
      </section>

      {/* ── Botão sair ─────────────────────────────────────────────────────── */}
      <div className="flex justify-end">
        <button
          onClick={logout}
          className="rounded-xl border border-[#3d3d3d] bg-transparent
                     text-[#beb8b8] hover:text-white hover:border-[#545454]
                     text-sm font-semibold px-6 py-2.5 transition"
        >
          Sair da conta
        </button>
      </div>

    </main>
  );
}
