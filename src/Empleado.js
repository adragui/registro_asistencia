import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, getDocs, addDoc, where, query } from 'firebase/firestore';
import dayjs from 'dayjs';

function Empleado({ empleados, turno }) {
    const [registroEmpleado, setRegistroEmpleado] = useState({});

    const verificarAsistencias = async (empleado) => {
        const fechaHoy = dayjs().format('DD/MM/YYYY'); // Formato de fecha estandarizado
        const coleccionAsistencia = collection(db, "asistencia");
        const q = query(coleccionAsistencia, where("Fecha", "==", fechaHoy), where("Empleado", "==", empleado));
        const documentosExistentes = await getDocs(q);

        return !documentosExistentes.empty;
    }

    useEffect(() => {
        const initialCheck = async () => {
            let initialRegistro = {};
            for (let empleado of empleados) {
                initialRegistro[empleado] = await verificarAsistencias(empleado);
            }
            setRegistroEmpleado(initialRegistro);
        }
        initialCheck();
    }, [empleados]);

    const handleEmpleadoClick = async empleado => {
        const yaRegistrado = await verificarAsistencias(empleado);
        if (yaRegistrado) return;

        try {
            await addDoc(collection(db, "asistencia"), {
                Fecha: dayjs().format('DD/MM/YYYY'), // Formato de fecha estandarizado
                "Hora de registro": dayjs().format('HH:mm:ss'), // Formato de hora estandarizado de 24 horas
                Turno: turno,
                Empleado: empleado
            });

            setRegistroEmpleado(prevState => ({...prevState, [empleado]: true }));
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    return (
        <div className="p-10 flex flex-wrap items-center justify-center">
            {empleados.map(empleado => (
                <button
                    key={empleado}
                    onClick={() => handleEmpleadoClick(empleado)}
                    disabled={registroEmpleado[empleado]}
                    className={`text-white font-semibold text-lg px-6 py-3 mx-2 my-1 rounded-lg shadow-md transform transition-all duration-300 ease-in-out ${registroEmpleado[empleado] ? 'bg-green-600' : 'bg-indigo-500 hover:bg-indigo-600 hover:scale-105'}`}
                >
                    {empleado}
                </button>
            ))}
        </div>
    );
}

export default Empleado;