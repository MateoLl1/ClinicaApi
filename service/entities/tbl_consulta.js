const e = require('express');
const { pool, poolConnect } = require('../config');

async function insertConsulta(
  motivo,
  diagnostico,
  tratamiento,
  indicaciones,
  asitencia,
  agId
) {
  try {
    await poolConnect;
    const request = pool.request();

    request.input('co_motivo', motivo);
    request.input('co_examen', diagnostico);
    request.input('ag_id', agId);
    request.input('co_fecha_reg', new Date());
    request.input('co_asistio', asitencia === true ? 'A' : 'I');
    const query = `
    insert into tbl_consulta 
    (co_motivo,co_examen,co_fecha_reg,co_asistio,ag_id)
    values (@co_motivo,@co_examen,@co_fecha_reg,@co_asistio,@ag_id)
    `;
    const result = await request.query(query);

    const coId = await obtenerUltimoId();
    const resultDiagnostico = await insertDiagnostico(
      tratamiento,
      indicaciones,
      coId[0].last_inserted_id
    );
    if (!resultDiagnostico) return false;
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function obtenerUltimoId() {
  try {
    await poolConnect;
    const request = pool.request();

    const query = `SELECT IDENT_CURRENT('tbl_consulta') AS last_inserted_id;`;
    const result = (await request.query(query)).recordset;
    return result;
  } catch (error) {
    return false;
  }
}

async function consultaYaAtendida(agId) {
  await poolConnect;
  const request = pool.request();
  request.input('ag_id', agId);

  const query = `
    select * from tbl_consulta
    where ag_id = @ag_id
  `;
  const result = (await request.query(query)).recordset;
  console.log(result);
  if (result.length > 0) {
    return true;
  } else {
    return false;
  }
}

async function insertDiagnostico(diagnostico, indicaciones, agId) {
  try {
    await poolConnect;
    const request = pool.request();

    request.input('dg_tratamiento', diagnostico);
    request.input('dg_indicaciones', indicaciones);
    request.input('dg_fecha_reg', new Date());
    request.input('co_id', agId);
    const query = `
      insert into tbl_diagnostico
        (dg_tratamiento,dg_indicaciones,dg_fecha_reg,co_id)
        values (@dg_tratamiento,@dg_indicaciones,@dg_fecha_reg,@co_id)
      `;
    await request.query(query);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function cargarHistorialPacienteById(id) {
  try {
    await poolConnect;
    const request = pool.request();
    request.input('em_id', id);

    const query = `
    SELECT 
    E.*,
    A.*,
    C.*,
    D.*,
	R.*,
	P.*
FROM 
    tbl_empleado AS E
INNER JOIN 
    tbl_agendamiento AS A ON E.em_id = A.pa_id
INNER JOIN
    tbl_especialidades_medicas AS P ON A.sp_id = P.sp_me_id
INNER JOIN
	    tbl_empleado AS R ON A.dr_id = R.em_id
INNER JOIN 
    tbl_consulta AS C ON A.ag_id = C.ag_id
INNER JOIN 
    tbl_diagnostico AS D ON C.co_id = D.co_id
WHERE 
    E.em_id = @em_id
  `;
    const result = (await request.query(query)).recordset;
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = {
  tbl_consulta: {
    insertConsulta,
    insertDiagnostico,
    obtenerUltimoId,
    consultaYaAtendida,
    cargarHistorialPacienteById,
  },
};
