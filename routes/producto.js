const express = require('express') //Framework
const router = express.Router() //Rutas
const db = require('../config/database') 


router.get('/', async(req,res)=>{
  try{
    const query= 
   `SELECT 
    P.idproducto,
    M.marca,
    C.categoria,
    P.nombre,
    P.precio,
    P.imagen,
    P.fechaRegistro
    FROM producto P
    INNER JOIN marcas M ON P.idmarca = M.idmarca
    INNER JOIN categorias C ON P.idcategoria = C.idcategoria;

    `
    const[productos]=await db.query(query)
    res.render('index',{productos})
  }catch(error){
    console.error(error)
  }
})

module.exports=router