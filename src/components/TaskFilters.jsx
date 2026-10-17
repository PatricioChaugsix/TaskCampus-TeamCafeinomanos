import Button from "./Button";

const opciones = [
  { valor: "todas", texto: "Todas" },
  { valor: "pendientes", texto: "Pendientes" },
  { valor: "completadas", texto: "Completadas" },
];

// Filtro por estado (RF08) y búsqueda por título (RF09).
const TaskFilters = ({ filtro, onCambiarFiltro, busqueda, onCambiarBusqueda }) => {
  return (
    <div className="filtros">
      <div className="filtros-estado">
        {opciones.map((op) => (
          <Button
            key={op.valor}
            label={op.texto}
            variant={filtro === op.valor ? "primary" : "secondary"}
            onClick={() => onCambiarFiltro(op.valor)}
          />
        ))}
      </div>
      <input
        type="search"
        className="form-input buscador"
        placeholder="Buscar por título..."
        value={busqueda}
        onChange={(e) => onCambiarBusqueda(e.target.value)}
      />
    </div>
  );
};
export default TaskFilters;
