import dbConfig from "../config/db.config.js";
import Sequelize from "sequelize";
import { UserModel } from "./user.model.js";
import { RoleModel } from "./role.model.js";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

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