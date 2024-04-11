import React, { useEffect, useState } from 'react'
import {useLocation} from "react-router-dom"
import { getItembyid } from '../heplers/getItembyid';

export const DetallesFutu = () => {

    const [futurama, setFuturama] = useState(null);
    const id_futurama = useLocation().state?.data;

    useEffect(() => {

        const fetchData = async () => {

            try {
                const obtenerDatosPorId = await getItembyid(id_futurama);
                setFuturama(obtenerDatosPorId);
            } catch (error) {
                console.error('Error obteniendo los datos:', error);
            }
        };

        if (id_futurama) {
            fetchData();
        }

    }, [id_futurama]);

    if (!futurama) {
        return (
            
            <>  
                <h1 className='detallesCarga'>Cargando...</h1>
                <center><img className="detallesCargaNave" src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/fd64c447468325.587bdbb1be3bf.gif" alt="Cargando..."></img></center>
            </> 
        )
    }

    return (
        <>
            
            <h3 className='detallesNombre'>{futurama.name}</h3>
            <h3 className='detallesGenero'>{futurama.gender}</h3>
            <h3 className='detallesEspecie'>{futurama.species}</h3>
            <center><img className='detallesImagen' src={futurama.image} alt={futurama.name}></img></center>
        </>
    );
}
