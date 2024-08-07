const express = require('express');
const path = require('path');
const bodyparser = require("body-parser");
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");

const router = require('./router');

const app = express();

const port = process.env.PORT || 4000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }))

app.set('view engine', 'ejs');
app.set('json spaces', 2);

// load static assets
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/assets', express.static(path.join(__dirname, 'public/assets')))

app.use(session({
    secret: uuidv4(), //  '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
    resave: false,
    saveUninitialized: true
}));

// routes
app.use('/route', router);
app.use('/api/obras', require('./src/routes/obras'));
app.use('/api/secciones', require('./src/routes/secciones'));
app.use('/api/turnos', require('./src/routes/turnos'));
app.use('/api/personal', require('./src/routes/personal'));
app.use('/api/asistencia', require('./src/routes/asistencia'));

// home route
app.get('/', (req, res) =>{
    res.render('base', { title : "Inicio Sesión"});
})

app.listen(port, ()=>{ console.log("Listening to the server on http://localhost:4000")});