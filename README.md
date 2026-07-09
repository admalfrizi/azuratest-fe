# AzuraTest FE
 
A library management admin dashboard built with **React 19**, **TypeScript**, and **Vite**. It provides full CRUD screens for managing **books** and **categories**, backed by server-side pagination, searching/filtering, and a reusable data table built on TanStack Table.
 
> This repository contains the **frontend** only. It expects a REST API (configured via an environment variable) exposing `/api/v1/books` and `/api/v1/categories` resources.

## Tech Stack
 
| Layer | Technology |
|---|---|
| Framework | React 19 + Vite 8 |
| Language | TypeScript |
| Routing/State | Local component state (no router pages yet — see [Architecture](#architecture)) |
| Server state | TanStack Query (React Query) v5 |
| Tables | TanStack Table v8 |
| HTTP client | Axios |
| Forms & validation | React Hook Form + Zod (`@hookform/resolvers`) |
| UI components | shadcn/ui (Base UI variant, `base-rhea` style) |
| Styling | Tailwind CSS v4 |
| Icons | Hugeicons (`@hugeicons/react`) + lucide-react |
| Notifications | Sonner (toasts) |
| Linting | ESLint + typescript-eslint |

## Key Features
 
- **Books management** — list, create, edit, and delete books with title, author, publisher, publication date, page count, and category.
- **Categories management** — list, create, edit, and delete book categories.
- **Server-side pagination** on both screens, with a configurable rows-per-page selector (10/20/30/50).
- **Search & filtering** on the Books page — free-text search (debounced 500ms) and filter-by-category, combined into the query params sent to the API.
- **Reusable `DataTable`** component (sorting, column visibility, row selection, loading skeletons, empty/error states) shared across features.
- **Sequential row numbering** that stays correct across pages (`pageIndex * pageSize + row.index + 1`), rather than resetting to 1 on every page.
- **Form dialogs** using React Hook Form + Zod schemas, with dedicated field components (input, select, date) reused between create and edit modes.
- **Delete confirmation dialogs** with pending/loading states to prevent accidental data loss.
- **Toast feedback** for success/error states on every mutation.

## Architecture
 
The project follows a **feature-based** structure with a light layered pattern for data access, so that each domain (books, categories) owns its API calls, hooks, and pages, while cross-cutting UI (data table, dialogs, shadcn primitives) lives in shared folders.
 
```
src/
├── api/                    # Axios call definitions per resource (thin HTTP layer)
│   ├── books.ts
│   └── categories.ts
├── constants/
│   └── services.ts         # Centralized API endpoint paths (/api/v1/...)
├── lib/
│   ├── axios.ts             # Configured axios instance + response error interceptor
│   ├── fetch.ts             # useFetch(): generic TanStack Query GET wrapper around axios
│   ├── utils.ts             # cn() classname helper, useDebounce() hook
│   └── validations.ts       # Zod schemas (bookSchema, categorySchema) + inferred types
├── types/
│   ├── data.d.ts            # Book, Categories domain models
│   ├── params.ts            # Pagination / mutation param types
│   └── response.d.ts        # ApiSuccessResponse, Meta, PaginationDataResponse<T>
├── components/
│   ├── ui/                  # shadcn/ui primitives (button, dialog, table, select, ...)
│   ├── data-table/           # Reusable DataTable, column header, toolbar, pagination, row actions
│   ├── filter/                # FilterGroup + SearchRow (category/date/search filter bar)
│   └── alert-dialog/          # ConfirmDialog (generic confirm/cancel dialog)
└── features/
    ├── books/
    │   ├── components/       # book-column, book-form(+dialog), input/select/date fields
    │   ├── hooks/            # use-books.ts — query keys + useBooks/useCreateBook/...
    │   └── pages/
    │       └── books_page.tsx
    └── categories/
        ├── components/
        ├── hooks/
        │   └── use-categories.ts
        └── pages/
            └── categories_page.tsx
```

**Data flow, top to bottom:**
 
1. `constants/services.ts` defines the raw endpoint strings for each resource.
2. `api/*.ts` wraps those endpoints in typed Axios calls (`bookApi`, `categoriesAPI`).
3. `lib/fetch.ts` exposes `useFetch`, a thin generic wrapper over `useQuery` that unwraps the Axios response.
4. `features/*/hooks/*` compose `useFetch`/`useMutation` into domain-specific hooks (e.g. `useBooks`, `useCreateBook`, `useDeleteCategory`), each with its own query-key factory (`bookKeys`, `categoryKeys`) so cache invalidation stays scoped and predictable.
5. `features/*/pages/*` own the local UI state (pagination, filters, dialog open/close) and wire hooks to the shared `DataTable` and form dialog components.
6. `App.tsx` renders a simple sidebar (Books / Categories) and swaps the active page via local `useState` — there's no client-side router wired up yet, even though `react-router` is a listed dependency.
Path alias: `@/*` resolves to `src/*` (configured in `vite.config.ts` and `tsconfig.json`), used consistently by the shadcn CLI-generated files.

## Pages Summary
 
### Books (`/features/books`)
 
- Table columns: `No.` (auto-incrementing across pages), Nama Buku (title), Penulis Buku (author), Kategori (category name), Penerbit (publisher), and an actions column (edit/delete).
- Toolbar (`FilterGroup` + `SearchRow`): category dropdown, a publication-time-slot dropdown, and a search input — search is debounced 500ms before triggering a refetch.
- "Tambah Data" button opens `BookFormDialog`, which renders `BookForm` (title, author, publisher, publication date, page count, category select) validated by `bookSchema` (Zod).
- Editing pre-fills the form from the selected row; creating resets to blank defaults with the first available category pre-selected.
- Deleting opens a `ConfirmDialog` and calls `useDeleteBook`, invalidating the `books` query cache on success.
- Category options for the filter and the form are fetched via `useCategoryOption` (`/api/v1/categories/option`).
### Categories (`/features/categories`)
 
- Simpler table: `No.`, Name, and actions (edit/delete). Default page size is 5.
- "Tambah Data" opens `CategoryFormDialog` → `categorySchema`-validated single-field form (name).
- Delete confirmation warns that books using the category will need to be reassigned.
- Mutations (`useCreateCategory`, `useUpdateCategory`, `useDeleteCategory`) invalidate the relevant `categories` query keys so the table refreshes automatically.

## API Integration
 
The frontend expects a backend exposing the following resources under `VITE_BASE_API_URL`:
 
| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/v1/books/` | List books (supports `page`, `perPage`, `category_id`, `search` query params) |
| GET | `/api/v1/books/:id` | Get a single book |
| GET | `/api/v1/books/publication-dates` | list publication data from book for option filtering |
| POST | `/api/v1/books/` | Create a book |
| PUT | `/api/v1/books/:id` | Update a book |
| DELETE | `/api/v1/books/:id` | Delete a book |
| GET | `/api/v1/categories/` | List categories (supports `page`, `perPage`) |
| GET | `/api/v1/categories/option` | List categories for select/option inputs (no pagination) |
| GET | `/api/v1/categories/:id` | Get a single category |
| POST | `/api/v1/categories/` | Create a category |
| PUT | `/api/v1/categories/:id` | Update a category |
| DELETE | `/api/v1/categories/:id` | Delete a category |
 
Expected paginated response shape (see `src/types/response.d.ts`):
 
```json
{
  "success": true,
  "code": 200,
  "message": "OK",
  "data": [ /* Book[] or Categories[] */ ],
  "meta": {
    "page": 1,
    "perPage": 10,
    "totalPages": 5,
    "totalCount": 47
  }
}
```

## Getting Started
 
### Prerequisites
 
- Node.js (LTS recommended)
- npm (a `package-lock.json` is committed)
- A running instance of the backing REST API described above
### Installation
 
```bash
# 1. Clone the repository
git clone https://github.com/admalfrizi/azuratest-fe.git
cd azuratest-fe
 
# 2. Install dependencies
npm install
 
# 3. Configure environment variables
cp .env.example .env
# then edit .env and set VITE_BASE_API_URL
 
# 4. Start the dev server
npm run dev
```
 
The app will be available at the URL Vite prints (typically `http://localhost:5173`).
 
### Environment Variables
 
| Variable | Description | Example |
|---|---|---|
| `VITE_BASE_API_URL` | Base URL of the backend API (used as the Axios `baseURL`) | `http://localhost:3000` |
 
### Available Scripts
 
| Script | Description |
|---|---|
| `npm run dev` | Start the Vite development server with HMR |
| `npm run build` | Type-check (`tsc -b`) and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |
 
## Notes
 
- UI components were scaffolded via the shadcn/ui CLI (see `components.json`: `base-rhea` style, `mist` base color, Hugeicons as the icon library) — regenerate/add components with the shadcn CLI rather than hand-rolling primitives in `components/ui`.
- Some UI copy is currently in Indonesian (e.g. "Tambah Data", "Kategori Buku") — worth keeping in mind if you plan to internationalize the app later.
- No `LICENSE` file is currently present in the repository.
