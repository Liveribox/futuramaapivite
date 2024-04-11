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
                console.error('Error obteniendo datos:', error);
            }
        };

        if (id_futurama) {
            fetchData();
        }

    }, [id_futurama]);

    if (!futurama) {
        return <h1>Cargando...</h1>
    }

    return (
        <>
            <h1 className='detalles'>Detalles</h1>
            <h1 className='detallesNombre'>{futurama.name}</h1>
            <h1 className='detallesGenero'>{futurama.gender}</h1>
            <h1 className='detallesEspecie'>{futurama.species}</h1>
            <img className='detallesImagen' src={futurama.image} alt={futurama.name}></img>
        </>
    );
}
