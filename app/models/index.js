import Sequelize from "sequelize";
import dotenv from "dotenv";
dotenv.config();

import { UserModel } from "./user.model.js";
import { RoleModel } from "./role.model.js";

// Conexión directa a la nube usando process.env
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Inicializamos los modelos
db.user = UserModel(sequelize, Sequelize);
db.role = RoleModel(sequelize, Sequelize);

// Definimos la relación Muchos a Muchos
db.role.belongsToMany(db.user, {
  through: "user_roles"
});
db.user.belongsToMany(db.role, {
  through: "user_roles"
});

// Lista de roles permitidos
db.ROLES = ["user", "admin", "moderator"];

export default db;