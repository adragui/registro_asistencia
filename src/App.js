import React, { useState } from 'react';
import Turno from './Turno'
import Empleado from './Empleado';
import ListaAsistencia from './ListaAsistencia';

function App() {
    const [empleados, setEmpleados] = useState([]);
    const [turno, setTurno] = useState('');

    const handleTurnoSelected = (turnoSeleccionado, empleadosTurno) => {
        setEmpleados(empleadosTurno);
        setTurno(turnoSeleccionado);
    }

    return (
        <div className="App bg-indigo-100 p-4">
            <h1 className="text-4xl font-bold text-indigo-700 mb-6">Registro de asistencia</h1>
            <div className="container mx-auto max-w-screen-lg bg-white p-6 rounded-lg shadow-md">
                <Turno onTurnoSelected={handleTurnoSelected}/>
                { empleados.length > 0 && <Empleado empleados={empleados} turno={turno}/> }
                <ListaAsistencia />
            </div>
        </div>
    );
}

export default App;