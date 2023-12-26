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

module.exports = {
  autenticacion: {
    validarCredenciales,
  },
};
