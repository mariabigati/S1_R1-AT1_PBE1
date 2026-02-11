import { Router } from "express";
import categoriaController from "../controllers/categoria.controller.js";

const categoriaRoutes = Router();
categoriaRoutes.get('/categorias', categoriaController.selectCateg);
categoriaRoutes.post('/categorias', categoriaController.insertCateg);
categoriaRoutes.put('/categorias', categoriaController.updateCateg);
categoriaRoutes.delete('/categorias', categoriaController.deleteCateg);
export default categoriaRoutes;