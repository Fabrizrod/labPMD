import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    // Validación del Front-end 
    if (!username || !password) {
      setMessage("Por favor, completa todos los campos.");
      return;
    }

    try {
      await AuthService.login(username, password);
      navigate("/profile"); 
      window.location.reload();
    } catch (error) {
      const resMessage = error.response?.data?.message || "Error al iniciar sesión";
      setMessage(resMessage);
    }
  };

  return (
    <div className="col-md-12 mt-5">
      <div className="card p-4 mx-auto shadow" style={{ maxWidth: "400px" }}>
        <h3 className="text-center mb-4">Iniciar Sesión</h3>
        <form onSubmit={handleLogin}>
          <div className="form-group mb-3">
            <label>Usuario</label>
            <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="form-group mb-3">
            <label>Contraseña</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button className="btn btn-primary w-100 mt-2">Entrar</button>
          
          {message && (
            <div className="alert alert-danger mt-3" role="alert">{message}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;