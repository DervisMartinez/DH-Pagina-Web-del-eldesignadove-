'use client';

import { useTheme } from '@/features/core/providers/ThemeContext';
import { useEffect, useState } from 'react';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export function ThemeToggle({ className = '', showLabel = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render a placeholder with the same dimensions to avoid layout shift
    return (
      <div
        className={`w-10 h-10 rounded-lg bg-surface-container-highest/50 flex items-center justify-center opacity-50 ${className}`}
        aria-hidden="true"
      />
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-surface-container-highest hover:bg-surface-container-high text-primary transition-all duration-200 border border-outline-variant/30 hover:scale-105 active:scale-95 ${className}`}
      title={isDark ? 'Cambiar a modo claro (Fondo Claro)' : 'Cambiar a modo oscuro (Fondo Oscuro)'}
      aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
    >
      <span className="material-symbols-outlined text-[20px] transition-transform duration-300">
        {isDark ? 'light_mode' : 'dark_mode'}
      </span>
      {showLabel && (
        <span className="font-label-caps text-[11px] uppercase tracking-wider font-bold">
          {isDark ? 'Fondo Claro' : 'Fondo Oscuro'}
        </span>
      )}
    </button>
  );
}
