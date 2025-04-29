const express =require('express');
const router = express.Router();
const mysql =require('mysql');
const db = require('../config/database');



router.get('/', async (req, res) => {
    try {
      const { categoria, buscar, ordenPrecio } = req.query;
  
      const [categorias] = await db.query("SELECT * FROM categorias");
  
      let sql = `
        SELECT 
          P.idproducto,
          C.categoria,
          P.marca,
          P.nombre,
          P.precio,
          P.imagen,
          P.descripcion,
          P.fechaRegistro
        FROM producto P
        INNER JOIN categorias C ON P.idcategoria = C.idcategoria
        WHERE 1 = 1
      `;
      const params = [];
  
      if (categoria && categoria !== '') {
        sql += " AND C.idcategoria = ?";
        params.push(categoria);
      }
  
      if (buscar && buscar !== '') {
        sql += " AND (P.nombre LIKE ? OR P.marca LIKE ?)";
        const search = `%${buscar}%`;
        params.push(search, search);
      }
  
      // Agregar ordenamiento por precio
      if (ordenPrecio === 'asc') {
        sql += " ORDER BY P.precio ASC";
      } else if (ordenPrecio === 'desc') {
        sql += " ORDER BY P.precio DESC";
      }
  
      const [productos] = await db.query(sql, params);
  
      res.render('catalogo', {
        productos,
        categorias,
        categoriaSeleccionada: categoria || '',
        buscar,
        ordenPrecioSeleccionado: ordenPrecio || ''
      });
    } catch (error) {
      console.error(error);
    }
  });
  
  
  
  module.exports = router;




