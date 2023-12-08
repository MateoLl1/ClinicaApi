//* PAQUETES
const express = require('express');
const cors = require('cors');
const puerto = 1410;
const app = express();
app.use(express.json());

//* SERVICIO
const service = require('./service');

// * MIDDLEWARE
app.use(cors());

//! ENDPOINTS DE ADMINISTRACION
app.get('/admin/esp-med', async (req, res) => {
  const datos = await service.tbl_esp_med.getEspecialidadesMed();
  res.json(datos);
});

app.post('/admin/esp-med/update', async (req, res) => {
  const request = req.body;
  console.log(request);
  const datos = await service.tbl_esp_med.updateEspecialidadMed(
    request.id,
    request.descr,
    request.imagen
  );
  res.json(datos);
});

app.post('/admin/esp-med/delete', async (req, res) => {
  const request = req.body;
  console.log(request);
  res.json(await service.tbl_esp_med.deleteEspecialidadesMed(request.id));
});

app.listen(puerto, () => {
  console.log(`
  Servidor iniciado en el ${puerto}
    http://localhost:${puerto}
`);
});
