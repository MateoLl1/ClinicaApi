const { poolConnect, pool } = require('../config');

async function insertEmpleado(
  email,
  cedula,
  nombres,
  fechaNa,
  imagen,
  sexo,
  tp_em_id
) {
  try {
    await poolConnect;
    const request = pool.request();

    request.input('em_email', email);
    request.input('em_password', cedula);
    request.input('em_cedula', cedula);
    request.input('em_nombres', nombres);
    request.input('em_fecha_na', fechaNa);
    request.input('em_fecha_reg', new Date());
    request.input('em_imagen', imagen);
    request.input('em_estado', 'A');
    request.input('em_sexo', sexo);
    request.input('tp_em_id', tp_em_id);
    const query = `
  insert into tbl_empleado (em_email,em_password,em_cedula,em_nombres,
    em_fecha_na,em_fecha_reg,em_imagen,em_sexo,em_estado,tp_em_id
    ) values (@em_email,@em_password,@em_cedula,@em_nombres,
    @em_fecha_na,@em_fecha_reg,@em_imagen,@em_sexo,@em_estado,@tp_em_id)  
  `;

    await request.query(query);
    console.log('Empleado registrado');
    return true;
  } catch (error) {
    console.log('Error al registrar' + error);
    return false;
  }
}

async function insertDoctorEsp(id, sp_me_id) {
  try {
    await poolConnect;
    const request = pool.request();

    request.input('em_id', id);
    request.input('sp_me_id', sp_me_id);
    const query = `
  insert into tbl_doctor_esp (em_id,sp_me_id)
  values ( @em_id , @sp_me_id )
  `;
    await request.query(query);
    console.log('Especialidad registrada en el doctor/a');
    return true;
  } catch (error) {
    console.log('Error al registrar en la tabla intermedia ' + error);
    return false;
  }
}

async function updatePassword(id, password) {
  try {
    await poolConnect;
    const request = pool.request();

    request.input('em_id', id);
    request.input('em_password', password);
    const query = `
  update tbl_empleado set em_password = @em_password 
  where em_id = @em_id
  `;
    await request.query(query);
    console.log('Constraseña actualizada');
    return true;
  } catch (error) {
    console.log('Error al actualizada contraseña ' + error);
    return false;
  }
}

async function updateEmpleado(
  id,
  email,
  password,
  cedula,
  nombres,
  fechaNa,
  imagen,
  sexo,
  tp_em_id
) {
  try {
    await poolConnect;
    const request = pool.request();

    request.input('em_id', id);
    request.input('em_email', email);
    request.input('em_password', password);
    request.input('em_cedula', cedula);
    request.input('em_nombres', nombres);
    request.input('em_fecha_na', fechaNa);
    request.input('em_imagen', imagen);
    request.input('em_sexo', sexo);
    request.input('tp_em_id', tp_em_id);
    const query = `
    update tbl_empleado set em_email = @em_email ,em_password = @em_password,
    em_cedula = @em_cedula , em_nombres= @em_nombres, em_fecha_na = @em_fecha_na,
    em_imagen = @em_imagen, em_sexo = @em_sexo, tp_em_id = @tp_em_id
    where em_id = @em_id
  `;
    await request.query(query);
    console.log('Empleado actualizado');
    return true;
  } catch (error) {
    console.log('Error al actualizar empleado ' + error);
    return false;
  }
}

async function deleteEmpleado(id) {
  try {
    await poolConnect;
    const request = pool.request();

    request.input('em_id', id);
    const query = `
    update tbl_empleado set em_estado = 'I'
    where em_id = @em_id
    `;

    await request.query(query);
    console.log('Empleado eliminado');
    return true;
  } catch (error) {
    console.log('Error al eliminar empleado ' + error);
    return false;
  }
}

async function getEmpleados() {
  try {
    await poolConnect;
    const request = pool.request();

    const query = `
    select * from tbl_empleado 
    where tp_em_id != 1 and em_estado = 'A'
  `;

    return (await request.query(query)).recordset;
  } catch (error) {
    console.log(`Erro al obtener empleados ${error}`);
    return false;
  }
}
async function getUsuarios() {
  try {
    await poolConnect;
    const request = pool.request();

    const query = `
  select * from tbl_empleado where em_estado = 'A'
  `;

    return (await request.query(query)).recordset;
  } catch (error) {
    console.log(`Erro al obtener usuarios ${error}`);
    return false;
  }
}

async function getMedicos() {
  try {
    await poolConnect;
    const request = pool.request();

    const query = `
    select * from tbl_empleado
    where tp_em_id = 2 and em_estado = 'A'
  `;

    return (await request.query(query)).recordset;
  } catch (error) {
    console.log(`Error al carga medicos ` + error);
    return false;
  }
}

async function getEmpleadosEliminados() {
  try {
    await poolConnect;
    const request = pool.request();

    const query = `
  select * from tbl_empleado
  where em_estado = 'I'
  `;

    return (await request.query(query)).recordset;
  } catch (error) {
    console.log(`Error al cargar empleados eliminados ` + error);
    return false;
  }
}

async function eliminarPermanete(id) {
  try {
    await poolConnect;
    const request = pool.request();

    request.input('em_id', id);

    const query = `
  delete from tbl_empleado 
  where em_id = @em_id
  `;

    return await request.query(query);
  } catch (error) {
    console.log('Error al eliminar permanentemente el empleado ' + error);
    return false;
  }
}

async function recuperarEmpleado(id) {
  try {
    await poolConnect;
    const request = pool.request();

    request.input('em_id', id);
    const query = `
    update tbl_empleado set em_estado = 'A'
    where em_id = @em_id
    `;

    await request.query(query);
    console.log('Empleado recuperado');
    return true;
  } catch (error) {
    console.log('Error al recuperar empleado ' + error);
    return false;
  }
}

module.exports = {
  tbl_empleado: {
    insertEmpleado,
    insertDoctorEsp,
    updatePassword,
    updateEmpleado,
    deleteEmpleado,
    getEmpleados,
    getUsuarios,
    getMedicos,
    getEmpleadosEliminados,
    eliminarPermanete,
    recuperarEmpleado,
  },
};
