import { getUsuario } from "../heplers/getUsuario"

export const LoginUsuario = async(nombreUsuario, contraseña) => {
  
    const usuarios = await getUsuario();

    const usuarioValido = usuarios.find(usuario => 
        usuario.nombre === nombreUsuario && usuario.contraseña === contraseña);

    
    return usuarioValido !== undefined;

}
