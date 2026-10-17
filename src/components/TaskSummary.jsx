// RF10: todos los números se calculan en useTareas a partir de las tareas.
function TaskSummary({ contadores, filtro, busqueda }) {
  return (
    <section className="card">
      <h2 className="section-title">Resumen</h2>
      <div className="resumen-datos">
        <div className="resumen-dato">
          <span className="resumen-numero">{contadores.total}</span>
          <span>Total</span>
        </div>
        <div className="resumen-dato">
          <span className="resumen-numero">{contadores.pendientes}</span>
          <span>Pendientes</span>
        </div>
        <div className="resumen-dato">
          <span className="resumen-numero">{contadores.completadas}</span>
          <span>Completadas</span>
        </div>
        <div className="resumen-dato">
          <span className="resumen-numero">{contadores.mostradas}</span>
          <span>Mostradas</span>
        </div>
      </div>
      <p className="resumen-filtro">
        Filtro activo: {filtro}
        {busqueda.trim() !== '' && <> · búsqueda: "{busqueda.trim()}"</>}
        {' '}({contadores.mostradas} de {contadores.total})
      </p>
    </section>
  )
}

export default TaskSummary
