import { Router } from "express";
import produtoController from "../controllers/produto.controller.js";
import uploadImage from "../middlewares/uploadImage.middleware.js";
const produtoRoutes = Router();

produtoRoutes.get('/produtos', produtoController.selectProd);
produtoRoutes.post('/produtos', uploadImage, produtoController.insertProd);
produtoRoutes.put('/produtos', uploadImage, produtoController.updateProd);
produtoRoutes.delete('/produtos', produtoController.deleteProd);

export default produtoRoutes;