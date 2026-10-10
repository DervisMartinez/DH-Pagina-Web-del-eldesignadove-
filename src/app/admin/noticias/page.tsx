'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface NoticiaItem {
  id: number;
  slug: string;
  title: string;
  category: string;
  author: string;
  published_at: string;
  is_featured: boolean;
}

export default function AdminNoticiasPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');

  // Form fields
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('LVBP');
  const [author, setAuthor] = useState('Redacción El Designado');
  const [imageUrl, setImageUrl] = useState('/CARRUSEL/Navegantes del Magallanes.jpg');
  const [isFeatured, setIsFeatured] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const [articles, setArticles] = useState<NoticiaItem[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(false);

  const predefinedImages = [
    { label: 'Navegantes del Magallanes', url: '/CARRUSEL/Navegantes del Magallanes.jpg' },
    { label: 'Bravos de Margarita', url: '/CARRUSEL/16-12-2024 - Jesus Vargas vs Bravos .jpg' },
    { label: 'Caribes de Anzoátegui', url: '/CARRUSEL/Caribes de Anzoategui.png' },
    { label: 'Venezuela / WBC Héroes', url: '/CARRUSEL/Los Héroes del 26 - Venezuela alcanza la cima del mundo en una noche épica.jpg' },
    { label: 'Logo Blanco DH', url: '/DH LOGO fondo blanco.jpeg' },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'eldesignado2025' || password === 'rloE3UK8JjPAn8tS') {
      setIsAuthenticated(true);
      setAuthError('');
      loadArticles();
    } else {
      setAuthError('Contraseña incorrecta. Intenta nuevamente.');
    }
  };

  const loadArticles = async () => {
    setLoadingArticles(true);
    try {
      const res = await fetch('/api/noticias');
      const data = await res.json();
      if (data.noticias) {
        setArticles(data.noticias);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingArticles(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const res = await fetch('/api/noticias', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          subtitle,
          content,
          category,
          author,
          image_url: imageUrl,
          is_featured: isFeatured,
          password: 'eldesignado2025',
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Error al publicar noticia');
      }

      setMessage({ text: '¡Noticia publicada con éxito en Supabase!', type: 'success' });
      setTitle('');
      setSubtitle('');
      setContent('');
      setIsFeatured(false);
      loadArticles();
    } catch (err: any) {
      setMessage({ text: err.message || 'Error inesperado', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este reportaje?')) return;

    try {
      const res = await fetch(`/api/noticias?id=${id}&password=eldesignado2025`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setMessage({ text: 'Reportaje eliminado correctamente.', type: 'success' });
        loadArticles();
      } else {
        alert('Error al eliminar');
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="w-full bg-background min-h-[100dvh] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-surface-container-low border border-surface-container-highest p-8 rounded-3xl shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-3 h-3 rounded-full bg-primary" />
            <span className="font-label-caps text-xs text-primary uppercase tracking-widest font-bold">
              Panel Administrativo
            </span>
          </div>
          <h1 className="font-display-md text-2xl text-primary font-bold mb-2">
            El Designado • Redacción
          </h1>
          <p className="text-secondary text-sm mb-6">
            Ingresa tu clave de acceso para publicar noticias y reportajes en la base de datos de Supabase.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-label-caps uppercase text-outline mb-2">
                Clave de Acceso
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full p-3.5 bg-surface-container border border-surface-container-highest rounded-xl text-on-surface text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>

            {authError && (
              <p className="text-xs text-error font-medium">{authError}</p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-primary text-on-primary font-label-caps uppercase text-xs font-bold tracking-wider hover:opacity-90 transition-opacity"
            >
              Entrar al Panel
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-surface-container-highest text-center">
            <Link href="/noticias" className="text-xs text-secondary hover:text-primary transition-colors">
              ← Volver a Noticias
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full bg-background min-h-[100dvh] text-on-surface pt-28 md:pt-36 pb-24">
      <div className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop">
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-surface-container-highest">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
              <span className="font-label-caps text-xs text-green-400 uppercase font-bold tracking-widest">
                Supabase Conectado
              </span>
            </div>
            <h1 className="font-display-lg text-3xl md:text-4xl text-primary font-black uppercase">
              Panel de Redacción & Prensa
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/noticias"
              target="_blank"
              className="px-4 py-2 rounded-xl bg-surface-container text-xs font-label-caps uppercase text-secondary hover:text-primary transition-colors border border-surface-container-highest"
            >
              Ver Noticias en Vivo ↗
            </Link>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-4 py-2 rounded-xl bg-error/10 text-error hover:bg-error/20 text-xs font-label-caps uppercase transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>

        {message && (
          <div
            className={`p-4 rounded-2xl mb-8 flex items-center justify-between ${
              message.type === 'success'
                ? 'bg-green-500/10 border border-green-500/30 text-green-400'
                : 'bg-error/10 border border-error/30 text-error'
            }`}
          >
            <span className="text-sm font-medium">{message.text}</span>
            <button onClick={() => setMessage(null)} className="text-xs font-bold uppercase">
              ✕
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Creator Form */}
          <div className="lg:col-span-7 bg-surface-container-low border border-surface-container-highest p-6 md:p-8 rounded-3xl shadow-xl">
            <h2 className="font-headline-sm text-xl text-primary font-bold mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">add_circle</span>
              Escribir Nuevo Reportaje
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-label-caps uppercase text-outline mb-2">
                  Título de la Noticia *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ej: Magallanes vence a Leones en vibrante duelo de pitcheo"
                  required
                  className="w-full p-3.5 bg-surface-container border border-surface-container-highest rounded-xl text-on-surface text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-label-caps uppercase text-outline mb-2">
                  Bajante / Subtítulo (Opcional pero recomendado)
                </label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="Ej: La novena turca definió las acciones en el noveno inning con jonrón decisivo..."
                  className="w-full p-3.5 bg-surface-container border border-surface-container-highest rounded-xl text-on-surface text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-label-caps uppercase text-outline mb-2">
                    Categoría
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-3.5 bg-surface-container border border-surface-container-highest rounded-xl text-on-surface text-sm outline-none focus:border-primary cursor-pointer"
                  >
                    <option value="LVBP">LVBP</option>
                    <option value="MLB">Grandes Ligas (MLB)</option>
                    <option value="Serie del Caribe">Serie del Caribe</option>
                    <option value="Selección">Selección Vinotinto</option>
                    <option value="Opinión">Opinión & Análisis</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-label-caps uppercase text-outline mb-2">
                    Autor / Redactor
                  </label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Ej: Jesús Guerra"
                    className="w-full p-3.5 bg-surface-container border border-surface-container-highest rounded-xl text-on-surface text-sm outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-label-caps uppercase text-outline mb-2">
                  Imagen de Portada * (URL o archivo local)
                </label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://... o /CARRUSEL/..."
                  required
                  className="w-full p-3.5 bg-surface-container border border-surface-container-highest rounded-xl text-on-surface text-sm outline-none focus:border-primary mb-2"
                />
                <span className="text-[11px] text-outline block mb-2">
                  Atajos rápidos a imágenes ya guardadas en la página:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {predefinedImages.map((img) => (
                    <button
                      key={img.url}
                      type="button"
                      onClick={() => setImageUrl(img.url)}
                      className={`px-2.5 py-1 text-[10px] rounded-lg border transition-colors ${
                        imageUrl === img.url
                          ? 'bg-primary text-on-primary border-primary font-bold'
                          : 'bg-surface-container text-secondary border-surface-container-highest hover:text-primary'
                      }`}
                    >
                      {img.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-label-caps uppercase text-outline mb-2">
                  Contenido del Reportaje * (Separa párrafos con doble Enter)
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={9}
                  placeholder="Escribe aquí el cuerpo del artículo o reportaje..."
                  required
                  className="w-full p-3.5 bg-surface-container border border-surface-container-highest rounded-xl text-on-surface text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary font-sans leading-relaxed"
                />
              </div>

              <div className="flex items-center gap-3 p-4 bg-surface-container rounded-xl border border-surface-container-highest">
                <input
                  type="checkbox"
                  id="featured"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-4 h-4 accent-primary rounded cursor-pointer"
                />
                <label htmlFor="featured" className="text-xs text-on-surface cursor-pointer select-none">
                  <span className="font-bold text-primary block">Destacar como Noticia Principal</span>
                  Aparecerá en el encabezado gigante en la portada de noticias.
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-primary text-on-primary font-label-caps uppercase text-xs font-bold tracking-widest hover:opacity-90 disabled:opacity-50 transition-opacity shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="material-symbols-outlined text-[18px] animate-spin">sync</span>
                    Guardando en Supabase...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">publish</span>
                    Publicar Reportaje en Vivo
                  </>
                )}
              </button>
            </form>
          </div>

          {/* List of current articles */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            <h2 className="font-headline-sm text-xl text-primary font-bold flex items-center justify-between">
              <span>Reportajes Publicados ({articles.length})</span>
              <button
                onClick={loadArticles}
                className="text-xs font-label-caps text-secondary hover:text-primary flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[16px]">refresh</span>
                Recargar
              </button>
            </h2>

            {loadingArticles ? (
              <div className="p-8 text-center text-secondary text-sm bg-surface-container-low rounded-2xl border border-surface-container-highest animate-pulse">
                Cargando noticias desde Supabase...
              </div>
            ) : articles.length === 0 ? (
              <div className="p-8 text-center text-secondary text-sm bg-surface-container-low rounded-2xl border border-surface-container-highest">
                No hay noticias registradas.
              </div>
            ) : (
              <div className="space-y-3 max-h-[720px] overflow-y-auto pr-2">
                {articles.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-surface-container-low border border-surface-container-highest hover:border-outline-variant/50 transition-all flex flex-col justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-label-caps uppercase font-bold">
                          {item.category}
                        </span>
                        {item.is_featured && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-300 font-label-caps uppercase font-bold">
                            ★ En Portada
                          </span>
                        )}
                      </div>
                      <h4 className="font-headline-sm text-sm text-on-surface font-bold line-clamp-2">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-outline mt-1 font-label-caps">
                        Por {item.author}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-surface-container-highest text-xs">
                      <Link
                        href={`/noticias/${item.slug}`}
                        target="_blank"
                        className="text-primary hover:underline font-label-caps uppercase text-[11px] font-bold flex items-center gap-1"
                      >
                        Ver artículo ↗
                      </Link>

                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-error hover:text-red-400 font-label-caps uppercase text-[11px] font-bold flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[14px]">delete</span>
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
