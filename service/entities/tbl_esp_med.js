const { poolConnect, pool } = require('../config');

async function getEspecialidadesMed() {
  try {
    await poolConnect;
    const request = pool.request();

    const query = `
    select * from tbl_especialidades_medicas where sp_me_estado = 'A'
    `;

    const data = await request.query(query);
    return data.recordset;
  } catch (error) {
    console.error(`Error al obtener las especialidades ${error}`);
  }
}

async function insertEspecialidadMed(descripcion, imagen) {
  try {
    await poolConnect;
    const consulta = pool.request();

    //* PARAMETROS
    consulta.input('sp_me_desc', descripcion);
    consulta.input('sp_me_imagen', imagen);
    consulta.input('sp_me_fecha_reg', new Date());
    consulta.input('sp_me_estado', 'A');

    const query = `
      INSERT INTO tbl_especialidades_medicas 
      (sp_me_desc, sp_me_imagen, sp_me_fecha_reg, sp_me_estado)
      VALUES (@sp_me_desc, @sp_me_imagen, @sp_me_fecha_reg, @sp_me_estado)
    `;

    await consulta.query(query);
    console.log('Especialidad insertada:');
    return true;
  } catch (error) {
    console.error('Error al insertar:', error);
    return false;
  }
}

async function updateEspecialidadMed(id, descripcion, imagen) {
  try {
    await poolConnect;
    const request = pool.request();

    request.input('sp_me_id', id);
    request.input('sp_me_desc', descripcion);
    request.input('sp_me_imagen', imagen);

    const query = `
    update tbl_especialidades_medicas set 
    sp_me_desc = @sp_me_desc  , sp_me_imagen = @sp_me_imagen
    where sp_me_id = @sp_me_id
    `;

    await request.query(query);
    console.log(`Especialidad ${id} actualizada`);
    return true;
  } catch (error) {
    console.error(`Error al actualizar especialidad`);
    return false;
  }
}

async function deleteEspecialidadesMed(id) {
  try {
    await poolConnect;
    const request = pool.request();

    request.input('sp_me_id', id);
    const query = `
      update tbl_especialidades_medicas set 
      sp_me_estado = 'I'
      where sp_me_id = @sp_me_id
    `;

    await request.query(query);
    console.log('Especialidad eliminada');
    return true;
  } catch (error) {
    console.log('Error al eliminar especialidad');
    return false;
  }
}

module.exports = {
  tbl_esp_med: {
    insertEspecialidadMed,
    getEspecialidadesMed,
    updateEspecialidadMed,
    deleteEspecialidadesMed,
  },
};
