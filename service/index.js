const {
  tbl_esp_med,
  tbl_doctor_esp,
  tbl_empleado,
  tbl_tipo_empleado,
  tbl_noticias,
  autenticacion,
  tbl_agendamiento,
} = require('./entities/entities');

const { date } = require('./date');

module.exports = {
  date,
  tbl_noticias,
  tbl_esp_med,
  tbl_doctor_esp,
  tbl_empleado,
  tbl_tipo_empleado,
  autenticacion,
  tbl_agendamiento,
};
