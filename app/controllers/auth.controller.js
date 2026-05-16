import db from "../models/index.js";
import config from "../config/auth.config.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

export const signup = async (req, res) => {
  try {
    // 1. Crear el usuario en la base de datos
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8)
    });

    // 2. Asignarle sus roles
    if (req.body.roles) {
      const roles = await Role.findAll({
        where: {
          name: {
            [Op.or]: req.body.roles
          }
        }
      });
      await user.setRoles(roles);
      res.send({ message: "¡Usuario registrado exitosamente!" });
    } else {
      // Si no envía rol, le asignamos el rol de 'user' por defecto (id: 1)
      await user.setRoles([1]);
      res.send({ message: "¡Usuario registrado exitosamente!" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { username: req.body.username }
    });

    if (!user) {
      return res.status(404).send({ message: "Usuario no encontrado." });
    }

    // Comparamos contraseñas
    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({ accessToken: null, message: "¡Contraseña incorrecta!" });
    }

    // Creamos el Token JWT (Dura 24 horas = 86400 segundos)
    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400 
    });

    // Obtenemos los roles del usuario para enviarlos en la respuesta
    const roles = await user.getRoles();
    const authorities = [];
    for (let i = 0; i < roles.length; i++) {
      authorities.push("ROLE_" + roles[i].name.toUpperCase());
    }

    res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      roles: authorities,
      accessToken: token
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};