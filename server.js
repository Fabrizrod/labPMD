import express from "express";
import cors from "cors";
import db from "./app/models/index.js";
import authRoutes from "./app/routes/auth.routes.js";
import userRoutes from "./app/routes/user.routes.js";

const app = express();

const corsOptions = {
  origin: "http://localhost:5173"
};

app.use(cors(corsOptions));
// Permite procesar datos en formato JSON
app.use(express.json());
// Permite procesar datos de formularios
app.use(express.urlencoded({ extended: true }));

// Sincronizar la base de datos (crea las tablas si no existen)
db.sequelize.sync().then(() => {
  console.log('✅ Base de datos sincronizada correctamente.');
});

// Ruta de bienvenida de prueba
app.get("/", (req, res) => {
  res.json({ message: "Bienvenido a la API segura con JWT." });
});

// Inicializamos las rutas
authRoutes(app);
userRoutes(app);

// Asignar el puerto y escuchar peticiones
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`El servidor está corriendo en http://localhost:${PORT}`);
});