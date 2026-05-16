import { authJwt } from "../middleware/index.js";
import { allAccess, userBoard, adminBoard, moderatorBoard } from "../controllers/user.controller.js";

export default function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", allAccess); // Pública

  app.get("/api/test/user", [authJwt.verifyToken], userBoard); // Requiere token

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    moderatorBoard // Requiere token + rol moderador
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    adminBoard // Requiere token + rol admin
  );
};