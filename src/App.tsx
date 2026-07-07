import { useState } from 'react'
import { BookOpen, LayoutGrid, type LucideIcon } from "lucide-react";
import './App.css'
import { cn } from './lib/utils';
import { useBooks } from './features/books/hooks/use-books';

type View = "books" | "categories";

const navItems: Array<{ key: View; label: string; icon: LucideIcon }> = [
  { key: "books", label: "Books", icon: BookOpen },
  { key: "categories", label: "Categories", icon: LayoutGrid },
];

function App() {
  const [activeView, setActiveView] = useState<View>("books");
  const [page, setPage] = useState<number>(
    1
  );

  const [perPage, setSize] = useState<number>(
    5
  );

  const apiParams = {
    page,
    perPage
  };

  const rgwgwe = useBooks(apiParams);
  //const { data: categories } = useCategories();

  // const counts: Record<View, number | undefined> = {
  //   books: books?.length,
  //   categories: 0,
  // };

  console.log("books data : ", rgwgwe)

  return (
    <>
      <div className="flex min-h-screen flex-col md:flex-row">
        <aside className="w-full shrink-0 border-b bg-muted/30 p-4 md:w-56 md:border-b-0 md:border-r">
          <h1 className="mb-4 px-2 text-lg font-semibold md:mb-6">Library Admin</h1>
          <nav className="flex gap-1 md:block md:space-y-1">
            {navItems.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                type="button"
                onClick={() => setActiveView(key)}
                className={cn(
                  "flex flex-1 items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors md:w-full md:flex-none",
                  activeView === key
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
                {/* {counts[key] !== undefined && (
                  <span className="ml-auto text-xs opacity-70">{counts[key]}</span>
                )} */}
              </button>
            ))}
          </nav>
        </aside>
      </div>
    </>
  )
}

export default App
