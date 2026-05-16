import { useState } from "react";
import AuthService from "../services/auth.service";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);

    // Validación del Front-end
    if (!username || !email || !password) {
      setMessage("Todos los campos son obligatorios.");
      return;
    }

    try {
      const response = await AuthService.register(username, email, password);
      setMessage(response.data.message);
      setSuccessful(true);
    } catch (error) {
      const resMessage = error.response?.data?.message || "Error al registrarse";
      setMessage(resMessage);
      setSuccessful(false);
    }
  };

  return (
    <div className="col-md-12 mt-5">
      <div className="card p-4 mx-auto shadow" style={{ maxWidth: "400px" }}>
        <h3 className="text-center mb-4">Registrarse</h3>
        <form onSubmit={handleRegister}>
          {!successful && (
            <>
              <div className="form-group mb-3">
                <label>Usuario</label>
                <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div className="form-group mb-3">
                <label>Email</label>
                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="form-group mb-3">
                <label>Contraseña</label>
                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <button className="btn btn-success w-100 mt-2">Registrar</button>
            </>
          )}
          {message && (
            <div className={`alert ${successful ? "alert-success" : "alert-danger"} mt-3`} role="alert">
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;