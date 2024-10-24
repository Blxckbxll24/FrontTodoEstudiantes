import React, { useState } from 'react';
import '../App.css';

interface Persona {
    nombre: string;
    edad: number;
    isStudent: boolean;
    direccion: string;
    hobbies: string;
}

function Formulario() {
    const [nombre, setNombre] = useState<string>('');
    const [edad, setEdad] = useState<number | undefined>(undefined);
    const [isStudent, setIsStudent] = useState<boolean>(false);
    const [direccion, setDireccion] = useState<string>('');
    const [hobbies, setHobbies] = useState<string>('');
    const [personas, setPersonas] = useState<Persona[]>([]);
    const [error, setError] = useState<string>('');
    // Función para manejar el envío del formulario
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Validar que los campos no estén vacíos
        if (!nombre || !edad || !direccion || !hobbies) {
            setError('Por favor, rellena todos los campos antes de enviar.');
            return;
        }

        const nuevaPersona: Persona = {
            nombre,
            edad: edad || 0,
            isStudent,
            direccion,
            hobbies,
        };

        // Agregar la nueva persona a la lista de personas
        setPersonas([...personas, nuevaPersona]);

        // Limpiar los campos después de agregar
        setNombre('');
        setEdad(undefined);
        setIsStudent(false);
        setDireccion('');
        setHobbies('');
        setError(''); 
    };

    return (
        <div className='contenedor'>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6">
                        <h1 className="text-primary mb-4">Formulario de Registro</h1>
                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="border p-4 shadow-sm rounded bg-light">
                            <div className="mb-3">
                                <label className="form-label">Nombre</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="nombre"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Edad</label>
                                <input
                                    type="numeric"
                                    className="form-control"
                                    placeholder="edad"
                                    value={edad}
                                    onChange={(e) => setEdad(Number(e.target.value))}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">¿Es estudiante?</label>
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        checked={isStudent}
                                        onChange={() => setIsStudent(!isStudent)}
                                    />
                                    <label className="form-check-label">Sí</label>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Dirección</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="direccion"
                                    value={direccion}
                                    onChange={(e) => setDireccion(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Hobbies</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="hobbies"
                                    value={hobbies}
                                    onChange={(e) => setHobbies(e.target.value)}
                                />
                            </div>

                            <button type="submit" className="btn btn-primary w-100">
                                Guardar
                            </button>
                        </form>
                    </div>

                    <div className="col-md-6">
                        <h2 className="text-secondary mb-4">Lista de Personas Registradas</h2>
                        <ul className="list-group">
                            {personas.map((persona, index) => (
                                <li key={index} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                                    <div>
                                        <strong>Nombre:</strong> {persona.nombre}<br />
                                        <strong>Edad:</strong> {persona.edad}<br />
                                        <strong>Estudiante:</strong> {persona.isStudent ? 'Sí' : 'No'}<br />
                                        <strong>Dirección:</strong> {persona.direccion}<br />
                                        <strong>Hobbies:</strong> {persona.hobbies}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Formulario;
