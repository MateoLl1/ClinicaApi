const { poolConnect, pool } = require('../config');

async function getEspecialidadesMed() {
  try {
    await poolConnect;
    const request = pool.request();

    const query = `
    select * from tbl_especialidades_medicas
    `;

    const data = await request.query(query);
    return data.recordset;
  } catch (error) {
    console.error(`Error al obtener las especialidades ${error}`);
  }
}

async function insertEspecialidadMed(
  nombre,
  imagen,
  descr,
  subtitle,
  imagen2,
  parrafo
) {
  try {
    await poolConnect;
    const request = pool.request();

    //* PARAMETROS
    request.input('sp_me_nombre', nombre);
    request.input('sp_me_imagen', imagen);
    request.input('sp_me_fecha_reg', new Date());
    request.input('sp_me_descr', descr);
    request.input('sp_me_sub_ti', subtitle);
    request.input('sp_me_imagen2', imagen2);
    request.input('sp_me_parrafo', parrafo);

    const query = `
      insert into tbl_especialidades_medicas
      (sp_me_nombre,sp_me_fecha_reg,sp_me_imagen,sp_me_descr,
      sp_me_sub_ti,sp_me_imagen2,sp_me_parrafo)
      values (@sp_me_nombre,@sp_me_fecha_reg,@sp_me_imagen,@sp_me_descr,
      @sp_me_sub_ti,@sp_me_imagen2,@sp_me_parrafo)
    `;

    await request.query(query);
    console.log('Especialidad insertada:');
    return true;
  } catch (error) {
    console.error('Error al insertar:', error);
    return false;
  }
}

async function updateEspecialidadMed(
  id,
  nombre,
  imagen,
  descr,
  subtitle,
  imagen2,
  parrafo
) {
  try {
    await poolConnect;
    const request = pool.request();

    request.input('sp_me_id', id);
    request.input('sp_me_nombre', nombre);
    request.input('sp_me_imagen', imagen);
    request.input('sp_me_descr', descr);
    request.input('sp_me_sub_ti', subtitle);
    request.input('sp_me_imagen2', imagen2);
    request.input('sp_me_parrafo', parrafo);

    const query = `
    update tbl_especialidades_medicas 
    set sp_me_nombre = @sp_me_nombre, sp_me_imagen=@sp_me_imagen,
    sp_me_descr = @sp_me_descr, sp_me_imagen2=@sp_me_imagen2,
    sp_me_sub_ti = @sp_me_sub_ti, sp_me_parrafo=@sp_me_parrafo
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
      delete tbl_especialidades_medicas
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
