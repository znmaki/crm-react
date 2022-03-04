import React, { useEffect, useState } from 'react'
import Formulario from '../components/Formulario'
import { useParams } from 'react-router-dom'

const EditarCliente = () => {

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
  console.log(cliente);
  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'>Editar Cliente</h1>
      <p className="mt-3">Llena los siguientes campos para editar el cliente</p>
      {cliente?.nombre ? (
        <Formulario
          tipo='Editar'
          cliente={cliente}
        />
      ) : <p>Cliente no valido</p>}
    </>
  )
}

export default EditarCliente