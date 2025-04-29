const express = require('express');
const router = express.Router();
const db = require('../config/database');
const multer = require('multer');
const path = require('path');

// Mostrar productos
router.get('/', async (req, res) => {
  try {
    const query = `
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
    INNER JOIN categorias C ON P.idcategoria = C.idcategoria;
    `;
    const [productos] = await db.query(query);
    res.render('index', { productos });
  } catch (error) {
    console.error(error);
  }
});


//CONFIGURAR ALMACENAMIENTO DE LA IMAGEN
// Configurar dónde se guardarán las imágenes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/img');  // La carpeta 'img' debe existir en el directorio público
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Usar un nombre único para evitar conflictos
  }
});

// Crear el middleware de carga de imágenes
const img = multer({ storage: storage });



// Mostrar formulario de creación
router.get('/create', async (req, res) => {
  try {
    const [categorias] = await db.query("SELECT * FROM categorias");
    res.render('create', { categoria:categorias });
  } catch (error) {
    console.error(error);
  }
});


//POST DATOS 
router.post('/create', img.single('imagen'), async (req, res) => {
  try {
    const { categoria, marca, nombre, precio, descripcion, fechaRegistro } = req.body;
    const imagenPath = req.file ? `/img/${req.file.filename}` : null;

    await db.query(
      `INSERT INTO producto(idcategoria, marca, nombre, precio, imagen, descripcion, fechaRegistro) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [categoria, marca, nombre, precio, imagenPath, descripcion, fechaRegistro]
    );
    res.redirect('/');
  } catch (error) {
    console.error(error);
  }
});


// Editar registro con imagen
router.post('/edit/:id', img.single('imagen'), async (req, res) => {
  try {
    const { categoria, marca, nombre, precio, descripcion, fechaRegistro, imagenActual } = req.body;

    // Si se sube una nueva imagen
    const imagenPath = req.file ? `/img/${req.file.filename}` : imagenActual;

    await db.query(
      `UPDATE producto 
       SET idcategoria = ?, marca = ?, nombre = ?, precio = ?, imagen = ?, descripcion = ?, fechaRegistro = ?
       WHERE idproducto = ?`,
      [categoria, marca, nombre, precio, imagenPath, descripcion, fechaRegistro, req.params.id]
    );

    res.redirect('/');
  } catch (error) {
    console.error( error);
  }
});

// Obtener datos para edición de un producto
router.get('/edit/:id', async (req, res) => {
  try {
    const [producto] = await db.query("SELECT * FROM producto WHERE idproducto = ?", [req.params.id]);
    const [categorias] = await db.query("SELECT * FROM categorias");

    
    if (producto.length > 0)
      res.render('edit', { producto: producto[0], categoria: categorias });
    else
    res.redirect('/')
  }
   catch (error) {
    console.error( error);
  }
})


// Eliminar producto
router.get('/delete/:id', async (req, res) => {
  try {
    const [resultado] = await db.query("DELETE FROM producto WHERE idproducto = ?", [req.params.id]);
    res.redirect('/');
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
