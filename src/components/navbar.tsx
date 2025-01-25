"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ModeToggle } from '@/components/ui/mode-toggle';
import { UserButton } from '@clerk/nextjs';

const Navigation = () => {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/" },
    { name: "Puzzle", href: "/puzzle" },
  ];

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <div className="relative flex items-center gap-2 px-4 py-2.5 bg-black rounded-full shadow-xl border border-zinc-800">
        <div className="flex gap-6 items-center md:pr-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors",
                pathname === item.href
                  ? "text-white"
                  : "text-zinc-400 hover:text-zinc-100"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="px-4 py-1 border-zinc-800 md:border-l">
          <ModeToggle />
        </div>

        <div className="hidden md:block pl-4 border-l border-zinc-800">
          <UserButton />
        </div>

        <div className="md:hidden absolute -right-14 top-1/2 -translate-y-1/2">
          <div className="bg-black px-3 py-2 rounded-full border border-zinc-800 shadow-xl">
            <UserButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
