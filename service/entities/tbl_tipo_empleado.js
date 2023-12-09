const { pool, poolConnect } = require('../config');

async function insertTipoEmpleado(descr) {
  try {
    await poolConnect;
    const request = pool.request();

    request.input('tp_em_desc', descr);
    request.input('tp_em_estado', 'A');
    const query = `
  insert into tbl_tipo_empleado (tp_em_desc,tp_em_estado)
  values (@tp_em_desc,@tp_em_estado)  
  `;

    await request.query(query);
    console.log('Tipo registrado');
    return true;
  } catch (error) {
    console.error('Error al registrar tipo' + error);
    return false;
  }
}

async function updateTipoEmpplead(id, descr) {
  try {
    await poolConnect;
    const request = pool.request();

    request.input('tp_em_desc', descr);
    request.input('tp_em_id', id);
    const query = `
    update tbl_tipo_empleado set tp_em_desc = @tp_em_desc
    where tp_em_id = @tp_em_id
    `;

    await request.query(query);
    console.log('Tipo actualizado');
    return true;
  } catch (error) {
    console.log('Error al actualizar' + error);
    return false;
  }
}

async function deleteTipoEmpleado(id) {
  try {
    await poolConnect;
    const request = pool.request();

    request.input('tp_em_id', id);
    const query = `
    delete tbl_tipo_empleado where tp_em_id = @tp_em_id
  `;

    await request.query(query);
    console.log('Tipo borrado');
    return true;
  } catch (error) {
    console.log('Error al borrar' + error);
    return false;
  }
}

async function getTipoEmpleadoById(id) {
  try {
    await poolConnect;
    const request = pool.request();

    request.input('tp_em_id', id);
    const query = `
      select * from tbl_tipo_empleado
      where tp_em_id = @tp_em_id
    `;
    return (await request.query(query)).recordset;
  } catch (error) {
    console.log('Error al cargar tipo empresa');
    return false;
  }
}

module.exports = {
  tbl_tipo_empleado: {
    insertTipoEmpleado,
    updateTipoEmpplead,
    deleteTipoEmpleado,
    getTipoEmpleadoById,
  },
};
