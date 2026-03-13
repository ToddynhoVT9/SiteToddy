import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  mockLogin,
  mockSignup,
  mockMe,
  mockUpdateUser,
} from "./authMock";

// ─── Constantes ───────────────────────────────────────────────────────────────
const TOKEN_KEY = "toddy_auth_token";

// ─── Context ──────────────────────────────────────────────────────────────────
const AuthContext = createContext(null);

// ─── Provider ─────────────────────────────────────────────────────────────────
export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [isLoading, setIsLoading] = useState(true); // validação inicial

  const isAuthenticated = !!token && !!user;

  // Verifica token salvo no localStorage ao montar o provider
  useEffect(() => {
    const savedToken = localStorage.getItem(TOKEN_KEY);
    if (!savedToken) {
      setIsLoading(false);
      return;
    }
    mockMe(savedToken)
      .then(({ user }) => {
        setToken(savedToken);
        setUser(user);
      })
      .catch(() => {
        // Token inválido ou expirado — logout silencioso
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        setUser(null);
      })
      .finally(() => setIsLoading(false));
  }, []);

  // ── Ações ───────────────────────────────────────────────────────────────────

  /**
   * Autentica o usuário com email e senha.
   * Em caso de sucesso, persiste o token e redireciona para /profile.
   * Lança erro em caso de falha (para a página tratar).
   */
  async function login(email, password) {
    const { user: loggedUser, token: newToken } = await mockLogin(
      email,
      password
    );
    localStorage.setItem(TOKEN_KEY, newToken);
    setToken(newToken);
    setUser(loggedUser);
    navigate("/profile");
  }

  /**
   * Cadastra um novo usuário e faz login automático em caso de sucesso.
   * Lança erro em caso de falha.
   */
  async function signup(name, email, password) {
    const { user: newUser, token: newToken } = await mockSignup(
      name,
      email,
      password
    );
    localStorage.setItem(TOKEN_KEY, newToken);
    setToken(newToken);
    setUser(newUser);
    navigate("/profile");
  }

  /**
   * Encerra a sessão do usuário, limpa o localStorage e redireciona para /.
   */
  function logout() {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
    navigate("/");
  }

  /**
   * Atualiza os dados do usuário autenticado.
   * Lança erro em caso de falha.
   */
  async function updateUser(data) {
    if (!user) throw new Error("Nenhum usuário autenticado.");
    const { user: updated } = await mockUpdateUser(user.id, data);
    setUser(updated);
    return updated;
  }

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated, isLoading, login, logout, signup, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook de consumo ──────────────────────────────────────────────────────────
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth deve ser usado dentro de <AuthProvider>");
  }
  return ctx;
}
