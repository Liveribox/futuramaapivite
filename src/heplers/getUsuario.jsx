

export const getUsuario = async() => {
  
    const url = "https://usuarios3.free.beeceptor.com/usuarios";
    const resp = await fetch(url);
    const { usuarios } = await resp.json();

    const usuarioss = usuarios.map(usuario =>({
        id: usuario.id,
        nombre: usuario.nombre,
        contraseña: usuario.contraseña
    }));

    return usuarioss;

}


