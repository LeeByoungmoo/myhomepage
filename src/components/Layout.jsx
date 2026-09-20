import { Outlet, Link } from 'react-router-dom';
import { BookOpen, Gamepad2, Menu } from 'lucide-react';
import { useState } from 'react';

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="app-container">
      <header className="glass-panel" style={{ margin: '1rem', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '800', fontSize: '1.25rem' }}>
          <span className="text-gradient">NEXUS</span>
        </Link>
        
        <nav style={{ display: 'flex', gap: '2rem' }} className="desktop-nav">
          <Link to="/novels" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BookOpen size={18} /> Novels
          </Link>
          <Link to="/games" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Gamepad2 size={18} /> Games
          </Link>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
        <p>© {new Date().getFullYear()} NEXUS. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
