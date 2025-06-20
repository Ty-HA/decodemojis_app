"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaSearch, FaBookOpen, FaComments, FaPlusCircle } from "react-icons/fa";

export default function BottomBar() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-600 shadow-lg md:hidden z-50 rounded-t-2xl border-t border-white/10">
      <nav className="container mx-auto py-2 px-1">
        <ul className="flex justify-around items-center">
          <li className="flex-1">
            <Link href="/"
              className={`flex flex-col items-center p-1 ${isActive("/") ? "text-amber-300" : "text-white"}`}>
              <FaHome className="text-2xl mb-0.5" />
              <span className="text-[0.7rem] font-medium">Accueil</span>
            </Link>
          </li>
          <li className="flex-1">
            <Link href="/search"
              className={`flex flex-col items-center p-1 ${isActive("/search") ? "text-amber-300" : "text-white"}`}>
              <FaSearch className="text-2xl mb-0.5" />
              <span className="text-[0.7rem] font-medium">Recherche</span>
            </Link>
          </li>
          <li className="flex-1">
            <Link href="/glossaire"
              className={`flex flex-col items-center p-1 ${isActive("/glossaire") || isActive("/glossaire-alphabetique") ? "text-amber-300" : "text-white"}`}>
              <FaBookOpen className="text-2xl mb-0.5" />
              <span className="text-[0.7rem] font-medium">Emojis</span>
            </Link>
          </li>
          <li className="flex-1">
            <Link href="/glossaire-argot"
              className={`flex flex-col items-center p-1 ${isActive("/glossaire-argot") || isActive("/glossaire-argot-categories") ? "text-amber-300" : "text-white"}`}>
              <FaComments className="text-2xl mb-0.5" />
              <span className="text-[0.7rem] font-medium">Argot</span>
            </Link>
          </li>
          <li className="flex-1">
            <Link href="/proposer"
              className={`flex flex-col items-center p-1 ${isActive("/proposer") ? "text-amber-300" : "text-white"}`}>
              <FaPlusCircle className="text-2xl mb-0.5" />
              <span className="text-[0.7rem] font-medium">Ajouter</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
