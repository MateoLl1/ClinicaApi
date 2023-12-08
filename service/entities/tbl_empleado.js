const { poolConnect, pool } = require('../config');

async function insertEmpleado() {
  await poolConnect;
  const request = pool.request();
}

module.exports = {
  tbl_empleado: {
    insertEmpleado,
  },
};
