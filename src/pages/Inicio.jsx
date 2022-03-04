import React, { useEffect, useState } from 'react'
import Cliente from '../components/Cliente'
import swal from '@sweetalert/with-react'
import Spinner from '../components/Spinner'

const Inicio = () => {

  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerCliente = async () => {
      const url = 'http://localhost:4000/clientes';
      const consulta = await fetch(url);
      const respuesta = await consulta.json();
      setClientes(respuesta);
      setCargando(false);
    }
    obtenerCliente()
  }, [])

  const handleEliminar = id => {

    const eliminar = async () => {
      try {
        const url = `http://localhost:4000/clientes/${id}`;
        const respuesta = await fetch(url, {
          method: 'DELETE'
        })
        await respuesta.json()

        const listaActualizada = clientes.filter(cliente => cliente.id !== id)
        setClientes(listaActualizada)
      } catch (error) {
        console.log(error);
      }
    }

    swal({
      title: "Esta seguro(a)?",
      text: "Una vez eliminado, ¡no podrá recuperar esta informacion del cliente! ",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          eliminar()
        } else {
          swal("La informacion del Cliente no ha sido borrada");
        }
      });
  }

  return (
    cargando ? <Spinner /> :
      clientes.length === 0 ? <h1 className='font-black text-4xl text-blue-900'>No hay clientes para mostrar</h1> : (
        <>
          <h1 className='font-black text-4xl text-blue-900'>Clientes</h1>
          <p className='mt-3'>Administra tus Clientes</p>
          <table className='w-full mt-5 table-auto shadow bg-white rounded-lg overflow-hidden'>
            <thead className='bg-blue-800 text-white'>
              <tr>
                <th className='p-2'>Nombre</th>
                <th className='p-2'>Contacto</th>
                <th className='p-2'>Empresa</th>
                <th className='p-2'>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {clientes.map(cliente => (
                <Cliente
                  key={cliente.id}
                  cliente={cliente}
                  handleEliminar={handleEliminar}
                />
              ))}
            </tbody>
          </table>
        </>
      )
  )
}

export default Inicio