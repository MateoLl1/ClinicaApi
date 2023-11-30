const express = require('express');
const localApi = 'http://localhost:${puerto}';
const puerto = 1410;
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// * MIDDLEWARE
app.use(cors());

app.post('/info', (req, res) => {
  console.log(`Alguien entro a ${localApi}/info`);
  console.log(`Data recibida: ${req.body.email}`);
  const miObjeto = {
    id: '10',
    nombre: 'Mateo',
    apellido: 'Llerena',
    edad: 21,
    isAlive: true,
  };
  res.json(miObjeto);
});

app.listen(puerto, () => {
  console.log(`
Servidor iniciado en el ${puerto}
    http://localhost:${puerto}
`);
});
