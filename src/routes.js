import { Router } from "express";
import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import authMiddleware from './app/middlewares/auth';
import permit from "./app/middlewares/permission";
import roles from "./config/roles"

const routes = new Router();


// Rotas publicas
routes.post("/session", SessionController.store);
routes.post("/users", UserController.store);


// Rotas para todos os usuários logados
routes.use(authMiddleware);
routes.put("/users/:uid", UserController.update);
routes.get("/users/:uid", UserController.view);

// Rotas somente para usuários administradores
routes.use(permit(roles.ADMIN));
routes.get("/users", UserController.index);

export default routes;
