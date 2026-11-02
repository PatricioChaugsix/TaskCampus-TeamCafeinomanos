import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav>
      <Link to="/">Inicio</Link>
      <Link to="/catalogo">Catálogo</Link>
      <Link to="/quienes-somos">Quiénes somos</Link>
      <Link to="/contacto">Contacto</Link>
      <Link to="/carrito">Carrito</Link>
      <Link to="/login">Iniciar sesión</Link>
    </nav>
  )
}

export default Navbarimport { Link, useNavigate, useLocation } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

function Navbar() {
  const navigate = useNavigate()
  // hace que el menú se actualice al cambiar de página (por ejemplo, después del login)
  useLocation()
  const usuario = JSON.parse(localStorage.getItem('usuario'))

  async function cerrarSesion() {
    const token = localStorage.getItem('token')
    try {
      await fetch(`${API_URL}/logout/`, {
        method: 'POST',
        headers: { Authorization: `Token ${token}` }
      })
    } catch {
      // si el servidor no responde, igual se borra la sesión del navegador
    }
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    navigate('/')
  }

  return (
    <nav>
      <Link to="/">Inicio</Link>
      <Link to="/catalogo">Catálogo</Link>
      <Link to="/quienes-somos">Quiénes somos</Link>
      <Link to="/contacto">Contacto</Link>
      {!usuario?.es_admin && <Link to="/carrito">Carrito</Link>}
      {usuario?.es_admin && <Link to="/admin">Panel</Link>}
      {usuario ? (
        <>
          <span>Hola, {usuario.nombre}</span>
          <button type="button" onClick={cerrarSesion}>Cerrar sesión</button>
        </>
      ) : (
        <Link to="/login">Iniciar sesión</Link>
      )}
    </nav>
  )
}

export default Navbar