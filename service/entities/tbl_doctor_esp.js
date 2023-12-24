const { poolConnect, pool } = require('../config');

async function getDoctorEspId(id) {
  try {
    await poolConnect;
    const request = pool.request();

    request.input('sp_me_id', id);
    const query = `
        select * from tbl_doctor_esp 
        where sp_me_id = @sp_me_id
    `;

    const data = await request.query(query);
    console.log(data);
    return data.recordset;
  } catch (error) {
    console.log('Error al obtener tbl_doctor_esp');
    return false;
  }
}

async function insertDoctorEsp(empId, spId) {
  try {
    await poolConnect;
    const request = pool.request();

    request.input('empId', empId);
    request.input('spId', spId);
    const query = `
    insert into tbl_doctor_esp (em_id,sp_me_id)
    values ( @empId , @spId)
  `;

    await request.query(query);
    console.log('Registro insertado');
    return true;
  } catch (error) {
    console.error(`Error en el registro ${error}`);
    return true;
  }
}

async function eliminarDoctoEsp(idEmp, idEsp) {
  try {
    await poolConnect;
    const request = pool.request();

    request.input('em_id', idEmp);
    request.input('sp_me_id', idEsp);
    const query = `
    delete from tbl_doctor_esp 
    where em_id = @em_id and sp_me_id = @sp_me_id
  `;

    await request.query(query);
    console.log('Doctor especialidad eliminada');
    return true;
  } catch (error) {
    console.log('Doctor especialidad eliminada ' + error);
    return false;
  }
}

async function getEspecidadesDoctor(id) {
  try {
    await poolConnect;
    const request = pool.request();

    request.input('em_id', id);
    const query = `
  select * from tbl_doctor_esp 
  where em_id = @em_id
  `;

    return (await request.query(query)).recordset;
  } catch (error) {
    console.log('Erro al obtener especilidad ' + error);
    return false;
  }
}

module.exports = {
  tbl_doctor_esp: {
    getDoctorEspId,
    insertDoctorEsp,
    getEspecidadesDoctor,
    eliminarDoctoEsp,
  },
};
