//* PAQUETES
const express = require('express');
const cors = require('cors');
const puerto = 1410;
const app = express();
app.use(express.json());

//* SERVICIO
const { poolConnect } = require('./service/conexion');
// * MIDDLEWARE
app.use(cors());

app.get('/', (req, res) => {
  res.send('Bienvenido al servidor de MediMeet');
});

app.listen(puerto, (req, res) => {
  console.log(`
  Servidor iniciado en el ${puerto}
    http://localhost:${puerto}
`);
});
