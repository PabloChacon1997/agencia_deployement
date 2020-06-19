// Importar express
const express = require('express');
const path = require('path');
const routes = require('./routes');
const configs = require('./config');
const bodyParser = require('body-parser');
require('dotenv').config({ path: 'variables.env' })
// db.authenticate()
//     .then(() => console.log('DB conectada'))
//     .catch(error => console.log(error));
// Configurar express
const app = express();

// Habilitar pug
app.set('view engine', 'pug');
// Añadir las vistas
app.set('views', path.join(__dirname,'./views'));
// Cargar una carpeta estatica llamaa public
app.use(express.static('public'));

// Validar si estamos en desarrollo o en producción
const config =  configs[app.get('env')];

// Creamos al variable para el sitio web
app.locals.titulo = config.nombresitio;

// Muestra el año actual y genera la ruta
app.use((req, res, next) => {
    // Crear una nueva fecha
    const fecha = new Date();
    res.locals.fechaActual = fecha.getFullYear();
    res.locals.ruta = req.path;
    return next();
});
// Ejecutar el body parser
app.use(bodyParser.urlencoded({extended: true}));

// Caragra las rutas
app.use('/', routes());

// Puesrto hijos para la app
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;
app.listen(port, host, () => {
    console.log('El servidor esta funcionando');
});



