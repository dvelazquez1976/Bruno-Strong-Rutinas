import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Dumbbell, History, TrendingUp, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Layout() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  async function handleLogout() {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  }

  const closeSidebar = () => setSidebarOpen(false);

  const initial = currentUser?.displayName?.charAt(0)?.toUpperCase()
    || currentUser?.email?.charAt(0)?.toUpperCase()
    || '?';

  return (
    <div className="app-layout">
      {/* Mobile header */}
      <div className="mobile-header">
        <button className="btn-icon" style={{ border: 'none' }} onClick={() => setSidebarOpen(true)}>
          <Menu size={20} />
        </button>
        <span className="font-semibold" style={{ color: 'var(--primary)' }}>Bruno Strong</span>
        <div style={{ width: 36 }} />
      </div>

      {/* Overlay */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`}
        onClick={closeSidebar}
      />

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <Dumbbell size={24} />
          Bruno Strong
          <button
            className="btn-icon"
            style={{ marginLeft: 'auto', display: sidebarOpen ? 'flex' : 'none', border: 'none' }}
            onClick={closeSidebar}
          >
            <X size={18} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={closeSidebar}
          >
            <Dumbbell size={18} /> Entrenamiento
          </NavLink>
          <NavLink
            to="/history"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={closeSidebar}
          >
            <History size={18} /> Historial
          </NavLink>
          <NavLink
            to="/progress"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={closeSidebar}
          >
            <TrendingUp size={18} /> Progreso
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">{initial}</div>
            <div>
              <div className="user-name">{currentUser?.displayName || 'Usuario'}</div>
              <div className="user-email">{currentUser?.email}</div>
            </div>
          </div>
          <button className="nav-link" onClick={handleLogout} style={{ marginTop: '8px' }}>
            <LogOut size={18} /> Cerrar sesion
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
