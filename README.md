# UMD Auth — Next.js App Router Demo

Premium ko‘rinishdagi autentifikatsiya tizimi (Login, Register, Forgot/Reset Password, Verify Email, Dashboard, Settings) — backend’siz, to‘liq **localStorage** bilan ishlaydi. UI Uzbek tilida, TailwindCSS + Framer Motion animatsiyalari bilan.

## Texnologiyalar
- Next.js 16 (App Router) + TypeScript
- TailwindCSS v4, glassmorphism + gradientlar
- Framer Motion (page transitions, hover/tap animatsiyalar)
- React Hook Form + Zod (validatsiya)
- Zustand (auth state) + next-themes (dark/light, localStorage persist)
- sonner toasts, lucide-react ikonlar

## Ishga tushirish
```bash
npm install          # bir martalik
npm run dev          # http://localhost:3000
# qo'shimcha: npm run lint
```

## Marshrutlar
- `/` → `/auth/login` ga redirect
- `/auth/login`
- `/auth/register`
- `/auth/forgot-password`
- `/auth/reset-password?token=...`
- `/auth/verify-email` (UI demo)
- `/dashboard` (protected)
- `/settings` (protected)

## LocalStorage sxemasi
- `users`: `[ { id, fullName, email, passwordHash, createdAt } ]`
- `session`: `{ token, userId, email, fullName, expiresAt }`
  - `remember me` yoqilganda 7 kun, bo‘lmasa 1 kun amal qiladi.
- `resetTokens`: `[ { email, token, expiresAt } ]` — 1 soat amal qiladi.

> Parollar demo uchun brauzerda SHA-256 bilan xeshlanadi (faqat namoyish maqsadida, real loyihada server tarafida xeshlash shart).

## Asosiy imkoniyatlar
- Glassmorphism + premium gradient fonlar, animated background blobs
- Framer Motion: sahifa fade/slide, form elementlari stagger, hover/tap lift
- Toastlar (success/error), validation xatoliklari, loading holatlari
- Password kuchlilik indikatori, show/hide toggle
- Tema toggle (dark/light) va saqlash (`umd-auth-theme`)
- Route guard: `/dashboard` va `/settings` sessiyasiz avtomatik `/auth/login` ga o‘tkazadi

## Foydali eslatmalar
- Demo ma’lumotlarini tozalash uchun brauzer devtools → Application → LocalStorage dan tegishli kalitlarni o‘chirib tashlang.
- UI to‘liq responsive (mobile-first), desktopda chap branding panel + o‘ng form maketi ishlatiladi.
