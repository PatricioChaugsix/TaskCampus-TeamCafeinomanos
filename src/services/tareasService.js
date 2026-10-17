const API_URL = "https://jsonplaceholder.typicode.com/todos";

// Cargar las tareas desde la API (GET).
export const getTareas = async (limite = 10) => {
  const res = await fetch(`${API_URL}?_limit=${limite}`);
  if (!res.ok) throw new Error(`Error al obtener las tareas de la API (código ${res.status})`);
  return await res.json();
};

// Actualizar una tarea existente (PUT).
export const putTarea = async (id, datos) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });
  if (!res.ok) throw new Error(`Error al actualizar la tarea en la API (código ${res.status})`);
  return await res.json();
};
// Crear una nueva tarea (POST).
export const postTarea = async (titulo) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: titulo,
      completed: false,
      userId: 1,
    }),
  });
  if (!res.ok) throw new Error(`Error al crear la tarea en la API (código ${res.status})`);
  return await res.json();
};

// Eliminar una tarea (DELETE).
export const deleteTarea = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`Error al eliminar la tarea en la API (código ${res.status})`);
  return true;
};