import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      // Validamos los roles para mostrar u ocultar botones
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <div>
      {/* Barra de Navegación */}
      <nav className="navbar navbar-expand navbar-dark bg-dark px-4">
        <Link to={"/"} className="navbar-brand fw-bold">
          Lab07 Seguridad
        </Link>
        <div className="navbar-nav me-auto">
          {/* Aparece mágicamente si es Moderador */}
          {showModeratorBoard && (
            <li className="nav-item">
              <span className="nav-link text-warning fw-bold">Panel Moderador</span>
            </li>
          )}

          {/* Aparece mágicamente si es Admin */}
          {showAdminBoard && (
            <li className="nav-item">
              <span className="nav-link text-danger fw-bold">Panel Admin</span>
            </li>
          )}
        </div>

        {/* Si el usuario está logueado, mostramos su nombre y botón de salir */}
        {currentUser ? (
          <div className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link text-light">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link text-danger" onClick={logOut}>
                Cerrar Sesión
              </a>
            </li>
          </div>
        ) : (
          /* Si NO está logueado, mostramos Login y Registro */
          <div className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Iniciar Sesión
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Registrarse
              </Link>
            </li>
          </div>
        )}
      </nav>

      {/* Aquí es donde se dibujan las pantallas según la URL */}
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;