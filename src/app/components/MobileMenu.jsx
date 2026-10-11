"use client";

import { useEffect, useRef, useState } from "react";
import { useSession } from "@/lib/auth-client";
import UserInfo from "./UserInfo";

const MobileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const { data: session } = useSession();
  const user = session?.user;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "pointerdown",
        handleClickOutside
      );
    };
  }, []);

  if (user) {
    return (
      <div className="sm:hidden">
        <UserInfo />
      </div>
    );
  }

  // Logged out হলে hamburger দেখাবে
  return (
    <div ref={menuRef} className="relative sm:hidden">
      <button
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-xl text-gray-700 transition hover:bg-gray-50"
        aria-label="Menu"
        aria-expanded={isMenuOpen}
      >
        {isMenuOpen ? "✕" : "☰"}
      </button>

      {isMenuOpen && (
        <div className="absolute right-0 top-12 z-50 w-64 rounded-xl border border-gray-200 bg-white p-4 shadow-lg">
          <UserInfo />
        </div>
      )}
    </div>
  );
};

export default MobileMenu;