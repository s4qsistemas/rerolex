var express = require("express");
var router = express.Router();

const  credential = {
    email : "admin@gmail.com",
    password : "admin123"
}

// login user
router.post('/login', (req, res)=>{
    if(req.body.email == credential.email && req.body.password == credential.password){
        req.session.user = req.body.email;
        res.redirect('/route/dashboard');
        //res.end("Login Successful...!");
    }else{
        res.render('base', { title: "Rerolex", noUser : "Error de Credenciales...!"})
        //res.end("Ingreso No Autorizado")
    }
});

// route for dashboard
router.get('/dashboard', (req, res) => {
    if(req.session.user){
        res.render('dashboard', {title: "Dashboard", user : req.session.user})
    }else{
        res.send("Ingreso No Autorizado")
    }
})

// route for obras
router.get('/obras', (req, res) => {
    if(req.session.user){
        res.render('obras', {title: "Obras", user : req.session.user})
    }else{
        res.send("Ingreso No Autorizado")
    }
})

// route for secciones
router.get('/secciones', (req, res) => {
    if(req.session.user){
        res.render('secciones', {title: "Secciones", user : req.session.user})
    }else{
        res.send("Ingreso No Autorizado")
    }
})

// route for turnos
router.get('/turnos', (req, res) => {
    if(req.session.user){
        res.render('turnos', {title: "Turnos", user : req.session.user})
    }else{
        res.send("Ingreso No Autorizado")
    }
})

// route for personal
router.get('/personal', (req, res) => {
    if(req.session.user){
        res.render('personal', {title: "Personal", user : req.session.user})
    }else{
        res.send("Ingreso No Autorizado")
    }
})

// route for asistencia
router.get('/asistencia', (req, res) => {
    if(req.session.user){
        res.render('asistencia', {title: "Asistencia", user : req.session.user})
    }else{
        res.send("Ingreso No Autorizado")
    }
})

// route for logout
router.get('/logout', (req ,res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("Error")
        }else{
            res.render('base', { title: "Rerolex", logout : "Sesión Finalizada...!"})
        }
    })
})

module.exports = router;