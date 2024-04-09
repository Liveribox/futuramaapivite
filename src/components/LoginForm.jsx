import { useState } from "react"; 
import { LoginUsuario } from "./LoginUsuario";
import { useNavigate } from "react-router-dom";


export const LoginForm = () => {

    const [nombreUsuario, setNombreUsuario] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [error, setError] = useState('');

    const navegar = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const isValid = await LoginUsuario(nombreUsuario, contraseña);

            if (isValid) {
                navegar('/futugrid');
            } else {
                setError('Nombre de usuario o contraseña incorrectos.');
            }

        } catch (error) {
            setError('Ocurrió un error al intentar iniciar sesión.');
            setError('Comprueba si la API está activa');
        }
        
    };

    return (
        <form onSubmit={handleSubmit} className="loginForm">
            <h1 className="loginH1">Iniciar Sesión</h1>
            <input type="text" value={nombreUsuario} onChange={(e) => setNombreUsuario(e.target.value)} placeholder="Usuario"  className="loginInput" />
            <br/>
            <br/>
            <input type="password" value={contraseña} onChange={(e) => setContraseña(e.target.value)} placeholder="Contraseña"  className="loginInput" />
            <br/>
            <br/>
            <button className="loginButton" type="submit">Iniciar sesión</button>
            {error && <p className="loginError">{error}</p>}    
        </form>
    );
}
