'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface AuthUser {
  id: number;
  name: string;
  username: string;
  role: 'admin' | 'redactor';
}

export function WordPressAdminBar() {
  const pathname = usePathname();
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const checkSession = () => {
      const saved = localStorage.getItem('dh_admin_session');
      if (saved) {
        try {
          setUser(JSON.parse(saved));
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    checkSession();

    // Listen to storage events across tabs or local changes
    window.addEventListener('storage', checkSession);
    return () => window.removeEventListener('storage', checkSession);
  }, []);

  useEffect(() => {
    if (user && !pathname.startsWith('/admin')) {
      document.body.classList.add('has-wp-admin-bar');
    } else {
      document.body.classList.remove('has-wp-admin-bar');
    }
    return () => {
      document.body.classList.remove('has-wp-admin-bar');
    };
  }, [user, pathname]);

  const handleLogout = () => {
    localStorage.removeItem('dh_admin_session');
    setUser(null);
    window.location.reload();
  };

  // Do not show admin bar on /admin routes (the admin panel already has its own navigation)
  if (!user || pathname.startsWith('/admin')) {
    return null;
  }

  const isArticlePage = pathname.startsWith('/noticias/') && pathname !== '/noticias';

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-8 bg-[#1d2327] text-[#c3c4c7] text-[11px] font-sans flex items-center justify-between px-3 md:px-6 border-b border-[#2c3338] shadow-md select-none">
      {/* Left side items (WordPress style) */}
      <div className="flex items-center gap-1 md:gap-3 overflow-x-auto hide-scrollbar">
        {/* WP Brand & Dashboard link */}
        <Link
          href="/admin"
          className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-[#2c3338] hover:text-[#72aee6] transition-colors font-medium whitespace-nowrap"
          title="Ir al Escritorio de Administración"
        >
          <span className="w-4 h-4 rounded bg-primary text-on-primary font-bold text-[9px] flex items-center justify-center">
            DH
          </span>
          <span className="hidden sm:inline font-bold text-[#f0f0f1]">El Designado</span>
        </Link>

        {/* Quick link to Dashboard */}
        <Link
          href="/admin"
          className="flex items-center gap-1 px-2 py-1 rounded hover:bg-[#2c3338] hover:text-[#72aee6] transition-colors whitespace-nowrap"
        >
          <span className="material-symbols-outlined text-[14px]">dashboard</span>
          <span className="hidden md:inline">Escritorio</span>
        </Link>

        {/* Quick link to Add New Post */}
        <Link
          href="/admin"
          className="flex items-center gap-1 px-2 py-1 rounded hover:bg-[#2c3338] hover:text-[#72aee6] transition-colors whitespace-nowrap text-[#72aee6] font-medium"
        >
          <span className="material-symbols-outlined text-[14px]">add</span>
          <span>Añadir Entrada</span>
        </Link>

        {/* Quick link to Standings */}
        <Link
          href="/admin"
          className="hidden lg:flex items-center gap-1 px-2 py-1 rounded hover:bg-[#2c3338] hover:text-[#72aee6] transition-colors whitespace-nowrap"
        >
          <span className="material-symbols-outlined text-[14px]">sports_baseball</span>
          <span>Editar Posiciones LVBP</span>
        </Link>

        {/* If inside an article, show Quick Edit button */}
        {isArticlePage && (
          <Link
            href="/admin"
            className="flex items-center gap-1 px-2 py-1 rounded bg-[#2c3338] text-primary hover:bg-[#32373c] transition-colors whitespace-nowrap font-bold"
          >
            <span className="material-symbols-outlined text-[13px]">edit</span>
            <span>Editar Entrada</span>
          </Link>
        )}
      </div>

      {/* Right side items (User Profile & Logout) */}
      <div className="flex items-center gap-2 md:gap-3 shrink-0">
        <div className="hidden sm:flex items-center gap-2 text-[#a7aaad]">
          <span>Hola,</span>
          <span className="text-[#f0f0f1] font-bold">{user.name}</span>
          <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-[#2c3338] text-primary font-bold">
            {user.role}
          </span>
        </div>

        <Link
          href="/admin"
          className="px-2.5 py-0.5 rounded bg-primary/20 text-primary border border-primary/30 hover:bg-primary hover:text-on-primary transition-all font-bold text-[10px] uppercase tracking-wider"
        >
          Panel CMS
        </Link>

        <button
          onClick={handleLogout}
          className="px-2 py-0.5 rounded hover:bg-[#2c3338] hover:text-red-400 transition-colors text-[10px] uppercase font-bold text-[#a7aaad]"
          title="Cerrar sesión de redactor"
        >
          Salir
        </button>
      </div>
    </div>
  );
}
