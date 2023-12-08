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

app.post('/admin/esp-med/insert', async (req, res) => {
  const request = req.body;
  res.json(
    await service.tbl_esp_med.insertEspecialidadMed(
      request.descr,
      request.imagen
    )
  );
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

app.get('/admin/doctor_esp', async (req, res) => {
  res.json(await service.tbl_doctor_esp.getDoctorEspId(1));
});

app.post('/admin/empleado/insert', async (req, res) => {
  const data = req.body;
  console.log(data);
  res.json(await service.tbl_empleado.insertEmpleado());
});

app.get('/admin/doctor_esp/insert', async (req, res) => {
  res.json(await service.tbl_doctor_esp.insertDoctorEsp(1, 1));
});

app.listen(puerto, () => {
  console.log(`
  Servidor iniciado en el ${puerto}
    http://localhost:${puerto}
`);
});
