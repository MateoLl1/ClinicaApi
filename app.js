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
      request.nombre,
      request.imagen,
      request.descr,
      request.subtitle,
      request.imagen2,
      request.parrafo
    )
  );
});

app.post('/admin/esp-med/update', async (req, res) => {
  const request = req.body;
  console.log(request);
  const datos = await service.tbl_esp_med.updateEspecialidadMed(
    request.id,
    request.nombre,
    request.imagen,
    request.descr,
    request.subtitle,
    request.imagen2,
    request.parrafo
  );
  res.json(datos);
});

app.post('/admin/esp-med/delete', async (req, res) => {
  const request = req.body;
  console.log(request);
  res.json(await service.tbl_esp_med.deleteEspecialidadesMed(request.id));
});

app.get('/admin/tipo-empleado', async (req, res) => {
  res.json(await service.tbl_tipo_empleado.getTipoEmpleados());
});

app.post('/admin/tipo-empleado/insert', async (req, res) => {
  const request = req.body;
  res.json(await service.tbl_tipo_empleado.insertTipoEmpleado(request.descr));
});

app.post('/admin/tipo-empleado/delete', async (req, res) => {
  const request = req.body;
  res.json(await service.tbl_tipo_empleado.deleteTipoEmpleado(request.id));
});

app.post('/admin/tipo-empleado/update', async (req, res) => {
  const request = req.body;
  res.json(
    await service.tbl_tipo_empleado.updateTipoEmpplead(
      request.id,
      request.descr
    )
  );
});

app.get('/admin/empleados', async (req, res) => {
  res.json(await service.tbl_empleado.getUsuarios());
});

app.post('/admin/empleado/insert', async (req, res) => {
  const request = req.body;
  console.log(request);
  res.json(
    await service.tbl_empleado.insertEmpleado(
      request.email,
      request.cedula,
      request.nombres,
      request.fechaNa,
      request.imagen,
      request.sexo,
      request.tp_em_id
    )
  );
});

app.post('/admin/empleado/update', async (req, res) => {
  const request = req.body;
  console.log(request);
  res.json(
    await service.tbl_empleado.updateEmpleado(
      request.id,
      request.email,
      request.password,
      request.cedula,
      request.nombres,
      request.fechaNa,
      request.imagen,
      request.sexo,
      request.tp_em_id
    )
  );
});

app.post('/admin/empleado/delete', async (req, res) => {
  const request = req.body;
  res.json(await service.tbl_empleado.deleteEmpleado(request.id));
});

app.post('/admin/empleado/update/cambiar-pass', async (req, res) => {
  const request = req.body;
  res.json(
    await service.tbl_empleado.updatePassword(request.id, request.password)
  );
});

app.get('/admin/empleado/medico/activos', async (req, res) => {
  res.json(await service.tbl_empleado.getMedicos());
});

app.get('/admin/empleado/papelera', async (req, res) => {
  res.json(await service.tbl_empleado.getEmpleadosEliminados());
});

app.post('/admin/empleado/recuperar', async (req, res) => {
  const request = req.body;

  res.json(await service.tbl_empleado.recuperarEmpleado(request.em_id));
});

app.post('/admin/empleado/delete/permanente', async (req, res) => {
  const request = req.body;
  res.json(await service.tbl_empleado.eliminarPermanete(request.em_id));
});

app.post('/admin/empleado/doctor/esp', async (req, res) => {
  const request = req.body;
  res.json(await service.tbl_doctor_esp.getEspecidadesDoctor(request.id));
});

app.post('/admin/empleado/medico/espM/insert', async (req, res) => {
  const request = req.body;
  res.json(
    await service.tbl_doctor_esp.insertDoctorEsp(request.empId, request.spId)
  );
});

app.post('/admin/empleado/medico/espM/delete', async (req, res) => {
  const request = req.body;
  res.json(
    await service.tbl_doctor_esp.eliminarDoctoEsp(request.empId, request.spId)
  );
});

app.listen(puerto, () => {
  console.log(`
  Servidor iniciado en el ${puerto}
    http://localhost:${puerto}
`);
});
