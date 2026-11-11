# Dilbaz

İki ayrı proje:

| Klasör | Ne? | Port | Çalıştırma |
|---|---|---|---|
| `backend/` | API (Node + PostgreSQL) | 3001 (`API_PORT`) | `cd backend && npm run dev` |
| `frontend/` | Web arayüzü (Vite) | 3000 | `cd frontend && npm run dev` |

Frontend, `/api` isteklerini Vite proxy'si ile backend'e yönlendirir; ikisi aynı anda açık olmalı.

## Backend komutları

- `npm run dev`: dosya değişince kendini yeniden başlatır (`node --watch`).
- `npm run cli -- create-admin <email> <şifre>`: yönetici hesabı oluşturur.
- `npm run content:en-b2` (ve diğer `content:*`): `src/content/` altındaki dersleri veritabanına yazar. Sona `-- --dry-run` eklersen sadece kontrol eder.

Alan (track) listesi iki yerde durur: `backend/src/tracks.js` (veritabanı) ve `frontend/src/core/tracks.js` (arayüz). Yeni alan eklerken ikisini de güncelle.

## Kök klasör

Sadece SonarQube araçları: `npm run sonar`.
