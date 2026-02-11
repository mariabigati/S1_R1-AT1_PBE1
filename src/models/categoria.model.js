import pool from "../config/db.js";
const categoriaModel = {
  insertCateg: async (pDescricaoCategoria) => {
    const sql = "INSERT INTO categorias (descricaoCategoria) VALUES (?);";
    const values = [pDescricaoCategoria];
    const [rows] = await pool.execute(sql, values);
    return rows;
  },
  selectAllCateg: async () => {
    const sql = "SELECT * FROM categorias;";
    const [rows] = await pool.execute(sql);
    return rows;
  },

  selectOneCateg: async (pIdCategoria) => {
    const sql = "SELECT * FROM categorias WHERE idCategoria = ?;";
    const values = [pIdCategoria];
    const [rows] = await pool.execute(sql, values);
    return rows;
  },
  updateCateg: async (pDescricaoCategoria, pIdCategoria) => {
    const sql = "UPDATE categorias SET descricaoCategoria=? WHERE idCategoria=?;";
    const values = [pDescricaoCategoria, pIdCategoria];
    const [rows] = await pool.execute(sql, values);
    return rows;
  },
  deleteCateg: async (pIdCategoria) => {
    const sql = "DELETE FROM categorias WHERE idCategoria = ?;";
    const values = [pIdCategoria];
    const [rows] = await pool.execute(sql, values);
    return rows;
  },
};
export default categoriaModel;
