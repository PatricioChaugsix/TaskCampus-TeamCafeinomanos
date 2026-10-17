const vistas = [
  { id: 'resumen', nombre: 'Resumen' },
  { id: 'tareas', nombre: 'Tareas' },
  { id: 'nueva', nombre: 'Nueva tarea' },
]

function Navigation({ vistaActual, onCambiarVista }) {
  return (
    <nav className="navigation">
      {vistas.map((vista) => (
        <button
          key={vista.id}
          onClick={() => onCambiarVista(vista.id)}
          className={vista.id === vistaActual ? 'nav-button nav-button-active' : 'nav-button'}
        >
          {vista.nombre}
        </button>
      ))}
    </nav>
  )
}

export default Navigation
