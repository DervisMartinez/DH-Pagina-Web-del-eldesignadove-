'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface NoticiaItem {
  id: number;
  slug: string;
  title: string;
  subtitle: string | null;
  content: string;
  category: string;
  author: string;
  image_url: string;
  external_link?: string | null;
  status: 'published' | 'draft';
  is_featured: boolean;
  views: number;
  published_at: string;
}

interface UserItem {
  id: number;
  name: string;
  username: string;
  role: 'admin' | 'redactor';
  created_at: string;
}

interface CategoryItem {
  id: number;
  name: string;
  slug: string;
}

interface AuthUser {
  id: number;
  name: string;
  username: string;
  role: 'admin' | 'redactor';
}

export default function WordPressAdminPage() {
  // Authentication
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<'escritorio' | 'entradas' | 'editor' | 'categorias' | 'usuarios'>('escritorio');

  // Filter in Entradas tab
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Articles state
  const [articles, setArticles] = useState<NoticiaItem[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(false);

  // Categories state
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [creatingCategory, setCreatingCategory] = useState(false);

  // Editor Form state
  const [editingId, setEditingId] = useState<number | null>(null);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('LVBP');
  const [author, setAuthor] = useState('');
  const [imageUrl, setImageUrl] = useState('/CARRUSEL/Navegantes del Magallanes.jpg');
  const [externalLink, setExternalLink] = useState('');
  const [isFeatured, setIsFeatured] = useState(true);
  const [postStatus, setPostStatus] = useState<'published' | 'draft'>('published');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  // Users Management state
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserUsername, setNewUserUsername] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserRole, setNewUserRole] = useState<'admin' | 'redactor'>('redactor');
  const [creatingUser, setCreatingUser] = useState(false);

  // Notifications
  const [feedback, setFeedback] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Predefined image shortcuts
  const predefinedImages = [
    { label: 'Magallanes', url: '/CARRUSEL/Navegantes del Magallanes.jpg' },
    { label: 'Bravos de Margarita', url: '/CARRUSEL/16-12-2024 - Jesus Vargas vs Bravos .jpg' },
    { label: 'Caribes de Anzoátegui', url: '/CARRUSEL/Caribes de Anzoategui.png' },
    { label: 'Héroes del 26 (Vinotinto)', url: '/CARRUSEL/Los Héroes del 26 - Venezuela alcanza la cima del mundo en una noche épica.jpg' },
    { label: 'Logo DH', url: '/DH LOGO fondo blanco.jpeg' },
  ];

  // Check saved session in localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('dh_admin_session');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCurrentUser(parsed);
        setAuthor(parsed.name);
      } catch (e) {
        localStorage.removeItem('dh_admin_session');
      }
    }
  }, []);

  // Fetch data when logged in
  useEffect(() => {
    if (currentUser) {
      fetchArticles();
      fetchCategories();
      if (currentUser.role === 'admin') {
        fetchUsers();
      }
    }
  }, [currentUser]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loginUsername, password: loginPassword }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Credenciales incorrectas');
      }

      setCurrentUser(data.user);
      setAuthor(data.user.name);
      localStorage.setItem('dh_admin_session', JSON.stringify(data.user));
    } catch (err: any) {
      setLoginError(err.message || 'Error al iniciar sesión');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('dh_admin_session');
    setActiveTab('escritorio');
  };

  const fetchArticles = async () => {
    setLoadingArticles(true);
    try {
      const res = await fetch('/api/noticias?status=all');
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

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/admin/categories');
      const data = await res.json();
      if (data.categories) {
        setCategories(data.categories);
        if (data.categories.length > 0 && !category) {
          setCategory(data.categories[0].name);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const res = await fetch('/api/admin/users');
      const data = await res.json();
      if (data.users) {
        setUsers(data.users);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingUsers(false);
    }
  };

  // Upload image file directly from PC
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    setFeedback(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al subir imagen');

      setImageUrl(data.url);
      setFeedback({ text: `¡Foto "${file.name}" subida exitosamente a Supabase!`, type: 'success' });
    } catch (err: any) {
      setFeedback({ text: err.message || 'Error al subir archivo', type: 'error' });
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    setCreatingCategory(true);
    try {
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCategoryName }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al crear categoría');

      setFeedback({ text: `Categoría "${newCategoryName}" creada exitosamente.`, type: 'success' });
      setNewCategoryName('');
      fetchCategories();
    } catch (err: any) {
      setFeedback({ text: err.message, type: 'error' });
    } finally {
      setCreatingCategory(false);
    }
  };

  const handleDeleteCategory = async (id: number, name: string) => {
    if (!confirm(`¿Eliminar categoría "${name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/categories?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setFeedback({ text: 'Categoría eliminada.', type: 'success' });
        fetchCategories();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const resetEditor = () => {
    setEditingId(null);
    setTitle('');
    setSubtitle('');
    setContent('');
    setCategory(categories[0]?.name || 'LVBP');
    setAuthor(currentUser ? currentUser.name : 'Redacción El Designado');
    setImageUrl('/CARRUSEL/Navegantes del Magallanes.jpg');
    setExternalLink('');
    setIsFeatured(true);
    setPostStatus('published');
  };

  const startNewPost = () => {
    resetEditor();
    setActiveTab('editor');
  };

  const startEditPost = (item: NoticiaItem) => {
    setEditingId(item.id);
    setTitle(item.title);
    setSubtitle(item.subtitle || '');
    setContent(item.content);
    setCategory(item.category);
    setAuthor(item.author);
    setImageUrl(item.image_url);
    setExternalLink(item.external_link || '');
    setIsFeatured(item.is_featured);
    setPostStatus(item.status);
    setActiveTab('editor');
  };

  const handleSavePost = async (e: React.FormEvent, forceStatus?: 'published' | 'draft') => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    const targetStatus = forceStatus || postStatus;

    try {
      const payload: any = {
        title,
        subtitle,
        content,
        category,
        author: author || currentUser?.name || 'Redacción El Designado',
        image_url: imageUrl,
        external_link: externalLink || null,
        is_featured: isFeatured,
        status: targetStatus,
      };

      if (editingId) {
        payload.id = editingId;
      }

      const res = await fetch('/api/noticias', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al guardar');

      setFeedback({
        text: editingId
          ? '¡Entrada actualizada con éxito!'
          : targetStatus === 'draft'
          ? '¡Borrador guardado exitosamente!'
          : '¡Entrada publicada en vivo y añadida al carrusel/noticias!',
        type: 'success',
      });

      fetchArticles();
      if (!editingId) resetEditor();
      setActiveTab('entradas');
    } catch (err: any) {
      setFeedback({ text: err.message, type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeletePost = async (id: number) => {
    if (!confirm('¿Estás seguro de que deseas eliminar esta entrada?')) return;

    try {
      const res = await fetch(`/api/noticias?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setFeedback({ text: 'Entrada eliminada correctamente.', type: 'success' });
        fetchArticles();
      } else {
        alert('Error al eliminar');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreatingUser(true);
    setFeedback(null);

    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newUserName,
          username: newUserUsername,
          password: newUserPassword,
          role: newUserRole,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al crear usuario');

      setFeedback({ text: `Usuario "${newUserName}" creado exitosamente.`, type: 'success' });
      setNewUserName('');
      setNewUserUsername('');
      setNewUserPassword('');
      fetchUsers();
    } catch (err: any) {
      setFeedback({ text: err.message, type: 'error' });
    } finally {
      setCreatingUser(false);
    }
  };

  const handleDeleteUser = async (id: number, name: string) => {
    if (!confirm(`¿Eliminar al redactor "${name}"? Ya no podrá entrar a redactar.`)) return;

    try {
      const res = await fetch(`/api/admin/users?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error');

      setFeedback({ text: 'Usuario eliminado.', type: 'success' });
      fetchUsers();
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Filtered articles
  const filteredArticles = articles.filter((item) => {
    const matchesStatus =
      statusFilter === 'all'
        ? true
        : statusFilter === 'published'
        ? item.status === 'published'
        : item.status === 'draft';

    const matchesSearch =
      searchQuery === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const countPublished = articles.filter((a) => a.status === 'published').length;
  const countDrafts = articles.filter((a) => a.status === 'draft').length;
  const countFeatured = articles.filter((a) => a.is_featured && a.status === 'published').length;
  const totalViews = articles.reduce((acc, curr) => acc + (curr.views || 0), 0);

  // -------------------------------------------------------------
  // LOGIN SCREEN
  // -------------------------------------------------------------
  if (!currentUser) {
    return (
      <main className="w-full bg-surface-container-lowest min-h-[100dvh] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-surface-container-low border border-surface-container-highest p-8 md:p-10 rounded-3xl shadow-2xl">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-primary text-on-primary font-black text-2xl flex items-center justify-center shadow-lg shadow-primary/30 mb-4">
              DH
            </div>
            <h1 className="font-display-md text-2xl text-primary font-bold tracking-tight">
              Panel Administrativo
            </h1>
            <p className="font-label-caps text-[11px] text-outline uppercase tracking-widest mt-1">
              El Designado • WordPress CMS
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-label-caps uppercase text-outline mb-1.5 font-bold">
                Usuario o Correo
              </label>
              <input
                type="text"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                placeholder="ej: admin, jguerra"
                required
                className="w-full p-3.5 bg-surface-container border border-surface-container-highest rounded-xl text-on-surface text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-label-caps uppercase text-outline mb-1.5 font-bold">
                Contraseña
              </label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full p-3.5 bg-surface-container border border-surface-container-highest rounded-xl text-on-surface text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            {loginError && (
              <div className="p-3 bg-error/10 border border-error/30 rounded-xl text-error text-xs font-medium">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-4 rounded-xl bg-primary text-on-primary font-label-caps uppercase text-xs font-bold tracking-widest hover:opacity-90 disabled:opacity-50 transition-all shadow-lg shadow-primary/20"
            >
              {isLoggingIn ? 'Verificando...' : 'Acceder al Escritorio'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-surface-container-highest text-center">
            <Link href="/" className="text-xs text-secondary hover:text-primary transition-colors">
              ← Volver al Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // -------------------------------------------------------------
  // WORDPRESS-STYLE DASHBOARD
  // -------------------------------------------------------------
  return (
    <div className="w-full min-h-[100dvh] bg-surface-container-lowest text-on-surface flex flex-col md:flex-row">
      {/* WORDPRESS SIDEBAR */}
      <aside className="w-full md:w-64 bg-surface-container-low border-r border-surface-container-highest flex flex-col justify-between shrink-0">
        <div>
          {/* Brand header */}
          <div className="p-6 border-b border-surface-container-highest flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary text-on-primary font-black text-lg flex items-center justify-center shadow-md">
              DH
            </div>
            <div>
              <span className="font-display-md text-base text-primary font-bold block leading-none">
                El Designado
              </span>
              <span className="font-label-caps text-[9px] text-outline uppercase tracking-widest">
                WordPress CMS
              </span>
            </div>
          </div>

          {/* User Profile Card */}
          <div className="p-4 mx-4 my-4 rounded-2xl bg-surface-container border border-surface-container-highest flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary/20 text-primary font-bold text-xs flex items-center justify-center shrink-0">
              {currentUser.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="truncate">
              <span className="text-xs font-bold text-on-surface block truncate">
                {currentUser.name}
              </span>
              <span className="text-[10px] uppercase font-label-caps tracking-wider px-2 py-0.5 rounded bg-primary/10 text-primary inline-block">
                {currentUser.role === 'admin' ? 'Administrador' : 'Redactor'}
              </span>
            </div>
          </div>

          {/* Sidebar Nav Items */}
          <nav className="p-3 space-y-1">
            <button
              onClick={() => setActiveTab('escritorio')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-label-caps uppercase tracking-wider transition-all ${
                activeTab === 'escritorio'
                  ? 'bg-primary text-on-primary font-bold shadow-md'
                  : 'text-secondary hover:text-primary hover:bg-surface-container'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">dashboard</span>
              Escritorio
            </button>

            <button
              onClick={() => setActiveTab('entradas')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-label-caps uppercase tracking-wider transition-all ${
                activeTab === 'entradas'
                  ? 'bg-primary text-on-primary font-bold shadow-md'
                  : 'text-secondary hover:text-primary hover:bg-surface-container'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[18px]">article</span>
                Entradas
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface-container-highest text-secondary font-bold">
                {articles.length}
              </span>
            </button>

            <button
              onClick={startNewPost}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-label-caps uppercase tracking-wider transition-all ${
                activeTab === 'editor' && !editingId
                  ? 'bg-primary text-on-primary font-bold shadow-md'
                  : 'text-secondary hover:text-primary hover:bg-surface-container'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              Añadir Entrada
            </button>

            <button
              onClick={() => setActiveTab('categorias')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-label-caps uppercase tracking-wider transition-all ${
                activeTab === 'categorias'
                  ? 'bg-primary text-on-primary font-bold shadow-md'
                  : 'text-secondary hover:text-primary hover:bg-surface-container'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[18px]">label</span>
                Categorías
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface-container-highest text-secondary font-bold">
                {categories.length}
              </span>
            </button>

            {currentUser.role === 'admin' && (
              <button
                onClick={() => setActiveTab('usuarios')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-label-caps uppercase tracking-wider transition-all ${
                  activeTab === 'usuarios'
                    ? 'bg-primary text-on-primary font-bold shadow-md'
                    : 'text-secondary hover:text-primary hover:bg-surface-container'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[18px]">group</span>
                  Redactores & Usuarios
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface-container-highest text-secondary font-bold">
                  {users.length}
                </span>
              </button>
            )}
          </nav>
        </div>

        {/* Bottom links */}
        <div className="p-4 border-t border-surface-container-highest space-y-2">
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl text-xs font-label-caps uppercase text-secondary hover:text-primary hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">home</span>
            Ver Home (Carrusel) ↗
          </Link>

          <Link
            href="/noticias"
            target="_blank"
            className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl text-xs font-label-caps uppercase text-secondary hover:text-primary hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">article</span>
            Ver Portal Noticias ↗
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl text-xs font-label-caps uppercase text-error hover:bg-error/10 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">logout</span>
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {/* Global Feedback notification */}
        {feedback && (
          <div
            className={`p-4 rounded-2xl mb-8 flex items-center justify-between shadow-lg ${
              feedback.type === 'success'
                ? 'bg-green-500/10 border border-green-500/30 text-green-400'
                : 'bg-error/10 border border-error/30 text-error'
            }`}
          >
            <span className="text-sm font-medium">{feedback.text}</span>
            <button onClick={() => setFeedback(null)} className="text-xs font-bold uppercase p-1">
              ✕
            </button>
          </div>
        )}

        {/* --------------------------------------------------------- */}
        {/* TAB 1: ESCRITORIO (DASHBOARD) */}
        {/* --------------------------------------------------------- */}
        {activeTab === 'escritorio' && (
          <div className="space-y-8 max-w-6xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-display-lg text-3xl md:text-4xl text-primary font-black uppercase">
                  Bienvenido, {currentUser.name} 👋
                </h1>
                <p className="text-secondary text-sm mt-1">
                  Control central del portal deportivo y del Carrusel de Portada en el Home.
                </p>
              </div>

              <button
                onClick={startNewPost}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-on-primary font-label-caps uppercase text-xs font-bold tracking-wider hover:opacity-90 shadow-lg shadow-primary/20"
              >
                <span className="material-symbols-outlined text-[18px]">edit_note</span>
                Redactar Nueva Entrada
              </button>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-3xl bg-surface-container-low border border-surface-container-highest shadow-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-label-caps text-xs text-outline uppercase tracking-wider">
                    En Carrusel Home
                  </span>
                  <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center material-symbols-outlined text-[18px]">
                    view_carousel
                  </span>
                </div>
                <div className="text-3xl font-black text-primary">{countFeatured}</div>
                <p className="text-[11px] text-secondary mt-1">Noticias en el carrusel de inicio</p>
              </div>

              <div className="p-6 rounded-3xl bg-surface-container-low border border-surface-container-highest shadow-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-label-caps text-xs text-outline uppercase tracking-wider">
                    Publicadas
                  </span>
                  <span className="w-8 h-8 rounded-full bg-green-500/10 text-green-400 flex items-center justify-center material-symbols-outlined text-[18px]">
                    check_circle
                  </span>
                </div>
                <div className="text-3xl font-black text-green-400">{countPublished}</div>
                <p className="text-[11px] text-secondary mt-1">Visibles en todo el portal</p>
              </div>

              <div className="p-6 rounded-3xl bg-surface-container-low border border-surface-container-highest shadow-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-label-caps text-xs text-outline uppercase tracking-wider">
                    Borradores
                  </span>
                  <span className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center material-symbols-outlined text-[18px]">
                    drafts
                  </span>
                </div>
                <div className="text-3xl font-black text-amber-400">{countDrafts}</div>
                <p className="text-[11px] text-secondary mt-1">Entradas privadas</p>
              </div>

              <div className="p-6 rounded-3xl bg-surface-container-low border border-surface-container-highest shadow-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-label-caps text-xs text-outline uppercase tracking-wider">
                    Categorías
                  </span>
                  <span className="w-8 h-8 rounded-full bg-sky-500/10 text-sky-400 flex items-center justify-center material-symbols-outlined text-[18px]">
                    label
                  </span>
                </div>
                <div className="text-3xl font-black text-sky-400">{categories.length}</div>
                <p className="text-[11px] text-secondary mt-1">Secciones configuradas</p>
              </div>
            </div>

            {/* Quick Actions & Recent articles */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 bg-surface-container-low border border-surface-container-highest p-6 md:p-8 rounded-3xl shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-headline-sm text-lg text-primary font-bold">
                    Entradas Recientes
                  </h3>
                  <button
                    onClick={() => setActiveTab('entradas')}
                    className="text-xs font-label-caps text-primary hover:underline uppercase"
                  >
                    Ver todas →
                  </button>
                </div>

                <div className="space-y-3">
                  {articles.slice(0, 5).map((art) => (
                    <div
                      key={art.id}
                      className="p-4 rounded-2xl bg-surface-container border border-surface-container-highest flex items-center justify-between gap-4"
                    >
                      <div className="truncate">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`text-[9px] uppercase px-2 py-0.5 rounded font-bold font-label-caps ${
                              art.status === 'published'
                                ? 'bg-green-500/10 text-green-400'
                                : 'bg-amber-500/10 text-amber-400'
                            }`}
                          >
                            {art.status === 'published' ? 'Publicada' : 'Borrador'}
                          </span>
                          {art.is_featured && (
                            <span className="text-[9px] uppercase px-2 py-0.5 rounded font-bold font-label-caps bg-yellow-500/20 text-yellow-300">
                              ★ En Carrusel Home
                            </span>
                          )}
                          <span className="text-[10px] text-outline font-label-caps">
                            {art.category} • {art.author}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-on-surface truncate">
                          {art.title}
                        </h4>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => startEditPost(art)}
                          className="px-3 py-1.5 rounded-lg bg-surface-container-highest hover:bg-primary hover:text-on-primary text-xs font-label-caps uppercase transition-colors"
                        >
                          Editar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 bg-surface-container-low border border-surface-container-highest p-6 md:p-8 rounded-3xl shadow-xl flex flex-col justify-between">
                <div>
                  <h3 className="font-headline-sm text-lg text-primary font-bold mb-3">
                    Carrusel del Home
                  </h3>
                  <p className="text-xs text-secondary leading-relaxed mb-4">
                    Todas las noticias que marques con la casilla <strong>"Destacar en Carrusel de Portada"</strong> aparecerán rotando en el Hero gigante de la página principal.
                  </p>
                  <Link
                    href="/"
                    target="_blank"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container text-xs font-label-caps uppercase text-primary hover:bg-surface-container-highest transition-colors border border-outline-variant/30"
                  >
                    <span>Comprobar Carrusel</span>
                    <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                  </Link>
                </div>

                <div className="pt-6 mt-6 border-t border-surface-container-highest">
                  <span className="text-[11px] text-outline block mb-2 font-label-caps uppercase">
                    Servidor & Base de Datos
                  </span>
                  <div className="flex items-center gap-2 text-xs text-green-400">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    Supabase PostgreSQL Activo
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --------------------------------------------------------- */}
        {/* TAB 2: TODAS LAS ENTRADAS (WORDPRESS LIST) */}
        {/* --------------------------------------------------------- */}
        {activeTab === 'entradas' && (
          <div className="space-y-6 max-w-6xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-container-highest">
              <div>
                <h1 className="font-display-lg text-3xl text-primary font-black uppercase">
                  Entradas
                </h1>
                <p className="text-secondary text-sm">
                  Gestiona todas las crónicas, notas de prensa y borradores.
                </p>
              </div>

              <button
                onClick={startNewPost}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary font-label-caps uppercase text-xs font-bold tracking-wider hover:opacity-90 shadow-lg shadow-primary/20"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
                Añadir Nueva
              </button>
            </div>

            {/* Filter Tabs & Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`px-4 py-2 rounded-xl text-xs font-label-caps uppercase font-bold transition-all ${
                    statusFilter === 'all'
                      ? 'bg-surface-container-highest text-primary'
                      : 'text-secondary hover:text-on-surface'
                  }`}
                >
                  Todas ({articles.length})
                </button>
                <button
                  onClick={() => setStatusFilter('published')}
                  className={`px-4 py-2 rounded-xl text-xs font-label-caps uppercase font-bold transition-all ${
                    statusFilter === 'published'
                      ? 'bg-green-500/20 text-green-400'
                      : 'text-secondary hover:text-on-surface'
                  }`}
                >
                  Publicadas ({countPublished})
                </button>
                <button
                  onClick={() => setStatusFilter('draft')}
                  className={`px-4 py-2 rounded-xl text-xs font-label-caps uppercase font-bold transition-all ${
                    statusFilter === 'draft'
                      ? 'bg-amber-500/20 text-amber-400'
                      : 'text-secondary hover:text-on-surface'
                  }`}
                >
                  Borradores ({countDrafts})
                </button>
              </div>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar entrada..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-64 pl-9 pr-4 py-2 bg-surface-container border border-surface-container-highest rounded-xl text-xs text-on-surface outline-none focus:border-primary"
                />
                <span className="material-symbols-outlined text-[16px] text-outline absolute left-2.5 top-2.5">
                  search
                </span>
              </div>
            </div>

            {/* Posts Table */}
            <div className="bg-surface-container-low border border-surface-container-highest rounded-3xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-surface-container-highest bg-surface-container text-outline font-label-caps uppercase tracking-wider">
                      <th className="p-4 font-bold">Título</th>
                      <th className="p-4 font-bold">Autor</th>
                      <th className="p-4 font-bold">Categoría</th>
                      <th className="p-4 font-bold">Carrusel Home</th>
                      <th className="p-4 font-bold">Estado</th>
                      <th className="p-4 font-bold text-center">Vistas</th>
                      <th className="p-4 font-bold text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container-highest">
                    {loadingArticles ? (
                      <tr>
                        <td colSpan={7} className="p-12 text-center text-secondary animate-pulse">
                          Cargando entradas desde la base de datos...
                        </td>
                      </tr>
                    ) : filteredArticles.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-12 text-center text-secondary">
                          No se encontraron entradas en este filtro.
                        </td>
                      </tr>
                    ) : (
                      filteredArticles.map((art) => (
                        <tr key={art.id} className="hover:bg-surface-container/50 transition-colors">
                          <td className="p-4 font-medium max-w-md">
                            <span
                              className="font-bold text-on-surface block text-sm mb-1 hover:text-primary transition-colors cursor-pointer"
                              onClick={() => startEditPost(art)}
                            >
                              {art.title}
                            </span>
                            <div className="flex items-center gap-2 text-[10px] text-outline font-label-caps">
                              <span>Slug: /{art.slug}</span>
                              {art.external_link && (
                                <span className="text-primary">🔗 Enlace externo</span>
                              )}
                            </div>
                          </td>
                          <td className="p-4 text-secondary whitespace-nowrap">{art.author}</td>
                          <td className="p-4 text-primary font-bold whitespace-nowrap">{art.category}</td>
                          <td className="p-4 whitespace-nowrap">
                            {art.is_featured ? (
                              <span className="px-2.5 py-1 rounded-full text-[10px] font-label-caps uppercase font-bold bg-yellow-500/15 text-yellow-300 border border-yellow-500/30">
                                ★ Activo en Home
                              </span>
                            ) : (
                              <span className="text-outline text-[11px]">—</span>
                            )}
                          </td>
                          <td className="p-4 whitespace-nowrap">
                            <span
                              className={`px-3 py-1 rounded-full text-[10px] font-label-caps uppercase font-bold inline-block ${
                                art.status === 'published'
                                  ? 'bg-green-500/15 text-green-400 border border-green-500/30'
                                  : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                              }`}
                            >
                              {art.status === 'published' ? 'Publicado' : 'Borrador'}
                            </span>
                          </td>
                          <td className="p-4 text-center font-bold text-secondary">{art.views || 0}</td>
                          <td className="p-4 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => startEditPost(art)}
                                className="px-3 py-1.5 rounded-lg bg-surface-container-highest hover:bg-primary hover:text-on-primary transition-colors font-bold uppercase text-[10px]"
                              >
                                Editar
                              </button>
                              {art.status === 'published' && (
                                <Link
                                  href={`/noticias/${art.slug}`}
                                  target="_blank"
                                  className="px-2.5 py-1.5 rounded-lg bg-surface-container text-secondary hover:text-primary transition-colors font-bold uppercase text-[10px]"
                                  title="Ver en vivo"
                                >
                                  ↗
                                </Link>
                              )}
                              <button
                                onClick={() => handleDeletePost(art.id)}
                                className="px-2.5 py-1.5 rounded-lg bg-error/10 text-error hover:bg-error/20 transition-colors font-bold uppercase text-[10px]"
                                title="Eliminar"
                              >
                                ✕
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* --------------------------------------------------------- */}
        {/* TAB 3: REDACTOR / EDITOR WORDPRESS */}
        {/* --------------------------------------------------------- */}
        {activeTab === 'editor' && (
          <div className="space-y-6 max-w-6xl">
            <div className="flex items-center justify-between pb-4 border-b border-surface-container-highest">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveTab('entradas')}
                  className="w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center text-secondary hover:text-primary"
                >
                  <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                </button>
                <div>
                  <h1 className="font-display-lg text-2xl md:text-3xl text-primary font-black uppercase">
                    {editingId ? 'Editar Entrada' : 'Añadir Nueva Entrada'}
                  </h1>
                  <p className="text-secondary text-xs">
                    {editingId ? `Editando entrada #${editingId}` : 'Crea un nuevo reportaje para el portal y el Home'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={resetEditor}
                  className="px-4 py-2 rounded-xl bg-surface-container text-xs font-label-caps uppercase text-secondary hover:text-primary transition-colors"
                >
                  Limpiar Formulario
                </button>
              </div>
            </div>

            <form onSubmit={handleSavePost}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Content Fields (Left) */}
                <div className="lg:col-span-8 space-y-6">
                  {/* Title */}
                  <div className="bg-surface-container-low border border-surface-container-highest p-6 rounded-3xl shadow-xl">
                    <label className="block text-xs font-label-caps uppercase text-outline mb-2 font-bold">
                      Título de la Entrada *
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Añade el título periodístico aquí..."
                      required
                      className="w-full p-4 bg-surface-container border border-surface-container-highest rounded-2xl text-on-surface text-lg sm:text-xl font-bold outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  {/* Subtitle / Bajante */}
                  <div className="bg-surface-container-low border border-surface-container-highest p-6 rounded-3xl shadow-xl">
                    <label className="block text-xs font-label-caps uppercase text-outline mb-2 font-bold">
                      Bajante / Subtítulo
                    </label>
                    <input
                      type="text"
                      value={subtitle}
                      onChange={(e) => setSubtitle(e.target.value)}
                      placeholder="Resumen o bajante que aparece en la portada..."
                      className="w-full p-3.5 bg-surface-container border border-surface-container-highest rounded-2xl text-on-surface text-sm outline-none focus:border-primary"
                    />
                  </div>

                  {/* Content Area */}
                  <div className="bg-surface-container-low border border-surface-container-highest p-6 rounded-3xl shadow-xl">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-label-caps uppercase text-outline font-bold">
                        Cuerpo del Reportaje *
                      </label>
                      <span className="text-[11px] text-outline">
                        💡 Separa los párrafos usando doble salto de línea (Enter)
                      </span>
                    </div>
                    <textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      rows={14}
                      placeholder="Escribe la crónica o reportaje completo aquí..."
                      required
                      className="w-full p-4 bg-surface-container border border-surface-container-highest rounded-2xl text-on-surface text-sm font-sans leading-relaxed outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  {/* External Link / Custom Button Link */}
                  <div className="bg-surface-container-low border border-surface-container-highest p-6 rounded-3xl shadow-xl">
                    <label className="block text-xs font-label-caps uppercase text-outline mb-2 font-bold">
                      Enlace Adicional / Botón Personalizado (Opcional)
                    </label>
                    <input
                      type="url"
                      value={externalLink}
                      onChange={(e) => setExternalLink(e.target.value)}
                      placeholder="https://... (ej: video en YouTube, transmisión de radio o enlace externo)"
                      className="w-full p-3.5 bg-surface-container border border-surface-container-highest rounded-2xl text-on-surface text-sm outline-none focus:border-primary"
                    />
                    <span className="text-[11px] text-outline mt-1 block">
                      Si lo dejas vacío, el botón en el carrusel abrirá automáticamente el reportaje dentro de la web.
                    </span>
                  </div>
                </div>

                {/* Publishing Sidebar Controls (Right) */}
                <div className="lg:col-span-4 space-y-6">
                  {/* Publicar Box */}
                  <div className="bg-surface-container-low border border-surface-container-highest p-6 rounded-3xl shadow-xl space-y-4">
                    <h3 className="font-headline-sm text-base text-primary font-bold pb-3 border-b border-surface-container-highest flex items-center justify-between">
                      <span>Publicación</span>
                      <span className="material-symbols-outlined text-primary text-[18px]">publish</span>
                    </h3>

                    <div>
                      <label className="block text-xs font-label-caps uppercase text-outline mb-1 font-bold">
                        Estado
                      </label>
                      <select
                        value={postStatus}
                        onChange={(e: any) => setPostStatus(e.target.value)}
                        className="w-full p-3 bg-surface-container border border-surface-container-highest rounded-xl text-on-surface text-xs outline-none focus:border-primary font-bold cursor-pointer"
                      >
                        <option value="published">🟢 Publicado (Visible en web)</option>
                        <option value="draft">🟡 Borrador (Privado / En redacción)</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-surface-container rounded-xl border border-primary/30 shadow-inner">
                      <input
                        type="checkbox"
                        id="featuredPost"
                        checked={isFeatured}
                        onChange={(e) => setIsFeatured(e.target.checked)}
                        className="w-4 h-4 accent-primary rounded cursor-pointer"
                      />
                      <label htmlFor="featuredPost" className="text-xs text-on-surface cursor-pointer select-none">
                        <span className="font-bold text-primary block">
                          ★ Mostrar en Carrusel del Home
                        </span>
                        <span className="text-[10px] text-outline">
                          Aparece en el banner gigante rotativo de inicio
                        </span>
                      </label>
                    </div>

                    <div className="pt-2 space-y-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        onClick={() => setPostStatus('published')}
                        className="w-full py-3.5 rounded-xl bg-primary text-on-primary font-label-caps uppercase text-xs font-bold tracking-widest hover:opacity-90 disabled:opacity-50 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                      >
                        <span className="material-symbols-outlined text-[16px]">check_circle</span>
                        {editingId ? 'Actualizar Entrada' : 'Publicar Ahora'}
                      </button>

                      <button
                        type="button"
                        disabled={isSubmitting}
                        onClick={(e) => handleSavePost(e, 'draft')}
                        className="w-full py-3 rounded-xl bg-surface-container text-amber-400 border border-amber-500/30 font-label-caps uppercase text-xs font-bold tracking-wider hover:bg-amber-500/10 transition-colors"
                      >
                        Guardar como Borrador
                      </button>
                    </div>
                  </div>

                  {/* Taxonomy & Metadata */}
                  <div className="bg-surface-container-low border border-surface-container-highest p-6 rounded-3xl shadow-xl space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-surface-container-highest">
                      <h3 className="font-headline-sm text-base text-primary font-bold">
                        Categoría
                      </h3>
                      <button
                        type="button"
                        onClick={() => setActiveTab('categorias')}
                        className="text-[10px] font-label-caps uppercase text-primary hover:underline"
                      >
                        + Crear nueva
                      </button>
                    </div>

                    <div>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full p-3 bg-surface-container border border-surface-container-highest rounded-xl text-on-surface text-xs outline-none focus:border-primary cursor-pointer font-bold"
                      >
                        {categories.map((c) => (
                          <option key={c.id} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-label-caps uppercase text-outline mb-1 font-bold">
                        Firma / Autor
                      </label>
                      <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="ej: Jesús Guerra"
                        className="w-full p-3 bg-surface-container border border-surface-container-highest rounded-xl text-on-surface text-xs outline-none focus:border-primary"
                      />
                    </div>

                    {/* Image Upload Feature (Like WordPress Media) */}
                    <div>
                      <label className="block text-xs font-label-caps uppercase text-outline mb-1 font-bold">
                        Imagen Destacada
                      </label>

                      {/* File upload button */}
                      <div className="mb-3">
                        <label className="w-full flex items-center justify-center gap-2 p-3 bg-surface-container hover:bg-surface-container-highest border border-dashed border-primary/50 rounded-xl cursor-pointer transition-colors text-primary font-label-caps uppercase text-xs font-bold">
                          <span className="material-symbols-outlined text-[18px]">
                            {isUploadingImage ? 'sync' : 'upload_file'}
                          </span>
                          <span>
                            {isUploadingImage ? 'Subiendo foto a Supabase...' : '📁 Subir foto desde mi PC'}
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            disabled={isUploadingImage}
                            className="hidden"
                          />
                        </label>
                      </div>

                      {/* Or paste URL */}
                      <input
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="https://... o /api/uploads/..."
                        required
                        className="w-full p-3 bg-surface-container border border-surface-container-highest rounded-xl text-on-surface text-xs outline-none focus:border-primary mb-2"
                      />

                      {/* Quick local images */}
                      <div className="space-y-1">
                        <span className="text-[10px] text-outline block font-label-caps uppercase">
                          O elegir foto ya guardada:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {predefinedImages.map((img) => (
                            <button
                              key={img.url}
                              type="button"
                              onClick={() => setImageUrl(img.url)}
                              className={`px-2 py-1 text-[9px] rounded-lg border transition-colors ${
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
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* --------------------------------------------------------- */}
        {/* TAB 4: CATEGORÍAS */}
        {/* --------------------------------------------------------- */}
        {activeTab === 'categorias' && (
          <div className="space-y-8 max-w-5xl">
            <div className="pb-4 border-b border-surface-container-highest">
              <h1 className="font-display-lg text-3xl text-primary font-black uppercase">
                Categorías de Noticias
              </h1>
              <p className="text-secondary text-sm">
                Crea nuevas secciones para clasificar las notas (ej: LVBP, MLB, Entrevistas, Fichajes).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Form to add category */}
              <div className="md:col-span-5 bg-surface-container-low border border-surface-container-highest p-6 rounded-3xl shadow-xl">
                <h3 className="font-headline-sm text-base text-primary font-bold mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">add_circle</span>
                  Añadir Nueva Categoría
                </h3>

                <form onSubmit={handleCreateCategory} className="space-y-4">
                  <div>
                    <label className="block text-xs font-label-caps uppercase text-outline mb-1 font-bold">
                      Nombre de la Categoría *
                    </label>
                    <input
                      type="text"
                      placeholder="ej: Entrevistas Exclusivas"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      required
                      className="w-full p-3.5 bg-surface-container border border-surface-container-highest rounded-xl text-on-surface text-xs outline-none focus:border-primary"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={creatingCategory}
                    className="w-full py-3.5 rounded-xl bg-primary text-on-primary font-label-caps uppercase text-xs font-bold tracking-wider hover:opacity-90 disabled:opacity-50 transition-all shadow-md shadow-primary/20"
                  >
                    {creatingCategory ? 'Guardando...' : 'Crear Categoría'}
                  </button>
                </form>
              </div>

              {/* Categories list */}
              <div className="md:col-span-7 bg-surface-container-low border border-surface-container-highest p-6 rounded-3xl shadow-xl">
                <h3 className="font-headline-sm text-base text-primary font-bold mb-4">
                  Categorías Disponibles ({categories.length})
                </h3>

                <div className="space-y-2">
                  {categories.map((c) => (
                    <div
                      key={c.id}
                      className="p-3.5 rounded-xl bg-surface-container border border-surface-container-highest flex items-center justify-between"
                    >
                      <div>
                        <span className="text-sm font-bold text-on-surface block">{c.name}</span>
                        <span className="text-[10px] text-outline font-label-caps">Slug: {c.slug}</span>
                      </div>

                      {c.name !== 'LVBP' && c.name !== 'Grandes Ligas (MLB)' && (
                        <button
                          onClick={() => handleDeleteCategory(c.id, c.name)}
                          className="px-2.5 py-1 rounded-lg bg-error/10 text-error hover:bg-error/20 text-xs font-label-caps uppercase transition-colors"
                        >
                          Eliminar
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --------------------------------------------------------- */}
        {/* TAB 5: USUARIOS Y REDACTORES (ADMIN ONLY) */}
        {/* --------------------------------------------------------- */}
        {activeTab === 'usuarios' && currentUser.role === 'admin' && (
          <div className="space-y-8 max-w-6xl">
            <div className="pb-4 border-b border-surface-container-highest">
              <h1 className="font-display-lg text-3xl text-primary font-black uppercase">
                Redactores & Usuarios
              </h1>
              <p className="text-secondary text-sm">
                Crea cuentas para tu equipo de trabajo para que puedan redactar reportajes junto a ti.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Create User Form */}
              <div className="lg:col-span-5 bg-surface-container-low border border-surface-container-highest p-6 md:p-8 rounded-3xl shadow-xl">
                <h3 className="font-headline-sm text-lg text-primary font-bold mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">person_add</span>
                  Añadir Nuevo Redactor
                </h3>

                <form onSubmit={handleCreateUser} className="space-y-4">
                  <div>
                    <label className="block text-xs font-label-caps uppercase text-outline mb-1 font-bold">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      placeholder="ej: Leonardo Carmona"
                      value={newUserName}
                      onChange={(e) => setNewUserName(e.target.value)}
                      required
                      className="w-full p-3 bg-surface-container border border-surface-container-highest rounded-xl text-on-surface text-xs outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-label-caps uppercase text-outline mb-1 font-bold">
                      Nombre de Usuario (Para Iniciar Sesión) *
                    </label>
                    <input
                      type="text"
                      placeholder="ej: lcarmona"
                      value={newUserUsername}
                      onChange={(e) => setNewUserUsername(e.target.value)}
                      required
                      className="w-full p-3 bg-surface-container border border-surface-container-highest rounded-xl text-on-surface text-xs outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-label-caps uppercase text-outline mb-1 font-bold">
                      Contraseña *
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={newUserPassword}
                      onChange={(e) => setNewUserPassword(e.target.value)}
                      required
                      className="w-full p-3 bg-surface-container border border-surface-container-highest rounded-xl text-on-surface text-xs outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-label-caps uppercase text-outline mb-1 font-bold">
                      Rol de Permisos
                    </label>
                    <select
                      value={newUserRole}
                      onChange={(e: any) => setNewUserRole(e.target.value)}
                      className="w-full p-3 bg-surface-container border border-surface-container-highest rounded-xl text-on-surface text-xs outline-none focus:border-primary cursor-pointer font-bold"
                    >
                      <option value="redactor">Redactor (Puede crear y editar entradas)</option>
                      <option value="admin">Administrador (Control total y usuarios)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={creatingUser}
                    className="w-full py-3.5 rounded-xl bg-primary text-on-primary font-label-caps uppercase text-xs font-bold tracking-wider hover:opacity-90 disabled:opacity-50 transition-all shadow-md shadow-primary/20"
                  >
                    {creatingUser ? 'Creando...' : 'Crear Usuario'}
                  </button>
                </form>
              </div>

              {/* Users List */}
              <div className="lg:col-span-7 bg-surface-container-low border border-surface-container-highest p-6 md:p-8 rounded-3xl shadow-xl">
                <h3 className="font-headline-sm text-lg text-primary font-bold mb-4 flex items-center justify-between">
                  <span>Equipo Registrado ({users.length})</span>
                  <button
                    onClick={fetchUsers}
                    className="text-xs text-secondary hover:text-primary font-label-caps uppercase flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[14px]">refresh</span>
                    Actualizar
                  </button>
                </h3>

                <div className="space-y-3">
                  {loadingUsers ? (
                    <div className="p-8 text-center text-secondary text-xs animate-pulse">
                      Cargando lista de redactores...
                    </div>
                  ) : users.length === 0 ? (
                    <div className="p-8 text-center text-secondary text-xs">
                      No hay usuarios registrados.
                    </div>
                  ) : (
                    users.map((usr) => (
                      <div
                        key={usr.id}
                        className="p-4 rounded-2xl bg-surface-container border border-surface-container-highest flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/20 text-primary font-bold text-xs flex items-center justify-center">
                            {usr.name.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <span className="text-sm font-bold text-on-surface block">
                              {usr.name}
                            </span>
                            <span className="text-[11px] text-outline font-label-caps">
                              @{usr.username} • {usr.role === 'admin' ? 'Administrador' : 'Redactor'}
                            </span>
                          </div>
                        </div>

                        {usr.username !== 'admin' && usr.id !== currentUser.id && (
                          <button
                            onClick={() => handleDeleteUser(usr.id, usr.name)}
                            className="px-3 py-1.5 rounded-lg bg-error/10 text-error hover:bg-error/20 text-xs font-label-caps uppercase transition-colors"
                          >
                            Eliminar
                          </button>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
