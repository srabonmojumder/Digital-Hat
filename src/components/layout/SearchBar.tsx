"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export function SearchBar() {
  const [q, setQ] = useState("");
  const router = useRouter();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const term = q.trim();
    router.push(term ? `/search?q=${encodeURIComponent(term)}` : "/search");
  }

  return (
    <form onSubmit={submit} className="search">
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search products..."
        aria-label="Search products"
        className="searchInput"
      />
      <button type="submit" aria-label="Search" className="searchBtn">
        <Search size={16} />
        <span className="searchBtnLabel">Search</span>
      </button>
    </form>
  );
}
