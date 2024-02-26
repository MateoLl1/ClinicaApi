const { poolConnect, pool } = require('../config');

async function validarCredenciales(email, password) {
  try {
    await poolConnect;
    const request = pool.request();

    request.input('em_email', email);
    request.input('em_password', password);

    const query = `
    SELECT *
    FROM tbl_empleado
    WHERE em_email = @em_email COLLATE SQL_Latin1_General_CP1_CS_AS
    AND em_password = @em_password;

    `;

    return (await request.query(query)).recordset;
  } catch (error) {
    console.log('Error al autenticar usuario ' + error);
    return false;
  }
}

async function registarPaciente(email, cedula, nombres, fechaNa, sexo) {
  try {
    await poolConnect;
    const existe = await usuarioExiste(email, cedula);
    if (existe) {
      return;
    }

    const request = pool.request();
    request.input('em_email', email);
    request.input('em_password', cedula);
    request.input('em_cedula', cedula);
    request.input('em_nombres', nombres);
    request.input(
      'em_imagen',
      'https://th.bing.com/th/id/OIP.JwEJgEC-hx43MR-2OJa_IQHaHw?rs=1&pid=ImgDetMain'
    );
    request.input('em_fecha_na', fechaNa);
    request.input('em_fecha_reg', new Date());
    request.input('em_sexo', sexo);
    request.input('em_estado', 'A');
    request.input('tp_em_id', '4');

    const query = `
    insert into tbl_empleado 
    (em_email,em_password,em_cedula,em_nombres,em_fecha_na,em_imagen,em_fecha_reg,em_sexo,em_estado,tp_em_id)
    values
    (@em_email,@em_password,@em_cedula,@em_nombres,@em_fecha_na,@em_imagen,
    @em_fecha_reg,@em_sexo,@em_estado,@tp_em_id)
    `;

    await request.query(query);
    return await validarCredenciales(email, cedula);
  } catch (error) {
    console.log('Error al registar paciente ' + error);
    return;
  }
}

async function usuarioExiste(email, cedula) {
  try {
    await poolConnect;
    const request = pool.request();
    request.input('em_email', email);
    request.input('em_cedula', cedula);

    const query = `
      SELECT COUNT(*) AS count
      FROM tbl_empleado
      WHERE em_email = @em_email COLLATE SQL_Latin1_General_CP1_CS_AS
      OR em_cedula = @em_cedula;
  `;

    const result = await request.query(query);
    return result.recordset[0].count > 0;
  } catch (error) {
    console.log('Error al verificar si el usuario existe: ' + error);
    return false;
  }
}

module.exports = {
  autenticacion: {
    validarCredenciales,
    registarPaciente,
  },
};
