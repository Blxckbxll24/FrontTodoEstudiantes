// import React, { useReducer, useCallback, useMemo, useState } from 'react';

// // Definir el tipo de una tarea
// interface Task {
//   id: number;
//   text: string;
//   completed: boolean;
// }

// // Definir el estado inicial y acciones para el reducer
// type State = Task[];

// type Action =
//   | { type: 'add'; payload: string }
//   | { type: 'toggle'; payload: number };

// const initialState: State = []; 

// // Reducer para manejar el estado de las tareas
// const todoReducer = (state: State, action: Action): State => {
//   switch (action.type) {
//     case 'add':
//       return [
//         ...state,
//         { id: Date.now(), text: action.payload, completed: false },
//       ];
//     case 'toggle':
//       return state.map((task) =>
//         task.id === action.payload
//           ? { ...task, completed: !task.completed }
//           : task
//       );
//     default:
//       return state;
//   }
// };

// // Componente principal
// const TodoList: React.FC = () => {
//   const [state, dispatch] = useReducer(todoReducer, initialState); //maneja estado de tareas 
//   const [newTask, setNewTask] = useState('');

//   // useCallback para agregar una tarea
//   const addTask = useCallback(() => {
//     if (newTask.trim() !== '') {
//       dispatch({ type: 'add', payload: newTask });
//       setNewTask('');
//     }
//   }, [newTask]);

//   // useMemo para filtrar tareas completadas y no completadas
//   const completedTasks = useMemo(
//     () => state.filter((task) => task.completed),
//     [state]
//   );

//   const incompleteTasks = useMemo(
//     () => state.filter((task) => !task.completed),
//     [state]
//   );

//   // Manejador para el checkbox de cada tarea
//   const toggleTask = (id: number) => {
//     dispatch({ type: 'toggle', payload: id });
//   };

//   return (
//     <div>
//       <h1>ToDo List</h1>

//       {/* Input para agregar nueva tarea */}
//       <div>
//         <input
//           type="text"
//           value={newTask}
//           onChange={(e) => setNewTask(e.target.value)}
//           placeholder="Add a new task"
//         />
//         <button onClick={addTask}>Add Task</button>
//       </div>

//       {/* Lista de tareas incompletas */}
//       <h2>Incomplete Tasks</h2>
//       <ul>
//         {incompleteTasks.map((task) => (
//           <li key={task.id}>
//             <label>
//               <input
//                 type="checkbox"
//                 checked={task.completed}
//                 onChange={() => toggleTask(task.id)}
//               />
//               {task.text}
//             </label>
//           </li>
//         ))}
//       </ul>

//       {/* Lista de tareas completadas */}
//       <h2>Completed Tasks</h2>
//       <ul>
//         {completedTasks.map((task) => (
//           <li key={task.id}>
//             <label>
//               <input
//                 type="checkbox"
//                 checked={task.completed}
//                 onChange={() => toggleTask(task.id)}
//               />
//               {task.text}
//             </label>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TodoList;

import React, { useState, useEffect } from "react";

interface Estudiante {
  id: number;
  nombre: string;
  edad: number;
  correo: string;
}

const TodoList = () => {
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const [nuevoEstudiante, setNuevoEstudiante] = useState<Omit<Estudiante, "id">>({
    nombre: "",
    edad: 0,
    correo: "",
  });
  const [editEstudiante, setEditEstudiante] = useState<Estudiante | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchEstudiantes = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://localhost:7183/api/estudiante");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (Array.isArray(data.result)) {
        setEstudiantes(data.result);
      } else {
        console.error("Datos de estudiantes no son un array:", data);
        setEstudiantes([]);
      }
    } catch (error) {
      console.error("Error fetching students", error);
      setEstudiantes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEstudiantes();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNuevoEstudiante({
      ...nuevoEstudiante,
      [e.target.name]: e.target.value,
    });
  };

  const addEstudiante = async () => {
    // Validación para campos vacíos
    if (!nuevoEstudiante.nombre || nuevoEstudiante.edad <= 0 || !nuevoEstudiante.correo) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    // Validación de formato de correo electrónico
    if (!/\S+@\S+\.\S+/.test(nuevoEstudiante.correo)) {
      alert("Por favor, ingresa un correo electrónico válido.");
      return;
    }

    try {
      const response = await fetch("https://localhost:7183/api/estudiante", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoEstudiante),
      });
      const data = await response.json();
      if (response.ok) {
        setEstudiantes([...estudiantes, data]);
        setNuevoEstudiante({ nombre: "", edad: 0, correo: "" }); // Limpiar campos después de agregar
        fetchEstudiantes();
      } else {
        console.error("Error adding student:", data);
      }
    } catch (error) {
      console.error("Error adding student", error);
    }
  };

  const updateEstudiante = async (id: number) => {
    if (!editEstudiante || !editEstudiante.nombre || editEstudiante.edad <= 0 || !editEstudiante.correo) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    // Validación de formato de correo electrónico
    if (!/\S+@\S+\.\S+/.test(editEstudiante.correo)) {
      alert("Por favor, ingresa un correo electrónico válido.");
      return;
    }
    
    try {
      const response = await fetch(`https://localhost:7183/api/estudiante/update-estudiante`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editEstudiante),
      });
      if (response.ok) {
        setEstudiantes(
          estudiantes.map((estudiante) =>
            estudiante.id === id ? editEstudiante : estudiante
          )
        );
        setEditEstudiante(null);
        setNuevoEstudiante({ nombre: "", edad: 0, correo: "" }); // Limpiar campos después de editar
      } else {
        console.error("Error updating student:", await response.json());
      }
    } catch (error) {
      console.error("Error updating student", error);
    }
  };

  const deleteEstudiante = async (id: number) => {
    try {
      const response = await fetch(`https://localhost:7183/api/estudiante/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setEstudiantes(estudiantes.filter((estudiante) => estudiante.id !== id));
      } else {
        console.error("Error deleting student:", await response.json());
      }
    } catch (error) {
      console.error("Error deleting student", error);
    }
  };

  const handleEditClick = (estudiante: Estudiante) => {
    setEditEstudiante(estudiante);
    setNuevoEstudiante({ nombre: estudiante.nombre, edad: estudiante.edad, correo: estudiante.correo });
  };

  const handleBackToAdd = () => {
    setEditEstudiante(null); // Volver al modo de agregar
    setNuevoEstudiante({ nombre: "", edad: 0, correo: "" }); // Limpiar campos
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Todo List - Estudiantes</h1>
      {loading ? (
        <p className="text-center">Cargando...</p>
      ) : (
        <>
          {estudiantes.length > 0 ? (
            <ul className="list-group mb-4">
              {estudiantes.map((estudiante) => (
                <li className="list-group-item d-flex justify-content-between align-items-center" key={estudiante.id}>
                  <span>
                    {estudiante.nombre} ({estudiante.edad} años) - {estudiante.correo}
                  </span>
                  <div>
                    <button className="btn btn-danger btn-sm mx-1" onClick={() => deleteEstudiante(estudiante.id)}>Eliminar</button>
                    <button className="btn btn-warning btn-sm" onClick={() => handleEditClick(estudiante)}>Editar</button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay estudiantes disponibles.</p>
          )}
        </>
      )}

      {/* Formulario para agregar un nuevo estudiante */}
      {!editEstudiante ? (
        <div className="mb-4">
          <h2>Agregar Estudiante</h2>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="nombre"
              value={nuevoEstudiante.nombre}
              onChange={handleChange}
              placeholder="Nombre"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              className="form-control"
              name="edad"
              value={nuevoEstudiante.edad}
              onChange={handleChange}
              placeholder="Edad"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email" // Asegurarse de que el tipo sea "email"
              className="form-control"
              name="correo"
              value={nuevoEstudiante.correo}
              onChange={handleChange}
              placeholder="Correo"
              required
            />
          </div>
          <button className="btn btn-primary" onClick={addEstudiante}>Agregar</button>
        </div>
      ) : (
        <div>
          <h2>Editar Estudiante</h2>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="nombre"
              value={editEstudiante.nombre}
              onChange={(e) =>
                setEditEstudiante({ ...editEstudiante, nombre: e.target.value })
              }
              placeholder="Nombre"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              className="form-control"
              name="edad"
              value={editEstudiante.edad}
              onChange={(e) =>
                setEditEstudiante({ ...editEstudiante, edad: parseInt(e.target.value) })
              }
              placeholder="Edad"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email" // Asegurarse de que el tipo sea "email"
              className="form-control"
              name="correo"
              value={editEstudiante.correo}
              onChange={(e) =>
                setEditEstudiante({ ...editEstudiante, correo: e.target.value })
              }
              placeholder="Correo"
              required
            />
          </div>
          <button className="btn btn-warning" onClick={() => updateEstudiante(editEstudiante.id)}>
            Actualizar
          </button>
          <button className="btn btn-secondary ml-2" onClick={handleBackToAdd}>
            Volver a Agregar
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoList;
