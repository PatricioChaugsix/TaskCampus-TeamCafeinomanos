import TaskForm from "../components/TaskForm";

const NewTaskView = ({ onAgregar, guardando, onNavegarATareas }) => {
  const handleAgregarYRedirigir = async (titulo) => {
    const exito = await onAgregar(titulo);
    if (exito) {
      onNavegarATareas();
    }
    return exito;
  };
  return <TaskForm onAgregar={handleAgregarYRedirigir} guardando={guardando} />;
};
export default NewTaskView;