import { isClient, sleep } from "@/lib/utils";

export type User = {
  id: string;
  fullName: string;
  email: string;
  passwordHash: string;
  createdAt: string;
};

export type Session = {
  token: string;
  userId: string;
  email: string;
  fullName: string;
  expiresAt: number;
};

export type ResetToken = {
  email: string;
  token: string;
  expiresAt: number;
};

const USERS_KEY = "users";
const SESSION_KEY = "session";
const RESET_KEY = "resetTokens";

const oneDayMs = 24 * 60 * 60 * 1000;

const safeParse = <T>(value: string | null): T | null => {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch (error) {
    console.error("JSON parse error", error);
    return null;
  }
};

const getLocalStorage = () => {
  if (!isClient()) throw new Error("LocalStorage faqat brauzerda mavjud");
  return window.localStorage;
};

export async function hashPassword(password: string) {
  if (typeof crypto !== "undefined" && crypto.subtle) {
    const enc = new TextEncoder();
    const hashBuffer = await crypto.subtle.digest("SHA-256", enc.encode(password));
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  // Demo fallback only
  return btoa(password);
}

export function getUsers(): User[] {
  const storage = getLocalStorage();
  const raw = storage.getItem(USERS_KEY);
  return safeParse<User[]>(raw) ?? [];
}

export function saveUsers(users: User[]) {
  const storage = getLocalStorage();
  storage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getResetTokens(): ResetToken[] {
  const raw = getLocalStorage().getItem(RESET_KEY);
  return safeParse<ResetToken[]>(raw) ?? [];
}

export function saveResetTokens(tokens: ResetToken[]) {
  getLocalStorage().setItem(RESET_KEY, JSON.stringify(tokens));
}

export function getSession(): Session | null {
  const storage = getLocalStorage();
  const raw = storage.getItem(SESSION_KEY);
  const session = safeParse<Session>(raw);
  if (!session) return null;
  if (session.expiresAt < Date.now()) {
    storage.removeItem(SESSION_KEY);
    return null;
  }
  return session;
}

export function setSession(session: Session) {
  getLocalStorage().setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession() {
  getLocalStorage().removeItem(SESSION_KEY);
}

export async function registerUser(payload: {
  fullName: string;
  email: string;
  password: string;
}) {
  const users = getUsers();
  const exists = users.some(
    (u) => u.email.trim().toLowerCase() === payload.email.trim().toLowerCase()
  );
  if (exists) {
    return { ok: false, message: "Bu email allaqachon ro'yxatdan o'tgan" };
  }

  const passwordHash = await hashPassword(payload.password);
  const newUser: User = {
    id: crypto.randomUUID(),
    fullName: payload.fullName.trim(),
    email: payload.email.trim().toLowerCase(),
    passwordHash,
    createdAt: new Date().toISOString(),
  };

  saveUsers([...users, newUser]);
  await sleep(400);

  return { ok: true, message: "Muvaffaqiyatli ro'yxatdan o'tdingiz", user: newUser };
}

export async function loginUser(payload: {
  email: string;
  password: string;
  rememberMe?: boolean;
}) {
  const users = getUsers();
  const user = users.find(
    (u) => u.email.toLowerCase() === payload.email.trim().toLowerCase()
  );
  if (!user) {
    return { ok: false, message: "Email yoki parol noto'g'ri" };
  }

  const hash = await hashPassword(payload.password);
  if (hash !== user.passwordHash) {
    return { ok: false, message: "Email yoki parol noto'g'ri" };
  }

  const expiresAt = Date.now() + (payload.rememberMe ? 7 * oneDayMs : oneDayMs);
  const session: Session = {
    token: crypto.randomUUID(),
    userId: user.id,
    email: user.email,
    fullName: user.fullName,
    expiresAt,
  };
  setSession(session);
  await sleep(250);
  return { ok: true, session };
}

export function logoutUser() {
  clearSession();
}

export function createResetToken(email: string) {
  const users = getUsers();
  const user = users.find((u) => u.email === email.toLowerCase().trim());
  if (!user) return { ok: false, message: "Bu email topilmadi" };

  const tokens = getResetTokens().filter((t) => t.expiresAt > Date.now());
  const token: ResetToken = {
    email: user.email,
    token: crypto.randomUUID(),
    expiresAt: Date.now() + 60 * 60 * 1000, // 1 soat
  };
  tokens.push(token);
  saveResetTokens(tokens);
  return { ok: true, token };
}

export function verifyResetToken(token: string) {
  const tokens = getResetTokens().filter((t) => t.expiresAt > Date.now());
  const found = tokens.find((t) => t.token === token);
  if (!found) return { ok: false as const, message: "Token noto'g'ri yoki eskirgan" };

  const user = getUsers().find((u) => u.email === found.email);
  if (!user) return { ok: false as const, message: "Foydalanuvchi topilmadi" };

  return { ok: true as const, user, token: found };
}

export async function resetPassword(params: { token: string; newPassword: string }) {
  const verification = verifyResetToken(params.token);
  if (!verification.ok) return verification;

  const users = getUsers();
  const idx = users.findIndex((u) => u.email === verification.user.email);
  if (idx === -1) return { ok: false, message: "Foydalanuvchi topilmadi" };

  const hashed = await hashPassword(params.newPassword);
  users[idx].passwordHash = hashed;
  saveUsers(users);

  // remove used token
  const tokens = getResetTokens().filter((t) => t.token !== params.token);
  saveResetTokens(tokens);

  return { ok: true, message: "Parol yangilandi. Iltimos, qayta kiring." };
}
