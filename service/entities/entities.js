const { tbl_esp_med } = require('./tbl_esp_med');
const { tbl_doctor_esp } = require('./tbl_doctor_esp');
const { tbl_empleado } = require('./tbl_empleado');
const { tbl_tipo_empleado } = require('./tbl_tipo_empleado');
const { tbl_noticias } = require('./tbl_noticias');
const { tbl_agendamiento } = require('./tbl_agendamiento');

const { autenticacion } = require('./auth');
module.exports = {
  tbl_noticias,
  tbl_esp_med,
  tbl_doctor_esp,
  tbl_empleado,
  tbl_tipo_empleado,
  autenticacion,
  tbl_agendamiento,
};
