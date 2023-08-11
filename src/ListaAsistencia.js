import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, onSnapshot, query, orderBy, limit } from "firebase/firestore";
import * as XLSX from 'xlsx';

function ListaAsistencia() {
    const [registros, setRegistros] = useState([]);
    const [todosRegistros, setTodosRegistros] = useState([]);

    useEffect(() => {
        const asistenciaQuery = query(collection(db, 'asistencia'), orderBy("Hora de registro", 'desc'), limit(10));
        const unsubscribe = onSnapshot(asistenciaQuery, snapshot => {
            setRegistros(snapshot.docs.map(doc => doc.data()));
        });

        // Obtener todos los registros para la exportación de Excel
        const allRecordsQuery = query(collection(db, 'asistencia'), orderBy("Hora de registro", 'desc'));
        const allUnsubscribe = onSnapshot(allRecordsQuery, snapshot => {
            setTodosRegistros(snapshot.docs.map(doc => doc.data()));
        });

        // Limpiar suscripción al desmontar
        return () => {
            unsubscribe();
            allUnsubscribe();
        };
    }, []);

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(todosRegistros);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Asistencia");
        XLSX.writeFile(wb, "Asistencia.xlsx");
    };

    return (
        <div className="bg-white p-6 grid grid-cols-2 gap-4 mt-8">
            <h2 className="text-3xl font-bold text-indigo-700 mb-2 col-span-2">Lista de Asistencia</h2>

            {registros.map((registro, index) => (
                <div key={index} className="p-2 border-2 border-indigo-200 rounded-md">
                    <p className="text-sm text-indigo-900">Fecha: {registro.Fecha}</p>
                    <p className="text-sm text-indigo-900">Hora de registro: {registro["Hora de registro"]}</p>
                    <p className="text-sm text-indigo-900">Turno: {registro.Turno}</p>
                    <p className="text-sm text-indigo-900">Empleado: {registro.Empleado}</p>
                </div>
            ))}

            <button onClick={exportToExcel} className="bg-indigo-600 text-white px-4 py-2 rounded mt-4 col-span-2">
                Descargar Excel
            </button>
        </div>
    );
}

export default ListaAsistencia;

