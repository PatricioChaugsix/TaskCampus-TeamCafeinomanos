import TaskFilters from '../components/TaskFilters'
import TaskList from '../components/TaskList'

function TasksView({
  tareasVisibles,
  hayTareas,
  filtro,
  onCambiarFiltro,
  busqueda,
  onCambiarBusqueda,
  onAlternar,
  onEditar,
  onEliminar,
  deshabilitado,
}) {
  return (
    <>
      <TaskFilters
        filtro={filtro}
        onCambiarFiltro={onCambiarFiltro}
        busqueda={busqueda}
        onCambiarBusqueda={onCambiarBusqueda}
      />
      <TaskList
        title="Listado de tareas"
        tareas={tareasVisibles}
        hayTareas={hayTareas}
        onAlternar={onAlternar}
        onEditar={onEditar}
        onEliminar={onEliminar}
        deshabilitado={deshabilitado}
      />
    </>
  )
}

export default TasksView
