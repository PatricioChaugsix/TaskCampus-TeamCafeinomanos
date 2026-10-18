import TaskSummary from '../components/TaskSummary'
import Button from '../components/Button'

function SummaryView({ contadores, filtro, busqueda, onIrATareas }) {
  return (
    <>
      <TaskSummary contadores={contadores} filtro={filtro} busqueda={busqueda} />

      <section className="card">
        <h2 className="section-title">Acciones</h2>
        <Button label="Ver tareas" onClick={onIrATareas} />
      </section>
    </>
  )
}

export default SummaryView
