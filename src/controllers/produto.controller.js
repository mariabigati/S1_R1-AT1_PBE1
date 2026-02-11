import produtoModel from "../models/produto.model.js";
const produtoController = {
  insertProduto: async (req, res) => {
    try {
      if (!req.file) {
        return res
          .status(400)
          .json({
            message:
              "Arquivo não enviado! É necessário enviar a imagem do produto!",
          });
      }
      const { idCategoria, nome, preco } = req.body;
      const result = await produtoModel.insert(
        idCategoria,
        nome,
        preco,
        req.file.filename,
      );
      console.log(result);
      res.status(201).json({
        message: "Produto inserido com sucesso!",
        data: result,
        file: {
          filename: req.file.filename,
          size: req.file.size,
          mimetype: req.file.mimetype,
        },
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({
          message: "Ocorreu um erro no servidor.",
          errorMessage: error.message,
        });
    }
  },

  selectProd: async (req, res) => {
    try {
      const { idProduto } = req.query;

      if (!idProduto) {
        const produtos = await produtoModel.selectAll();
        if (produtos.length == 0) {
          return res.status(200).json({
            message: "Nenhum registro encontrado! Cadastre novos produtos.",
          });
        }
        return res.status(200).json({ message: produtos });
      } else {
        const produtos = await produtoModel.selectOne(idProduto);
        if (produtos.length == 0) {
          return res.status(200).json({
            message: "Nenhum registro encontrado com esse ID!",
          });
        }
        return res.status(200).json({ message: produtos });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Ocorreu um erro no servidor.",
        errorMessage: error.message,
      });
    }
  },
};

export default produtoController;
