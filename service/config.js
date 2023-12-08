const sql = require('mssql');

const localConfig = {
  user: 'sa',
  password: '123456',
  server: 'localhost',
  database: 'Integrador',
  port: 1433,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

const pool = new sql.ConnectionPool(localConfig);
const poolConnect = pool.connect();

poolConnect
  .then(() => {
    // console.log('Conexión exitosa a la base de datos');
  })
  .catch((err) => {
    console.error('Error al conectar a la base de datos:', err);
  });

module.exports = {
  pool,
  poolConnect,
};
