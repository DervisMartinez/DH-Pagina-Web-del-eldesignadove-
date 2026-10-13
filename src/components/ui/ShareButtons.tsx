'use client';

import React, { useState, useEffect } from 'react';

interface ShareButtonsProps {
  title: string;
  url: string;
  subtitle?: string | null;
  variant?: 'header' | 'banner';
}

export function ShareButtons({ title, url, subtitle, variant = 'header' }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    if (typeof navigator !== 'undefined' && !!navigator.share) {
      setCanShare(true);
    }
  }, []);

  const shareText = subtitle ? `${title} - ${subtitle}` : title;

  const handleCopy = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch (err) {
      console.warn('Failed to copy to clipboard', err);
    }
  };

  const handleNativeShare = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share({
          title,
          text: shareText,
          url,
        });
      }
    } catch (err) {
      // User cancelled share or not supported
    }
  };

  const shareLinks = [
    {
      name: 'WhatsApp',
      href: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title}\n\n${url}`)}`,
      hoverClass: 'hover:bg-[#25D366] hover:text-white hover:border-[#25D366] hover:shadow-lg hover:shadow-[#25D366]/20',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.301-.15-1.781-.879-2.056-.979-.276-.1-.476-.15-.677.15-.2.3-.776.979-.951 1.18-.176.2-.351.226-.652.075-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.784-1.675-2.085-.176-.3-.019-.463.132-.613.136-.135.301-.351.452-.526.15-.176.2-.301.301-.502.1-.2.05-.376-.025-.526-.076-.15-.677-1.631-.928-2.234-.244-.588-.493-.508-.677-.518-.175-.009-.376-.009-.577-.009-.2 0-.527.075-.802.376-.276.3-1.053 1.029-1.053 2.508s1.078 2.908 1.228 3.109c.15.2 2.122 3.24 5.141 4.542.718.31 1.278.496 1.716.635.722.23 1.38.197 1.901.12.579-.087 1.781-.728 2.032-1.431.251-.703.251-1.305.176-1.431-.076-.126-.276-.201-.577-.351zM12.004 2C6.48 2 2 6.48 2 12c0 1.947.56 3.764 1.524 5.306L2.05 22l4.823-1.442C8.36 21.464 10.122 22 12.004 22 17.524 22 22 17.52 22 12s-4.476-10-9.996-10z" />
        </svg>
      ),
    },
    {
      name: 'X (Twitter)',
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}&via=eldesignadove`,
      hoverClass: 'hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black hover:border-outline-variant hover:shadow-lg',
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      hoverClass: 'hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] hover:shadow-lg hover:shadow-[#1877F2]/20',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: 'Telegram',
      href: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      hoverClass: 'hover:bg-[#229ED9] hover:text-white hover:border-[#229ED9] hover:shadow-lg hover:shadow-[#229ED9]/20',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
        </svg>
      ),
    },
  ];

  if (variant === 'banner') {
    return (
      <div className="p-6 md:p-8 rounded-2xl bg-surface-container-low border border-surface-container-highest flex flex-col md:flex-row items-center justify-between gap-6 my-12 shadow-xl">
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
            <span className="material-symbols-outlined text-primary text-[20px]">share</span>
            <h4 className="font-label-caps text-sm uppercase tracking-wider text-primary font-bold">
              Comparte esta noticia
            </h4>
          </div>
          <p className="text-xs text-secondary">
            Difunde la actualidad del béisbol con tu comunidad y amigos.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {shareLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface-container-highest text-on-surface text-xs font-label-caps uppercase tracking-wider border border-surface-container-highest transition-all duration-200 ${item.hoverClass}`}
              title={`Compartir en ${item.name}`}
            >
              {item.icon}
              <span className="font-semibold">{item.name}</span>
            </a>
          ))}

          {/* Copiar Enlace Button */}
          <button
            onClick={handleCopy}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-label-caps uppercase tracking-wider border transition-all duration-200 ${
              copied
                ? 'bg-emerald-600 text-white border-emerald-500 shadow-lg shadow-emerald-600/30 font-bold'
                : 'bg-surface-container-highest text-on-surface border-surface-container-highest hover:bg-primary hover:text-on-primary'
            }`}
            title="Copiar enlace al portapapeles"
          >
            {copied ? (
              <>
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                <span>¡Copiado!</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[16px]">link</span>
                <span>Copiar Enlace</span>
              </>
            )}
          </button>

          {/* Native Mobile Share */}
          {canShare && (
            <button
              onClick={handleNativeShare}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-primary text-on-primary text-xs font-label-caps uppercase tracking-wider border border-primary hover:opacity-90 transition-all font-bold shadow-md"
              title="Más opciones de compartir"
            >
              <span className="material-symbols-outlined text-[16px]">ios_share</span>
              <span>Más</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  // Header Variant (Compact & Elegant beside author)
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-[11px] font-label-caps text-outline uppercase tracking-wider mr-1">
        Compartir:
      </span>

      <div className="flex items-center gap-1.5">
        {shareLinks.map((item) => (
          <a
            key={item.name}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-9 h-9 rounded-full bg-surface-container-highest border border-outline-variant/30 flex items-center justify-center text-secondary transition-all duration-200 active:scale-95 ${item.hoverClass}`}
            title={`Compartir en ${item.name}`}
            aria-label={`Compartir en ${item.name}`}
          >
            {item.icon}
          </a>
        ))}

        {/* Boton Copiar Enlace con feedback interactivo */}
        <button
          onClick={handleCopy}
          className={`h-9 px-3 rounded-full border text-xs font-label-caps uppercase tracking-wider flex items-center gap-1.5 transition-all duration-200 active:scale-95 ${
            copied
              ? 'bg-emerald-600 text-white border-emerald-500 shadow-md font-bold'
              : 'bg-surface-container-highest border-outline-variant/30 text-secondary hover:text-primary hover:border-primary/50'
          }`}
          title="Copiar enlace"
          aria-label="Copiar enlace"
        >
          <span className="material-symbols-outlined text-[16px]">
            {copied ? 'check' : 'link'}
          </span>
          <span className="text-[11px] font-semibold">{copied ? 'Copiado' : 'Copiar'}</span>
        </button>

        {/* Compartir nativo si el dispositivo lo soporta */}
        {canShare && (
          <button
            onClick={handleNativeShare}
            className="w-9 h-9 rounded-full bg-surface-container-highest border border-outline-variant/30 flex items-center justify-center text-secondary hover:text-primary hover:border-primary/50 transition-all duration-200 active:scale-95"
            title="Más opciones para compartir"
            aria-label="Más opciones para compartir"
          >
            <span className="material-symbols-outlined text-[17px]">share</span>
          </button>
        )}
      </div>
    </div>
  );
}
