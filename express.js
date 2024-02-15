const express = require('express');
const app = express();

const {infoCursos} = require('./cursos.js');

// Routers
const routerProgramacion = express.Router();
app.use('/api/cursos/programacion', routerProgramacion);

const routerMatematicas = express.Router();
app.use('/api/cursos/matematicas', routerMatematicas);

// Rutas: ruta 1
app.get('/', (req, res)=>{
    res.send('Mi primer servidor express. curso 💻 con Stefania');
});

// ruta: 2
app.get('/api/cursos', (req, res) => {
    res.send(JSON.stringify(infoCursos));
})

// ! -----------
// // ruta: 3
// app.get('/api/cursos/programacion', (req, res) => {
//     res.send(JSON.stringify(infoCursos.programacion));
// })
// ruta: 3 con Router
routerProgramacion.get('/', (req, res) => {
    res.send(JSON.stringify(infoCursos.programacion));
})
//! ------------
// ruta: 4
// app.get('/api/cursos/matematicas', (req, res) => {
//     res.send(JSON.stringify(infoCursos.matematicas));
// })

// ruta: 4 con router
routerMatematicas.get('/', (req, res) => {
    res.send(JSON.stringify(infoCursos.matematicas));
})


// ruta: 4 usando params (parametros URL) con router
routerProgramacion.get('/:lenguaje', (req, res) => {
    const lenguaje = req.params.lenguaje;
    const resultado = infoCursos.programacion.filter(curso => curso.lenguaje === lenguaje)
    
    if(resultado.length === 0){
        return res.status(404).send(`No se encontraron cursos de Programacion en ${lenguaje}`)
    }
// Parametros query desde aquí
//  console.log(req.query.ordenar)

//     if(req.query.ordenar === 'visitas') {
//         res.send(JSON.stringify(resultado.sort((a, b) => a.visitas - b.visitas)));
//     } else {
//     res.send(JSON.stringify(resultado));
//     }

//   O de esta otra forma
    if(req.query.ordenar === 'visitas') {
       return res.send(JSON.stringify(resultado.sort((a, b) => a.visitas - b.visitas)));
    } 
   res.send(JSON.stringify(resultado));
// hasta aquí parametros query


})

// ruta: 5 usando 2 params (usando 2 parametros URL)
routerProgramacion.get('/:lenguaje/:nivel', (req, res) => {
    const lenguaje = req.params.lenguaje;
    const nivel = req.params.nivel;
    const resultado = infoCursos.programacion.filter(curso => curso.lenguaje === lenguaje && curso.nivel === nivel)
    
    if(resultado.length === 0){
        return res.status(404).send(`No se encontraron cursos de Programacion en ${lenguaje} de nivel ${nivel}`)
    }
    res.send(JSON.stringify(resultado));
})


const PUERTO = process.env.PORT || 3001;

app.listen(PUERTO, ()=>{
    console.log(`El servidor express está esperando en el puerto ${PUERTO}...`);
})