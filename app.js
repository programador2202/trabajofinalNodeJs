const expres = require('express')
const bodyParser = require('body-parser')
const path= require('path')



//acceso a rutas

const rutaproducto = require('./routes/producto')


const app=expres();
const PORT =process.env.PORT || 3000


//CONFIGURANDO"MIDDLEWARE => CAPA DE COMUNICACION

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(expres.static(path.join(__dirname,'public')))

//motor de plantillas
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))


//configuracion de rutas
app.use('/',rutaproducto)
//categoria y marcas son suministros de datos

app.listen(PORT,()=>{
 console.log(`Servidor iniciado en http://localhost:3000`)
});