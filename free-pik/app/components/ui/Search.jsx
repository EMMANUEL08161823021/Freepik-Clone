"use client";
import React, { useEffect, useRef, useState } from "react";

/**
 * Props:
 *  - placeholder: string
 *  - onSearch: function(value) => called when user presses Enter or when debounced search triggers
 *  - suggestions: array of strings (optional) for local typeahead
 *  - debounceMs: number (defaults to 300)
 */
export default function Search({
  placeholder = "Search...",
  onSearch = () => {},
  suggestions = [],
  debounceMs = 300,
}) {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  // Debounced calling of onSearch
  useEffect(() => {
    const handler = setTimeout(() => {
      if (value.trim() !== "") {
        onSearch(value.trim());
      }
    }, debounceMs);

    return () => clearTimeout(handler);
  }, [value, onSearch, debounceMs]);

  // Filter suggestions locally
  useEffect(() => {
    if (!value) {
      setFiltered([]);
      setOpen(false);
      setActiveIndex(-1);
      return;
    }
    if (suggestions?.length) {
      const q = value.toLowerCase();
      const list = suggestions
        .filter((s) => s.toLowerCase().includes(q))
        .slice(0, 6);
      setFiltered(list);
      setOpen(list.length > 0);
      setActiveIndex(-1);
    } else {
      setFiltered([]);
      setOpen(false);
    }
  }, [value, suggestions]);

  // keyboard navigation
  const onKeyDown = (e) => {
    if (!open || !filtered.length) {
      if (e.key === "Enter") {
        // submit search
        onSearch(value.trim());
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
      scrollToActive();
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
      scrollToActive();
    }
    if (e.key === "Enter") {
      e.preventDefault();
      const selection = filtered[activeIndex] ?? value;
      setValue(selection);
      setOpen(false);
      onSearch(selection);
      inputRef.current?.blur();
    }
    if (e.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
    }
  };

  function scrollToActive() {
    // helpful when suggestions overflow
    const listEl = listRef.current;
    if (!listEl) return;
    const active = listEl.querySelector("[data-active='true']");
    if (active) {
      const aRect = active.getBoundingClientRect();
      const lRect = listEl.getBoundingClientRect();
      if (aRect.bottom > lRect.bottom) active.scrollIntoView({ block: "end" });
      if (aRect.top < lRect.top) active.scrollIntoView({ block: "start" });
    }
  }

  const onSelect = (item) => {
    setValue(item);
    setOpen(false);
    onSearch(item);
  };

  return (
    <div className="relative w-full max-w-xl">
      {/* <label htmlFor="search-input" className="sr-only">Search</label> */}

      <div className="flex items-center gap-2">
        {/* Search icon */}
        <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
          </svg>
        </div>

        <input
          id="search-input"
          ref={inputRef}
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => { if (filtered.length) setOpen(true); }}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-10 pr-10 text-sm shadow-sm focus:outline-none focus:ring-2 focus:border-gray-400"
          aria-autocomplete={suggestions?.length ? "list" : "none"}
          aria-controls="search-suggestions"
          aria-expanded={open}
        />

        {value ? (
          <button
            type="button"
            onClick={() => { setValue(""); setOpen(false); inputRef.current?.focus(); }}
            className="absolute right-10 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-500 hover:bg-gray-100"
            aria-label="Clear search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6.72 6.72a.75.75 0 011.06 0L10 8.94l2.22-2.22a.75.75 0 111.06 1.06L11.06 10l2.22 2.22a.75.75 0 11-1.06 1.06L10 11.06l-2.22 2.22a.75.75 0 11-1.06-1.06L8.94 10 6.72 7.78a.75.75 0 010-1.06z" clipRule="evenodd" />
            </svg>
          </button>
        ) : null}

        {/* Submit button */}
        {/* <button
          type="button"
          onClick={() => onSearch(value.trim())}
          className="ml-2 hidden rounded-md bg-indigo-600 px-3 py-2 text-sm text-gray-900 hover:bg-indigo-700 md:inline-flex"
          aria-label="Submit search"
        >
          Search
        </button> */}
      </div>

      {/* Suggestions dropdown */}
      {open && filtered.length > 0 && (
        <ul
          id="search-suggestions"
          ref={listRef}
          role="listbox"
          aria-label="Search suggestions"
          className="absolute z-40 mt-2 max-h-56 w-full overflow-auto rounded-md border bg-white py-1 shadow-lg"
        >
          {filtered.map((item, idx) => {
            const isActive = idx === activeIndex;
            return (
              <li
                key={item + idx}
                data-active={isActive}
                role="option"
                aria-selected={isActive}
                onMouseDown={(e) => e.preventDefault()} // prevent losing focus before click
                onClick={() => onSelect(item)}
                className={`cursor-pointer px-3 py-2 text-sm hover:bg-gray-100 ${isActive ? "bg-gray-100" : ""}`}
              >
                {item}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
