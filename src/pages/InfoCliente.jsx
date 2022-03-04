import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from '../components/Spinner';

const InfoCliente = () => {
    const [cliente, setCliente] = useState({});
    const [cargando, setCargando] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const verInfo = async () => {
            try {
                const url = `${import.meta.env.VITE_API_URL}/${id}`;
                const consulta = await fetch(url);
                const respuesta = await consulta.json();
                setCliente(respuesta);
            } catch (error) {
                console.log(error);
            }
            setCargando(false);
        }

        verInfo()
    }, [])

    console.log(cargando);
    return (

        cargando ? <Spinner/> :
            Object.keys(cliente).length === 0 ?
                <p>No Hay Resultados</p> : (
                    <div>
                        <h1 className='font-black text-4xl text-blue-900'>Información del Cliente</h1>
                        <p className='text-4xl text-gray-600 mt-3'>
                            <span className='text-gray-800 uppercase font-bold'>Nombre: </span>{cliente.nombre}
                        </p>
                        <p className='text-2xl text-gray-600 mt-4'>
                            <span className='text-gray-800 uppercase font-bold'>Email: </span>{cliente.email}
                        </p>
                        <p className='text-2xl text-gray-600 mt-4'>
                            <span className='text-gray-800 uppercase font-bold'>Teléfono: </span>{cliente.telefono}
                        </p>
                        <p className='text-2xl text-gray-600 mt-4'>
                            <span className='text-gray-800 uppercase font-bold'>Empresa: </span>{cliente.empresa}
                        </p>
                        <p className='text-2xl text-gray-600 mt-4'>
                            <span className='text-gray-800 uppercase font-bold'>Notas: </span>{cliente.notas}
                        </p>
                    </div>
                )
    )
}

export default InfoCliente