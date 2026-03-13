/**
 * authMock.js — Mock local de autenticação
 *
 * Simula as chamadas de API enquanto não há backend real.
 * Quando a API estiver disponível, remover este arquivo e
 * substituir as chamadas em authContext.jsx pelos endpoints reais.
 *
 * Usuário pré-cadastrado para testes:
 *   email: teste@toddy.com
 *   senha: senha123
 */

const MOCK_TOKEN = "mock-token-toddy-2026";

// banco de dados em memória — reiniciado a cada reload
const mockDB = {
    users: [
        {
            id: "usr_1",
            name: "Toddynho",
            email: "teste@toddy.com",
            avatarUrl: null,
            createdAt: "2026-01-01T00:00:00.000Z",
        },
    ],
    // mapeia token -> userId
    sessions: {},
};

function delay(ms = 600) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function findUser(email) {
    return mockDB.users.find((u) => u.email === email) ?? null;
}

/**
 * POST /api/auth/signup
 * @returns {{ user, token }}
 */
export async function mockSignup(name, email, _password) {
    await delay();
    if (findUser(email)) {
        throw new Error("Este email já está em uso.");
    }
    const newUser = {
        id: `usr_${Date.now()}`,
        name,
        email,
        avatarUrl: null,
        createdAt: new Date().toISOString(),
    };
    mockDB.users.push(newUser);
    const token = `${MOCK_TOKEN}-${newUser.id}`;
    mockDB.sessions[token] = newUser.id;
    return { user: { ...newUser }, token };
}

/**
 * POST /api/auth/login
 * @returns {{ user, token }}
 */
export async function mockLogin(email, _password) {
    await delay();
    const user = findUser(email);
    if (!user) {
        throw new Error("Email ou senha incorretos.");
    }
    const token = `${MOCK_TOKEN}-${user.id}`;
    mockDB.sessions[token] = user.id;
    return { user: { ...user }, token };
}

/**
 * GET /api/auth/me
 * @returns {{ user }}
 */
export async function mockMe(token) {
    await delay(200);
    const userId = mockDB.sessions[token];
    if (!userId) {
        throw new Error("Token inválido ou expirado.");
    }
    const user = mockDB.users.find((u) => u.id === userId);
    if (!user) throw new Error("Usuário não encontrado.");
    return { user: { ...user } };
}

/**
 * PATCH /api/users/:id
 * @returns {{ user }}
 */
export async function mockUpdateUser(userId, data) {
    await delay();
    const idx = mockDB.users.findIndex((u) => u.id === userId);
    if (idx === -1) throw new Error("Usuário não encontrado.");
    mockDB.users[idx] = { ...mockDB.users[idx], ...data };
    return { user: { ...mockDB.users[idx] } };
}
