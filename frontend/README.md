# Frontend Architecture & Routing Flow

This document explains the structural layout and routing mechanisms of the React frontend application.

## 📂 File & Directory Structure

```text
frontend/
├── package.json          # Project dependencies and Vite scripts
├── vite.config.js        # Vite build and dev server configuration
├── eslint.config.js      # ESLint rules
├── index.html            # Main HTML template entry point
└── src/
    ├── main.jsx          # Application entry point (renders <App /> to DOM)
    ├── App.jsx           # Root component (handles routing & context providers)
    ├── index.css         # Global Tailwind CSS directives
    ├── App.css           # Global fallback styles
    │
    ├── assets/           # Static assets (images, icons, fonts)
    │
    ├── components/       # Reusable UI components used across multiple pages
    │   ├── ProtectedRoute.jsx  # Wrapper component for auth-restricted routes
    │   └── Sidebar.jsx         # Navigation sidebar component
    │
    ├── context/          # React Context providers for global state
    │   └── AuthContext.jsx     # Manages user authentication state & login/logout logic
    │
    ├── layouts/          # Layout wrappers (currently mostly structure templates)
    │   ├── PublicLayout.jsx
    │   ├── DashboardLayout.jsx
    │   └── SubjectLayout.jsx
    │
    └── pages/            # Page-level components corresponding to application routes
        ├── LandingPage.jsx / .css
        ├── SignupPage.jsx / .css
        ├── DashboardPage.jsx / .css
        ├── SubjectsListPage.jsx
        ├── SubjectPage.jsx / .css
        ├── ChatPage.jsx / .css
        ├── ProfilePage.jsx
        ├── SettingsPage.jsx / .css
        └── NotFoundPage.jsx
```

## 🔄 Routing Flow

The routing mechanism is driven by **React Router DOM** and is primarily configured inside `src/App.jsx`.

### 1. Code Splitting & Performance
The application uses React's `lazy` and `Suspense` to lazily load page components. This dramatically improves the initial loading time by breaking the code into smaller chunks that are only loaded when users navigate to a specific route.
- While a page chunk is loading, a fallback `<PageLoader />` component is displayed.

### 2. Global Contexts
The entire routing system (`<Routes />`) is wrapped in global context providers:
- **`AuthProvider`**: Ensures that the authentication state is globally accessible across all routes, managing user sessions.

### 3. Route Map
The application routes are divided into clear categories:

#### Public Routes
Routes accessible without authentication:
- `/` ➔ `LandingPage` (Welcome page)
- `/auth/login` ➔ `SignupPage` (Authentication flow)

#### Protected Routes (Dashboard)
Routes that require the user to be logged in (typically protected by authentication logic before rendering):
- `/dashboard` ➔ `DashboardPage` (Main user hub)
- `/dashboard/subjects` ➔ `SubjectsListPage` (List of user's subjects)

#### Subject Inner Navigation (Nested Flow)
For features specific to a particular subject (`subjectId`):
- `/dashboard/subjects/:subjectId` ➔ Automatically redirects to the `materials` sub-route.
- `/dashboard/subjects/:subjectId/materials` ➔ `SubjectPage` (Subject details/materials)
- `/dashboard/subjects/:subjectId/chat` ➔ `ChatPage` (Chat interface for the subject)
- `/dashboard/subjects/:subjectId/quizzes` ➔ Inline React elements showing "Coming Soon" with the `Sidebar`.

#### Other Dashboard Features
- `/dashboard/chat-history` ➔ `ChatPage` (Viewing historical chats)
- `/dashboard/api-settings` ➔ `SettingsPage` (User settings configurations)
- `/dashboard/profile` ➔ `ProfilePage` (User profile)

#### Catch-All Route
- `*` ➔ `NotFoundPage` (404 Error screen for unmatched URLs)

### Note on Layouts
While `src/layouts/` exists and contains wrapper layouts (`DashboardLayout`, `PublicLayout`, `SubjectLayout`), the current routing in `App.jsx` handles layout logic primarily within the individual `Page` components directly (e.g., repeating the `Sidebar` inside `App.jsx` dynamically or within page definitions), rather than using explicit Nested Route Layouts.
