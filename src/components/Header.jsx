import { NavLink } from 'react-router-dom';

function Header() {
  const getLinkClass = ({ isActive }) => `nav-link ${isActive ? `active` : ``}`;

  return (
    <div className="container">
      <header className="d-flex justify-content-center py-3">
        <ul className="nav nav-pills gap-2">
          <li className="nav-item">
            <NavLink to="/" className={getLinkClass} aria-current="page">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/favorites" className={getLinkClass}>
              Preferiti
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/compare" className={getLinkClass}>
              Confronta
            </NavLink>
          </li>
        </ul>
      </header>
    </div>
  );
}

export default Header;
