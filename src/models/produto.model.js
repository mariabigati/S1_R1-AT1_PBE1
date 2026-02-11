import pool from "../config/db.js";

const produtoModel = {
  insert: async (pIdCategoriaFK, pNomeProduto, pValorProduto, pVinculoImagem) => {
    const sql =
      "INSERT INTO produtos (idCategoriaFK, nomeProduto, valorProduto, vinculoImagem) VALUES (?,?,?,?);";
    const values = [pIdCategoriaFK, pNomeProduto, pValorProduto, pVinculoImagem]
    const [rows] = await pool.execute(sql, values);
    return rows;
  },

  selectAll: async() => {
    const sql = 'SELECT * FROM produtos;';
    const [rows] = await pool.execute(sql);
    return rows;
  },

  selectOne: async (pIdProduto) => {
    const sql = 'SELECT * FROM produtos WHERE idProduto = ?;';
    const values = [pIdProduto];
    const [rows] = await pool.execute(sql, values);
    return rows;
  },

   selectProdCateg: async (pIdCategoriaFK) => {
    const sql = 'SELECT * FROM produtos WHERE idCategoriaFK = ?;';
    const values = [pIdCategoriaFK];
    const [rows] = await pool.execute(sql, values);
    return rows;
  },


  update: async (pIdProduto, pIdCategoriaFK, pNomeProduto, pValorProduto, pVinculoImagem) => {
    const sql = 'UPDATE produtos WHERE idProduto =? SET idCategoriaFK =?, nomeProduto = ?, valorProduto = ?, vinculoImagem = ? WHERE idProduto = ?;'
    const values = [pIdProduto, pIdCategoriaFK, pNomeProduto, pValorProduto, pVinculoImagem];
    const [rows] = await pool.execute(sql, values);
    return rows;
  },

  delete: async (pIdProduto) => {
    const sql = 'DELETE FROM produtos WHERE idProduto = ?;';
    const values = [pIdProduto];
    const [rows] = await pool.execute(sql, values);
    return rows;

  }
};

export default produtoModel;
