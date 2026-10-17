import './App.css'
import Header from './components/Header'
import TaskSummary from './components/TaskSummary'
import TaskList from './components/TaskList'
import Button from './components/Button'

function App() {
  function reviewTasks() {
    alert('Tienes 3 tareas pendientes por revisar')
  }
  return (
    <main className="app-container">
      <Header
        title="TaskCampus"
        description="Gestor de tareas académicas"
      />
      <TaskSummary total={3} />
      <TaskList title="Listado de tareas de hoy" />
      <Button onReview={reviewTasks} />
    </main>
  )
}
export default App
