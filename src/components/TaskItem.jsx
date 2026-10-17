import { useState } from "react";
import Button from "./Button";

const TaskItem = ({ tarea, onToggle, onEditar, onEliminar, deshabilitado }) => {
  const [editando, setEditando] = useState(false);
  const [nuevoTitulo, setNuevoTitulo] = useState(tarea.titulo);
  const [errorEdicion, setErrorEdicion] = useState("");
  const handleGuardarEdicion = async () => {
    const tituloLimpio = nuevoTitulo.trim();
    if (tituloLimpio.length < 3) {
      setErrorEdicion("Mínimo 3 caracteres.");
      return;
    }
    setErrorEdicion("");
    setEditando(false);
    if (tituloLimpio !== tarea.titulo) {
      const ok = await onEditar(tarea.id, tituloLimpio);
      // si la API falla se vuelve al título anterior
      if (!ok) setNuevoTitulo(tarea.titulo);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleGuardarEdicion();
    if (e.key === "Escape") {
      setNuevoTitulo(tarea.titulo);
      setErrorEdicion("");
      setEditando(false);
    }
  };
  let textoBadge = "pendiente";
  let claseBadge = "badge badge-warning";
  let claseTitulo = "task-title";
  if (tarea.completada) {
    textoBadge = "completada";
    claseBadge = "badge badge-success";
    claseTitulo = "task-title completada";
  }
  let textoBoton = "Completar";
  let varianteBoton = "primary";
  if (tarea.completada) {
    textoBoton = "Desmarcar";
    varianteBoton = "secondary";
  }

  return (
    <li className="task-item">
      <div className="task-info">
        <span
          className={claseBadge}
          onClick={() => !deshabilitado && onToggle(tarea.id)}>
          {textoBadge}
        </span>
        {editando && (
          <div className="task-edit">
            <input
              type="text"
              value={nuevoTitulo}
              onChange={(e) => setNuevoTitulo(e.target.value)}
              onBlur={handleGuardarEdicion}
              onKeyDown={handleKeyDown}
              disabled={deshabilitado}
              autoFocus
            />
            {errorEdicion && <span className="error-text">{errorEdicion}</span>}
          </div>
        )}
        {!editando && (
          <span
            className={claseTitulo}
            onDoubleClick={() => {
              if (deshabilitado) return;
              setNuevoTitulo(tarea.titulo);
              setEditando(true);
            }}
            title="Doble clic para editar el título">
            {tarea.titulo}
          </span>
        )}
      </div>
      <div className="task-actions">
        <Button
          label={textoBoton}
          variant={varianteBoton}
          onClick={() => onToggle(tarea.id)}
          disabled={deshabilitado}
        />
        <Button
          label="Eliminar"
          variant="danger"
          onClick={() => onEliminar(tarea.id)}
          disabled={deshabilitado}
        />
      </div>
    </li>
  );
};
export default TaskItem;
