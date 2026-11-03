import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

function Registro() {
  const navigate = useNavigate()
  const location = useLocation()
  // si venía del carrito, después de registrarse vuelve ahí
  const desde = location.state?.desde || '/'

  const [datos, setDatos] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    confirmar: ''
  })
  const [errores, setErrores] = useState({})
  const [errorServidor, setErrorServidor] = useState('')
  const [enviando, setEnviando] = useState(false)

  function cambiar(e) {
    setDatos({ ...datos, [e.target.name]: e.target.value })
  }

  function validar() {
    const nuevos = {}
    if (!datos.nombre.trim()) nuevos.nombre = 'Ingresa tu nombre'
    if (!datos.apellido.trim()) nuevos.apellido = 'Ingresa tu apellido'
    if (!datos.email.trim()) {
      nuevos.email = 'Ingresa tu correo'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.email.trim())) {
      nuevos.email = 'El correo no tiene un formato válido'
    }
    if (datos.password.length < 8) nuevos.password = 'La contraseña debe tener al menos 8 caracteres'
    if (datos.confirmar !== datos.password) nuevos.confirmar = 'Las contraseñas no coinciden'
    return nuevos
  }

  async function enviar(e) {
    e.preventDefault()
    setErrorServidor('')

    const nuevos = validar()
    setErrores(nuevos)
    if (Object.keys(nuevos).length > 0) return

    setEnviando(true)
    try {
      const respuesta = await fetch(`${API_URL}/registro/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: datos.nombre.trim(),
          apellido: datos.apellido.trim(),
          email: datos.email.trim(),
          password: datos.password
        })
      })
      const resultado = await respuesta.json()

      if (!respuesta.ok) {
        // el backend manda un texto o una lista de mensajes
        const mensaje = Array.isArray(resultado.error) ? resultado.error.join(' ') : resultado.error
        setErrorServidor(mensaje || 'No se pudo crear la cuenta.')
        return
      }

      localStorage.setItem('token', resultado.token)
      localStorage.setItem('usuario', JSON.stringify(resultado.usuario))
      navigate(desde)
    } catch {
      setErrorServidor('No se pudo conectar con el servidor. Intenta de nuevo.')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="mb-4">Crear cuenta</h1>

          {errorServidor && <div className="alert alert-danger">{errorServidor}</div>}

          <form onSubmit={enviar} noValidate>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">Nombre</label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
                value={datos.nombre}
                onChange={cambiar}
              />
              {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="apellido" className="form-label">Apellido</label>
              <input
                id="apellido"
                name="apellido"
                type="text"
                className={`form-control ${errores.apellido ? 'is-invalid' : ''}`}
                value={datos.apellido}
                onChange={cambiar}
              />
              {errores.apellido && <div className="invalid-feedback">{errores.apellido}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Correo</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className={`form-control ${errores.email ? 'is-invalid' : ''}`}
                value={datos.email}
                onChange={cambiar}
              />
              {errores.email && <div className="invalid-feedback">{errores.email}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                className={`form-control ${errores.password ? 'is-invalid' : ''}`}
                value={datos.password}
                onChange={cambiar}
              />
              {errores.password && <div className="invalid-feedback">{errores.password}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="confirmar" className="form-label">Repetir contraseña</label>
              <input
                id="confirmar"
                name="confirmar"
                type="password"
                autoComplete="new-password"
                className={`form-control ${errores.confirmar ? 'is-invalid' : ''}`}
                value={datos.confirmar}
                onChange={cambiar}
              />
              {errores.confirmar && <div className="invalid-feedback">{errores.confirmar}</div>}
            </div>

            <button type="submit" className="btn btn-primary w-100" disabled={enviando}>
              {enviando ? 'Creando cuenta...' : 'Crear cuenta'}
            </button>
          </form>

          <p className="mt-3">
            ¿Ya tienes cuenta? <Link to="/login" state={{ desde }}>Inicia sesión</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Registro