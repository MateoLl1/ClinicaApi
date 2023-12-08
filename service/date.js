function obtenerFechaEnFormato() {
  const fecha = new Date();

  const year = fecha.getFullYear();
  const month = String(fecha.getMonth() + 1).padStart(2, '0');
  const day = String(fecha.getDate()).padStart(2, '0');

  const fechaEnFormato = `${year}-${month}-${day}`;
  console.log(fechaEnFormato);
  return fechaEnFormato;
}

module.exports = {
  date: obtenerFechaEnFormato,
};
