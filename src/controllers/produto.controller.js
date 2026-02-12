import produtoModel from "../models/produto.model.js";
import path from "path";
import fs from "fs";
import categoriaModel from "../models/categoria.model.js";

const produtoController = {
  insertProduto: async (req, res) => {
    try {
      const { idCategoria, nome, preco } = req.body;

      const verifCateg = await categoriaModel.selectOneCateg(idCategoria);

      if (verifCateg.length == 0) {
        const caminhoImg = path.resolve(
          process.cwd(),
          "uploads/images",
          req.file.filename
        );

        if (fs.existsSync(caminhoImg)) {
          fs.unlinkSync(caminhoImg);
        }
        return res.status(200).json({
          message:
            "Categoria inexistente!",
        });
      }

      if (!req.file) {
        return res.status(400).json({
          message:
            "Arquivo não enviado! É necessário enviar a imagem do produto!",
        });
      }

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
      res.status(500).json({
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

  updateProd: async (req, res) => {
    try {
      
      const { idCategoriaFk, nomeProduto, valorProduto, idProduto } = req.body;

      if (!idCategoriaFk || !nomeProduto || !valorProduto || !idProduto) {
        return res.status(200).json({
          message:
            "Por favor, envie todas as informações para realzar uma alteração.",
        });
      }

      const verifUpdate = await produtoModel.selectOne(idProduto);

      const verifCateg = await categoriaModel.selectOneCateg(idCategoriaFk);

      if (verifUpdate.length == 0) {
        const caminhoImg = path.resolve(
          process.cwd(),
          "uploads/images",
          req.file.filename
        );

        if (fs.existsSync(caminhoImg)) {
          fs.unlinkSync(caminhoImg);
        }
        return res.status(200).json({
          message: "Nenhum registro encontrado com esse ID!",
        });
      }

      if (verifCateg.length == 0) {
        const caminhoImg = path.resolve(
          process.cwd(),
          "uploads/images",
          req.file.filename
        );

        if (fs.existsSync(caminhoImg)) {
          fs.unlinkSync(caminhoImg);
        }
        return res.status(200).json({
          message: "Nenhuma categoria encontrada com esse ID!",
        });
      }

      if (!isNaN(nomeProduto) || nomeProduto.length < 3) {
        const caminhoImg = path.resolve(
          process.cwd(),
          "uploads/images",
          req.file.filename
        );

        if (fs.existsSync(caminhoImg)) {
          fs.unlinkSync(caminhoImg);
        }

        return res.status(200).json({
          message: "Por favor, insira um novo nome maior que três caracteres!",
        });
      }

      if (!req.file) {
        return res.status(400).json({
          message:
            "Arquivo não enviado! É necessário enviar a nova imagem do produto!",
        });
      }

      const buscarVinculo = await produtoModel.selectProdImg(idProduto);
      console.log(buscarVinculo);
      const nomeVinculo = buscarVinculo[0]["vinculoImagem"];

      const caminhoImg = path.resolve(
        process.cwd(),
        "uploads/images",
        nomeVinculo,
      );

      console.log(caminhoImg);

      if (fs.existsSync(caminhoImg)) {
        fs.unlinkSync(caminhoImg);
      }

      const result = await produtoModel.update(
        idCategoriaFk,
        nomeProduto,
        valorProduto,
        req.file.filename,
        idProduto,
      );

      console.log(result);

      return res.status(200).json({
        message: "Produto alterado com sucesso!",
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

  deleteProd: async (req, res) => {
    try {
      const { idProduto } = req.query;
      const verifProduto = await produtoModel.selectOne(idProduto);

      if (verifProduto.length == 0) {
        res.status(200).json({
          message: "Não foi encontrado nenhum registro com esse id!",
        });
      }

      if (!idProduto) {
        res.status(200).json({ message: "Dados enviados inválidos!" });
      }

      const buscarVinculo = await produtoModel.selectProdImg(idProduto);
      console.log(buscarVinculo);
      const nomeVinculo = buscarVinculo[0]["vinculoImagem"];

      const caminhoImg = path.resolve(
        process.cwd(),
        "uploads/images",
        nomeVinculo,
      );

      console.log(caminhoImg);

      if (fs.existsSync(caminhoImg)) {
        fs.unlinkSync(caminhoImg);
      }
      const result = await produtoModel.delete(idProduto);
      console.log(result);
      res
        .status(200)
        .json({ message: "Produto deletado com sucesso!", data: result });
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
