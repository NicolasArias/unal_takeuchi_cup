import { useState } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import Standings from './pages/Standings';
import Rules from './pages/Rules';
import About from './pages/About';
import Registration from './pages/Registration';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <div className="scanlines"></div>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink to="/" className="nav-brand" onClick={closeMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5Z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/></svg>
            Copa Takeuchi
          </NavLink>
          <button
            type="button"
            className={`nav-toggle ${isMenuOpen ? 'is-open' : ''}`}
            aria-expanded={isMenuOpen}
            aria-controls="primary-navigation"
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <ul id="primary-navigation" className={`nav-links ${isMenuOpen ? 'is-open' : ''}`}>
            <li><NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>Inicio</NavLink></li>
            <li><NavLink to="/standings" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>Clasificación</NavLink></li>
            <li><NavLink to="/rules" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>Reglas</NavLink></li>
            <li><NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>Acerca de</NavLink></li>
            <li><NavLink to="/registration" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>Registro</NavLink></li>
          </ul>
        </div>
      </nav>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/standings" element={<Standings />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/about" element={<About />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
      </main>

      <footer>
        <p>&copy; 2026 Copa Takeuchi UNAL.</p>
      </footer>
    </>
  );
}

export default App;
