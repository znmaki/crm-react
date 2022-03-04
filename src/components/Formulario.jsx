import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react/cjs/react.production.min';

const Formulario = ({ cliente, tipo }) => {

  const navigate = useNavigate();

  const clienteSchema = Yup.object().shape({
    nombre: Yup.string()
      .required('El nombre es obligatorio')
      .min(3, 'El nombre es muy corto')
      .max(30, 'El nombre es muy largo'),

    empresa: Yup.string()
      .required('El nombre de la Empresa es obligatorio'),

    email: Yup.string()
      .required('El email es obligatorio')
      .email('Email no valido'),

    telefono: Yup.number()
      .required('El telefono es obligatorio')
      .typeError('Número no valido')
      .integer('Número no valido')
      .positive('Número no valido'),

    notas: Yup.string()
      .required('La nota es obligatoria'),

  })

  const handleSubmit = async (values) => {
    try {
      let respuesta
      if (cliente.id) {
        const url = `${import.meta.env.VITE_API_URL}/${cliente.id}`;
        respuesta = await fetch(url, {
          method: 'PUT',
          body: JSON.stringify(values),
          headers: {
            'Content-Type': 'application/json'
          }
        })
      } else {
        const url = import.meta.env.VITE_API_URL;
        respuesta = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(values),
          headers: {
            'Content-Type': 'application/json'
          }
        })
      }
      await respuesta.json()
    } catch (error) {
      console.log(error);
    }

    if (tipo === 'Agregar') {
      navigate('/clientes/');
    } else {
      navigate(`/clientes/${cliente.id}`)
    }

  }

  return (
    <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
      <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>{`${tipo} Cliente`}</h1>

      <Formik
        initialValues={{
          nombre: cliente?.nombre ?? '',
          empresa: cliente?.empresa ?? '',
          email: cliente?.email ?? '',
          telefono: cliente?.telefono ?? '',
          notas: cliente?.notas ?? ''
        }}

        enableReinitialize={true}
        validationSchema={clienteSchema}

        onSubmit={async (values, { resetForm }) => {
          await handleSubmit(values);
          resetForm();
        }}
      >
        <Form className='mt-10'>
          <div className='mb-4'>
            <label htmlFor="nombre">Nombre:</label>
            <Field
              type="text"
              id='nombre'
              className='mt-2 block w-full p-3 bg-gray-50'
              placeholder='Nombre del cliente'
              name='nombre'
            />
            <ErrorMessage name="nombre" component='div' className='text-center my-4 bg-red-600 text-white font-bold p-3 uppercase' />
          </div>

          <div className='mb-4'>
            <label htmlFor="empresa">Empresa:</label>
            <Field
              type="text"
              id='empresa'
              className='mt-2 block w-full p-3 bg-gray-50'
              placeholder='Empresa del cliente'
              name='empresa'
            />
            <ErrorMessage name="empresa" component='div' className='text-center my-4 bg-red-600 text-white font-bold p-3 uppercase' />
          </div>

          <div className='mb-4'>
            <label htmlFor="email">E-mail:</label>
            <Field
              type="email"
              id='email'
              className='mt-2 block w-full p-3 bg-gray-50'
              placeholder='E-mail del cliente'
              name='email'
            />
            <ErrorMessage name="email" component='div' className='text-center my-4 bg-red-600 text-white font-bold p-3 uppercase' />
          </div>

          <div className='mb-4'>
            <label htmlFor="telefono">Teléfono:</label>
            <Field
              type="tel"
              id='telefono'
              className='mt-2 block w-full p-3 bg-gray-50'
              placeholder='Teléfono del cliente'
              name='telefono'
            />
            <ErrorMessage name="telefono" component='div' className='text-center my-4 bg-red-600 text-white font-bold p-3 uppercase' />
          </div>

          <div className='mb-4'>
            <label htmlFor="notas">Notas:</label>
            <Field
              as='textarea'
              type="text"
              id='notas'
              className='mt-2 block w-full p-3 bg-gray-50 h-40'
              placeholder='Notas del cliente'
              name='notas'
            />
            <ErrorMessage name="notas" component='div' className='text-center my-4 bg-red-600 text-white font-bold p-3 uppercase' />
          </div>

          <input
            type='submit'
            value={`${tipo} Cliente`}
            className='cursor-pointer mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg hover:bg-blue-300 hover:text-black'
          />
        </Form>
      </Formik>
    </div >
  )
}

Formulario.defaultProps = {
  cliente: {}
}

export default Formulario