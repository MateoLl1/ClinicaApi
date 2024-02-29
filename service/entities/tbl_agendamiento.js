const { pool, poolConnect } = require('../config');

async function buscarPacientes(cedula) {
  try {
    if (cedula === '') {
      return [];
    }
    await poolConnect;
    const request = pool.request();
    request.input('em_cedula', cedula);
    const query = `
      SELECT * FROM tbl_empleado
      WHERE em_cedula LIKE '%' + @em_cedula + '%' and tp_em_id = '4'
    `;

    const result = await request.query(query);
    return result.recordset;
  } catch (error) {
    console.log('Error al buscar pacientes: ' + error);
    return [];
  }
}

async function cargarMedicoPorEspecialidad(idEsp) {
  try {
    await poolConnect;
    const request = pool.request();

    request.input('sp_me_id', idEsp);
    const query = `
      SELECT e.*
      FROM tbl_empleado e
      JOIN tbl_doctor_esp de ON e.em_id = de.em_id
      WHERE de.sp_me_id = @sp_me_id
    `;
    return (await request.query(query)).recordset;
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function agendarCita(hora, fecha, paId, drId, espId) {
  try {
    await poolConnect;
    const request = pool.request();

    if (await validarCitaExistente(drId, paId, fecha, hora)) {
      console.log('Usuario encontrado');
      return false;
    }

    request.input('ag_fecha_reg', new Date());
    request.input('ag_hora', hora);
    request.input('ag_fecha', fecha);
    request.input('ag_estado', 'A');
    request.input('pa_id', paId);
    request.input('dr_id', drId);
    request.input('sp_id', espId);
    const query = `
      INSERT INTO tbl_agendamiento 
        (ag_fecha_reg, ag_hora, ag_fecha, ag_estado, pa_id, dr_id, sp_id)
      VALUES 
        (@ag_fecha_reg, @ag_hora, @ag_fecha, @ag_estado, @pa_id, @dr_id, @sp_id)
    `;
    const result = await request.query(query);
    console.log('Cita registrada.');
    return true;
  } catch (error) {
    console.log('Error al crear cita médica: ' + error);
    return false;
  }
}

async function validarCitaExistente(drId, paId, fecha, hora) {
  try {
    await poolConnect;
    const request = pool.request();

    const validationQuery = `
      SELECT COUNT(*) AS count FROM tbl_agendamiento 
      WHERE (dr_id = @dr_id AND ag_fecha = @ag_fecha AND ag_hora = @ag_hora) OR
            (pa_id = @pa_id AND dr_id = @dr_id AND CONVERT(date, ag_fecha) = CONVERT(date, @ag_fecha));
    `;
    request.input('dr_id', drId);
    request.input('pa_id', paId);
    request.input('ag_fecha', fecha);
    request.input('ag_hora', hora);

    const validationResult = await request.query(validationQuery);
    const existingCitasCount = validationResult.recordset[0].count;

    return existingCitasCount > 0;
  } catch (error) {
    console.log('Error al validar cita existente: ' + error);
    return true;
  }
}

async function cargarCitasDelDoctor(drId, espId) {
  try {
    await poolConnect;
    const request = pool.request();
    request.input('dr_id', drId);
    request.input('sp_id', espId);
    const query = `
    select * from tbl_agendamiento
    where dr_id = @dr_id and sp_id = @sp_id
  `;
    return (await request.query(query)).recordset;
  } catch (error) {
    console.log(error);
    return [];
  }
}
async function cargarCitasDelPaciente(id) {
  try {
    await poolConnect;
    const request = pool.request();
    request.input('pa_id', id);
    const query = `
    select * from tbl_agendamiento
    where pa_id = @pa_id
  `;
    return (await request.query(query)).recordset;
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function eliminarCita(id) {
  try {
    await poolConnect;
    const request = pool.request();
    request.input('ag_id', id);
    const query = `
  delete from tbl_agendamiento
  where ag_id = @ag_id
  `;
    await request.query(query);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = {
  tbl_agendamiento: {
    buscarPacientes,
    cargarMedicoPorEspecialidad,
    agendarCita,
    cargarCitasDelDoctor,
    eliminarCita,
    cargarCitasDelPaciente,
  },
};
