"use client";

import { useAuthStore } from "@/store/authStore";

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/navigation";

export default function Header() {

  const userName = useAuthStore((state) => state.userName);
  const router = useRouter();

  const handleLogout = () => {
    useAuthStore.getState().logout();
    router.push('/login');
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-brand-light text-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-2 md:px-8">
        
        <div className="flex-shrink-0">
          <Link href="/produtos">
            <Image 
              src="/logo.png"
              alt="Logo da Innovation Brindes"
              width={100}
              height={50}
              priority
              unoptimized
            />
          </Link>
        </div>

        {/* Ações - Lado Direito */}
        <div className="flex items-center gap-4">
          <button className="p-2 hover:text-gray-600 rounded-full transition-colors relative">
            <FavoriteBorderIcon />
            {/* Badge para favoritos, se necessário */}
            <span className="absolute top-1 right-1 bg-brand-green text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
              0
            </span>
          </button>
          
          <button className="flex items-center gap-2 p-2 hover:text-gray-600 rounded-full transition-colors">
            <PersonOutlineIcon />
            <span className="hidden lg:block text-sm font-medium">{userName || "Minha Conta"}</span>
          </button>
          <button 
            onClick={handleLogout}
            className="p-2 hover:text-red-400 rounded-full transition-colors flex items-center gap-1 cursor-pointer"
            title="Sair"
          >
            <LogoutIcon />
          </button>
        </div>
      </div>
    </header>
  );
}