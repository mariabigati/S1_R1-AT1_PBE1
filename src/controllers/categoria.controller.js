import categoriaModel from "../models/categoria.model.js";
import produtoModel from "../models/produto.model.js";

const categoriaController = {
  insertCateg: async (req, res) => {
    try {
      const { descricaoCategoria } = req.query;
      const result = await categoriaModel.insertCateg(descricaoCategoria);
      console.log(result);
      res
        .status(201)
        .json({ message: "Categoria inserida com sucesso!", data: result });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Ocorreu um erro no servidor.",
        errorMessage: error.message,
      });
    }
  },
  selectCateg: async (req, res) => {
    try {
      const { idCategoria } = req.query;

      if (!idCategoria) {
        const categorias = await categoriaModel.selectAllCateg();
        if (categorias.length == 0) {
          return res.status(200).json({
            message: "Nenhum registro encontrado! Cadastre categorias.",
          });
        }
        return res.status(200).json({ message: categorias });
      } else {
        const categorias = await categoriaModel.selectOneCateg(idCategoria);
        if (categorias.length == 0) {
          return res.status(200).json({
            message: "Nenhum registro encontrado com esse ID!",
          });
        }
        return res.status(200).json({ message: categorias });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Ocorreu um erro no servidor.",
        errorMessage: error.message,
      });
    }
  },

  updateCateg: async (req, res) => {
    try {
      const { descricaoCategoria, idCategoria } = req.query;
      const verifCateg = await categoriaModel.selectOneCateg(idCategoria);

      if (!idCategoria || !descricaoCategoria) {
        return res.status(200).json({
          message: "Informações faltantes!",
        });
      }

      if (!isNaN(descricaoCategoria) || descricaoCategoria.length < 3) {
        return res.status(200).json({
          message: "Por favor, insira uma descrição maior que três caracteres!",
        });
      }
      if (verifCateg.length == 0) {
        return res.status(200).json({
          message: "Não foi encontrado nenhum registro com esse ID.",
        });
      }
      const result = await categoriaModel.updateCateg(
        descricaoCategoria,
        idCategoria,
      );

      console.log(result);

      return res.status(200).json({
        message: "Categoria alterada com sucesso!",
        data: result,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Ocorreu um erro no servidor.",
        errorMessage: error.message,
      });
    }
  },

  deleteCateg: async (req, res) => {
    try {
      const { idCategoria } = req.query;
      const verifProdutos = await produtoModel.selectProdCateg(idCategoria);

      if (verifProdutos.length > 0) {
        res
          .status(200)
          .json({
            message:
              "Não é possível deletar essa categoria, pois ela possui produtos cadastrados!",
          });
      }

      if (!idCategoria) {
        res.status(200).json({ message: "Dados enviados inválidos!" });
      }

      const result = await categoriaModel.deleteCateg(idCategoria);
      console.log(result);

      res
        .status(200)
        .json({ message: "Categoria deletada com sucesso!", data: result });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Ocorreu um erro no servidor.",
        errorMessage: error.message,
      });
    }
  }
};

export default categoriaController;
