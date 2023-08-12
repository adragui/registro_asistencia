import React, { useState } from 'react';
import Turno from './Turno'
import Empleado from './Empleado';
import ListaAsistencia from './ListaAsistencia';
import PanelControl from './PanelControl';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function App() {
    const [empleados, setEmpleados] = useState([]);
    const [turno, setTurno] = useState('');

    const handleTurnoSelected = (turnoSeleccionado, empleadosTurno) => {
        setEmpleados(empleadosTurno);
        setTurno(turnoSeleccionado);
    }

    return (
        <Router>
            <div className="App bg-indigo-100 p-4 h-screen w-screen">
                <h1 className="text-4xl font-bold text-indigo-700 mb-6">Registro de asistencia</h1>
                <div className="container mx-auto max-w-screen-lg bg-white p-6 rounded-lg shadow-md">
                    <nav>
                        <ul className="flex space-x-6 justify-end">
                            <li>
                                <Link className="text-blue-500 hover:text-blue-700 transition duration-200 ease-in-out hover:underline" to="/">Home</Link>
                            </li>
                            <li>
                                <Link className="text-blue-500 hover:text-blue-700 transition duration-200 ease-in-out hover:underline" to="/panelcontrol">Panel de Control</Link>
                            </li>
                        </ul>
                    </nav>
                    <Routes>
                        <Route path="/panelcontrol" element={<PanelControl />} />
                        <Route path="/" element={
                            <>
                                <Turno onTurnoSelected={handleTurnoSelected}/>
                                {empleados.length > 0 && <Empleado empleados={empleados} turno={turno}/> }
                                <ListaAsistencia />
                            </>
                        } />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
