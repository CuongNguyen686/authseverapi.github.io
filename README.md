# Nguyễn Cường iOS • ChatGPTDeveloper Dashboard

Modern KeyAuth management dashboard inspired by the public UX patterns of Auth.AnhVu.cc, implemented as an independent project.

## Features
- Dashboard, API Keys, Packages, Analytics, Documentation, Pricing, Settings
- Package create/edit/delete/pause/resume/copy token/search/filter
- API key create/edit/delete/pause/resume/bulk select/export/search/filter
- Analytics range/metric/export
- Documentation tabs + copy code
- Pricing monthly/yearly + upgrade modal
- Settings: dark/light, accent color, density, profile, notifications, auto refresh, JSON backup/reset
- Toast, modal, ESC close, loading/empty/error states
- Responsive desktop/tablet/mobile
- Hash routing for GitHub Pages
- Mock API adapter backed by localStorage

## Run
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## GitHub Pages
Push to `main`. GitHub Actions in `.github/workflows/deploy.yml` builds and deploys the `dist` directory. Hash routing means direct refreshes work without server rewrites.

## API configuration
The UI uses `src/services/api.js` as its adapter. Replace the mock methods with REST calls when a backend is available. Do not place private credentials in Vite frontend environment variables.

## Mock data
Packages, keys and settings are persisted in `localStorage` under `nc-auth-db`.
## GitHub Pages — upload trực tiếp

Bản ZIP này có sẵn **bản static đã biên dịch ở thư mục gốc**, nên bạn có thể upload/push toàn bộ repository lên GitHub và chọn **Settings → Pages → Deploy from a branch → main → / (root)**. Không cần chạy `npm install` hay `npm run build` để hiển thị bản static.

Nếu muốn dùng GitHub Actions, workflow `.github/workflows/deploy.yml` vẫn có sẵn để build phiên bản Vite từ `src/`.

> Lưu ý: bản static dùng các module React/React Router/Lucide từ ESM CDN khi trình duyệt tải trang. Nếu môi trường chặn CDN, hãy dùng workflow build Vite để tạo bản self-hosted trong `dist/`.

