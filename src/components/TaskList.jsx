import TaskItem from './TaskItem'

function TaskList({ title, tareas, hayTareas, onAlternar, onEditar, onEliminar, deshabilitado }) {
  return (
    <section className="card">
      <h2 className="section-title">{title}</h2>
      {!hayTareas && <p className="lista-vacia">
        No hay tareas todavía.</p>}
      {hayTareas && tareas.length === 0 && (
        <p className="lista-vacia">
          Ninguna tarea coincide con el filtro o la búsqueda.</p>
      )}
      {tareas.length > 0 && (
        <ul className="task-list">
          {tareas.map((tarea) => (
            <TaskItem
              key={tarea.id}
              tarea={tarea}
              onToggle={onAlternar}
              onEditar={onEditar}
              onEliminar={onEliminar}
              deshabilitado={deshabilitado}
            />
          ))}
        </ul>
      )}
    </section>
  )
}

export default TaskList
