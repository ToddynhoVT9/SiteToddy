import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./authContext";

/**
 * ProtectedRoute
 * Redireciona para /login se o usuário não estiver autenticado.
 * Aguarda o carregamento inicial do AuthProvider antes de decidir.
 */
export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    // Aguarda validação do token para evitar flash de redirect
    return null;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

/**
 * PublicOnlyRoute
 * Redireciona para /profile se o usuário já estiver autenticado.
 * Evita que usuários logados acessem /login ou /signup.
 */
export function PublicOnlyRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  return isAuthenticated ? <Navigate to="/profile" replace /> : <Outlet />;
}
