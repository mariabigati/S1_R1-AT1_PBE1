import { Router } from "express";
import categoriaRoutes from "./categoria.routes.js";
import produtoRoutes from "./produto.routes.js";
const Routes = Router();

Routes.use('/', categoriaRoutes);
Routes.use('/', produtoRoutes);


export default Routes;