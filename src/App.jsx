import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Navigation from './components/Navigation'
import Modal from './components/Modal'
import SummaryView from './views/SummaryView'
import TasksView from './views/TasksView'
import NewTaskView from './views/NewTaskView'
import useTareas from './hooks/useTareas'

function App() {
  // Vista activa (RF13): 'resumen', 'tareas' o 'nueva'.
  const [vista, setVista] = useState('resumen')
  const {
    tareas,
    tareasVisibles,
    contadores,
    filtro,
    setFiltro,
    busqueda,
    setBusqueda,
    cargando,
    guardando,
    error,
    crearTarea,
    alternarEstado,
    editarTitulo,
    eliminarTarea,
  } = useTareas()
  // Estado local para seleccionar tarea a eliminar en el Modal.
  const [tareaAEliminar, setTareaAEliminar] = useState(null)
  // Mensaje de resultado al crear una tarea.
  const [aviso, setAviso] = useState('')

  const cambiarVista = (nuevaVista) => {
    setAviso('')
    setVista(nuevaVista)
  }

  // Confirmar eliminación desde el Modal RF07.
  const handleConfirmarEliminar = async () => {
    if (tareaAEliminar) {
      await eliminarTarea(tareaAEliminar)
      setTareaAEliminar(null)
    }
  }
  return (
    <main className="app-container">
      <Header title="TaskCampus" description="Gestor de tareas académicas" />
      <Navigation vistaActual={vista} onCambiarVista={cambiarVista} />
      {cargando && <p className="status-message info">
        Cargando tareas...</p>}
      {error && <p className="status-message error">
        Error: {error}</p>}
      {guardando && <p className="status-message warning">
        Sincronizando...</p>}
      {aviso && !error && <p className="status-message success">
        {aviso}</p>}
      {!cargando && (
        <>
          {vista === 'resumen' && (
            <SummaryView
              contadores={contadores}
              filtro={filtro}
              busqueda={busqueda}
              onIrATareas={() => cambiarVista('tareas')}
            />
          )}
          {vista === 'tareas' && (
            <TasksView
              tareasVisibles={tareasVisibles}
              hayTareas={tareas.length > 0}
              filtro={filtro}
              onCambiarFiltro={setFiltro}
              busqueda={busqueda}
              onCambiarBusqueda={setBusqueda}
              onAlternar={alternarEstado}
              onEditar={editarTitulo}
              onEliminar={(id) => setTareaAEliminar(id)}
              deshabilitado={guardando}
            />
          )}
          {vista === 'nueva' && (
            <NewTaskView
              onAgregar={crearTarea}
              guardando={guardando}
              onNavegarATareas={() => {
                setVista('tareas')
                setAviso('Tarea creada correctamente.')
              }}
            />
          )}
        </>
      )}
      <Modal
        visible={tareaAEliminar !== null}
        mensaje="¿Esta seguro de eliminar esta tarea :O ?"
        onConfirmar={handleConfirmarEliminar}
        onCancelar={() => setTareaAEliminar(null)}
        deshabilitado={guardando}
      />
    </main>
  )
}
export default App
