import { useState } from "react";
import Button from "./Button";

const TaskForm = ({ onAgregar, guardando }) => {
  const [titulo, setTitulo] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Mínimo 3 caracteres limpios
    if (titulo.trim().length < 3) {
      setError("El minimo del titulo es de 3 caracteres.");
      return;
    }
    // Se ejecuta la función (agregar) desde NewTaskView
    const exito = await onAgregar(titulo.trim());
    if (exito) {
      setTitulo("");
      setError("");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="card">
      <h2 className="section-title">
        AGREGAR NUEVA TAREA
      </h2>
      <div className="form-row">
        <input
          type="text"
          className="form-input"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Ej: Estudiar para prueba de Física"
          disabled={guardando}
        />
        <Button
          type="submit"
          label={guardando ? "Guardando..." : "Agregar"}
          disabled={guardando}
        />
      </div>
      {error && <p className="form-error">{error}</p>}
    </form>
  );
};
export default TaskForm;