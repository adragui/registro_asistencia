import React, { useEffect, useState } from 'react';
import {db} from './firebase';
import { collection, getDocs } from 'firebase/firestore';

function Turno({ onTurnoSelected }) {
    const [empleadosPorTurno, setEmpleadosPorTurno] = useState({});

    useEffect(() => {
        const fetchData = async() => {
            const turnosCol = collection(db, 'turnos');
            const turnosSnapshot = await getDocs(turnosCol);
            let turnos = {};
            turnosSnapshot.forEach(doc => turnos[doc.id] = doc.data().empleados);
            setEmpleadosPorTurno(turnos);
        }

        fetchData();
    }, []);

    const handleTurnoChange = e => {
        if (e.target.value) {
            onTurnoSelected(e.target.value, empleadosPorTurno[e.target.value]);
        } else {
            onTurnoSelected('', []);
        }
    };

    return (
        <div className="flex justify-center">
            <div className="w-64">
                <select
                    onChange={handleTurnoChange}
                    className="form-select block w-full p-area border border-gray-300 bg-white rounded shadow-sm sm:text-sm">
                    <option value="">Seleccione el turno</option>
                    {Object.keys(empleadosPorTurno).map(turno => (
                        <option key={turno} value={turno}>{turno}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default Turno;



