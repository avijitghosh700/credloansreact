## Installation & Setup

1. **Install dependencies:**
	```bash
	npm install
	```

3. **Start the development server:**
	```bash
	npm start
	```

4. **Build for production:**
	```bash
	npm run build
	```

5. **Lint and format code (optional):**
	```bash
	npm run lint
	npm run format
	```

---
## CredLoansReact – Project Documentation (Simplified)

### Overview
This is a React + TypeScript project for a credit and loan dashboard. It uses React Router v6 for navigation and is organized for clarity and scalability.

### Structure
```
src/
	components/
		layout/
			AuthLayout.tsx
			ProtectedRouteLayout.tsx
			footer/Footer.tsx
			header/Header.tsx
	pages/
		auth/
			Login.tsx
			Register.tsx
			ForgotPassword.tsx
		dashboard/
			Dashboard.tsx
	shared/           # (empty, for future shared code)
	env.d.ts          # TypeScript global types
	index.tsx         # App entry & routing
	style.css         # Global styles
```

### Key Points
- **Routing:** All routes in `index.tsx` using React Router v6. Auth pages are nested under `/auth` with a shared layout.
- **Layouts:** Layout components (header, footer, auth) are in `components/layout/`.
- **Pages:** User-facing pages are in `pages/`, grouped by feature.
- **TypeScript:** Used throughout for type safety.
- **Styling:** Global styles in `style.css` (can be extended).

### How to Extend
- Add new pages to `pages/`.
- Add new layouts or shared UI to `components/layout/`.
- Add shared logic to `shared/`.
- Keep routing logic in `index.tsx`.

---
This documentation reflects the current state and is a starting point for future development.
