import { useState, useEffect } from "react";
import {
  getTareas,
  postTarea,
  putTarea,
  deleteTarea,
} from "../services/tareasService";

const useTareas = () => {
  const [tareas, setTareas] = useState([]);
  const [cargando, setCargando] = useState(true);
  //indicador de operación En Curso.
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState(null);
  // Filtro de estado y búsqueda (RF08 y RF09). Viven aquí para que no se pierdan al cambiar de vista.
  const [filtro, setFiltro] = useState("todas");
  const [busqueda, setBusqueda] = useState("");

  // Carga inicial de RF01.
  useEffect(() => {
    const cargarIniciales = async () => {
      setCargando(true);
      setError(null);
      try {
        const datos = await getTareas(10);
        const formateadas = datos.map((item) => ({
          id: item.id,
          idRemoto: item.id,
          titulo: item.title,
          completada: item.completed,
        }));
        setTareas(formateadas);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };
    cargarIniciales();
  }, []);

  // Crear tarea (RF03).
  // JSONPlaceholder siempre responde con id 201, por eso el id local se genera con Date.now()
  // y el id de la API se guarda aparte en idRemoto.
  const crearTarea = async (titulo) => {
    setGuardando(true);
    setError(null);
    try {
      const nuevaAPI = await postTarea(titulo);
      const nuevaTareaLocal = {
        id: Date.now(),
        idRemoto: nuevaAPI.id,
        titulo: nuevaAPI.title,
        completada: nuevaAPI.completed,
      };
      setTareas((prev) => [nuevaTareaLocal, ...prev]);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setGuardando(false);
    }
  };

  // Cambiar estado completada/pendiente RF05.
  // Solo se actualiza el estado si la API responde bien, si falla se muestra el error.
  const alternarEstado = async (id) => {
    const tareaActual = tareas.find((t) => t.id === id);
    if (!tareaActual) return;
    setGuardando(true);
    setError(null);
    try {
      await putTarea(tareaActual.idRemoto, {
        title: tareaActual.titulo,
        completed: !tareaActual.completada,
      });
      setTareas((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, completada: !t.completada } : t
        )
      );
    } catch (err) {
      setError(`No se pudo cambiar el estado de "${tareaActual.titulo}". ${err.message}`);
    } finally {
      setGuardando(false);
    }
  };

  // Editar título RF06.
  const editarTitulo = async (id, nuevoTitulo) => {
    const tareaActual = tareas.find((t) => t.id === id);
    if (!tareaActual) return false;
    setGuardando(true);
    setError(null);
    try {
      await putTarea(tareaActual.idRemoto, {
        title: nuevoTitulo,
        completed: tareaActual.completada,
      });
      setTareas((prev) =>
        prev.map((t) => (t.id === id ? { ...t, titulo: nuevoTitulo } : t)));
      return true;
    } catch (err) {
      setError(`No se pudo editar "${tareaActual.titulo}". ${err.message}`);
      return false;
    } finally {
      setGuardando(false);
    }
  };

  // Eliminar tarea RF07.
  const eliminarTarea = async (id) => {
    const tareaActual = tareas.find((t) => t.id === id);
    if (!tareaActual) return;
    setGuardando(true);
    setError(null);
    try {
      await deleteTarea(tareaActual.idRemoto);
      setTareas((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(`No se pudo eliminar "${tareaActual.titulo}". ${err.message}`);
    } finally {
      setGuardando(false);
    }
  };

  // Estado derivado: no se guarda en useState, se calcula cada vez desde tareas, filtro y busqueda.
  const texto = busqueda.trim().toLowerCase();
  const tareasVisibles = tareas.filter((t) => {
    if (filtro === "pendientes" && t.completada) return false;
    if (filtro === "completadas" && !t.completada) return false;
    return t.titulo.toLowerCase().includes(texto);
  });

  const completadas = tareas.filter((t) => t.completada).length;
  const contadores = {
    total: tareas.length,
    pendientes: tareas.length - completadas,
    completadas,
    mostradas: tareasVisibles.length,
  };

  return {
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
  };
};
export default useTareas;