const { pool, poolConnect } = require('../config');

async function getNoticias() {
  try {
    await poolConnect;
    const request = pool.request();

    const query = `
    select * from tbl_noticias
  `;
    return (await request.query(query)).recordset;
  } catch (error) {
    console.log('Error al cargar noticias ' + error);
    return false;
  }
}

async function getNoticiasById(id) {
  try {
    await poolConnect;
    const request = pool.request();

    request.input('new_id', id);
    const query = `
    select * from tbl_noticias
    where new_id = @new_id
  `;
    return (await request.query(query)).recordset;
  } catch (error) {
    console.log('Error al cargar la noticia ' + error);
    return false;
  }
}

async function insertNoticia(titulo, content, image) {
  try {
    await poolConnect;
    const request = pool.request();

    request.input('new_titulo', titulo);
    request.input('new_content', content);
    request.input('new_image', image);
    request.input('new_fecha', new Date());
    const query = `
    insert into tbl_noticias 
    (new_titulo,new_content,new_image,new_fecha)
    values (@new_titulo,@new_content,@new_image,@new_fecha)    
    `;

    await request.query(query);
    console.log('Noticias ingresada');
    return true;
  } catch (error) {
    console.log('Error al insertar noticias ' + error);
    return false;
  }
}

async function eliminarNoticia(id) {
  try {
    await poolConnect;
    const request = pool.request();

    const query = `
    delete from tbl_noticias where new_id = ${id}
  `;
    return await request.query(query);
  } catch (error) {
    console.log('Error al eliminar noticia ' + error);
    return false;
  }
}

async function uptadeNoticia(id, title, content, image) {
  try {
    await poolConnect;
    const request = pool.request();

    request.input('new_titulo', title);
    request.input('new_content', content);
    request.input('new_image', image);
    request.input('new_id', id);
    const query = `
    update tbl_noticias set
    new_titulo = @new_titulo,new_content = @new_content,new_image = @new_image
    where new_id = @new_id
    `;

    await request.query(query);
    console.log('Noticias Actulizada');
    return true;
  } catch (error) {
    console.log('Error al actualizar noticia ' + error);
    return false;
  }
}

module.exports = {
  tbl_noticias: {
    getNoticias,
    getNoticiasById,
    insertNoticia,
    eliminarNoticia,
    uptadeNoticia,
  },
};
