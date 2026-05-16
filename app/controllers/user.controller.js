export const allAccess = (req, res) => {
  res.status(200).send("Contenido Público. Todos pueden ver esto.");
};

export const userBoard = (req, res) => {
  res.status(200).send("Contenido para Usuarios (User).");
};

export const adminBoard = (req, res) => {
  res.status(200).send("Panel de Administrador (Admin).");
};

export const moderatorBoard = (req, res) => {
  res.status(200).send("Panel de Moderador (Moderator).");
};