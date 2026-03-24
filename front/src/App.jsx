import { Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import Standings from './pages/Standings';
import Rules from './pages/Rules';
import About from './pages/About';
import Registration from './pages/Registration';

function App() {
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink to="/" className="nav-brand">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5Z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/></svg>
            Copa Takeuchi
          </NavLink>
          <ul className="nav-links">
            <li><NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Inicio</NavLink></li>
            <li><NavLink to="/standings" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Clasificación</NavLink></li>
            <li><NavLink to="/rules" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Reglas</NavLink></li>
            <li><NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Acerca de</NavLink></li>
            <li><NavLink to="/registration" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Registro</NavLink></li>
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
