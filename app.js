
const express = require('express');  // Fixed typo here
const bodyParser = require('body-parser');
const path = require('path');

// Acceso a rutas
const rutaproducto = require('./routes/producto');

const app = express();  // Correct variable name
const PORT = process.env.PORT || 3000;

// Configuración de middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));  // Fixed here as well

// Motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configuración de rutas
app.use('/', rutaproducto);  // This assumes that you have a 'producto' route module

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
