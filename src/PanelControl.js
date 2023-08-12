import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { getDocs, collection, doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from "@firebase/firestore";
import {db} from "./firebase";

function PanelControl() {
    const { register, handleSubmit, reset } = useForm();
    const [turnos, setTurnos] = useState([]);
    const [turnoSeleccionado, setTurnoSeleccionado] = useState(null);
    const [empleados, setEmpleados] = useState([]);
    const [addTurnoModal, setAddTurnoModal] = useState(false);

    useEffect(() => {
        const fetchTurnos = async () => {
            const turnosColRef = collection(db, "turnos");
            const turnosSnapshot = await getDocs(turnosColRef);
            setTurnos(turnosSnapshot.docs.map(doc => doc.id));
        };

        fetchTurnos();
    }, []);

    useEffect(() => {
        const fetchEmpleados = async () => {
            if (turnoSeleccionado) {
                const turnoDocRef = doc(db, "turnos", turnoSeleccionado);
                const turnoDoc = await getDoc(turnoDocRef);

                if (turnoDoc.exists()) {
                    setEmpleados(turnoDoc.data().empleados);
                }
            }
        };

        fetchEmpleados();
    }, [turnoSeleccionado]);

    const agregarTurno = async (data) => {
        const newTurnoDocRef = doc(db, "turnos", data.newTurnoName);

        await setDoc(newTurnoDocRef, {
            empleados: [],
        });

        setTurnos(prevTurnos => [...prevTurnos, data.newTurnoName]);
        reset();
        setAddTurnoModal(false);
    };

    const agregarEmpleado = async (data) => {
        const empleadoNuevo = data.name;
        const turnoDocRef = doc(db, "turnos", turnoSeleccionado);

        await updateDoc(turnoDocRef, {
            empleados: arrayUnion(empleadoNuevo)
        });

        setEmpleados(prevEmpleados => [...prevEmpleados, empleadoNuevo]);
        reset();
    };

    const quitarEmpleado = async (empleado) => {
        const turnoDocRef = doc(db, "turnos", turnoSeleccionado);

        await updateDoc(turnoDocRef, {
            empleados: arrayRemove(empleado)
        });

        setEmpleados(prevEmpleados => prevEmpleados.filter(emp => emp !== empleado));
    };

    return (
        <div className="mx-auto flex flex-col items-center justify-center py-2 max-w-md">
            <h1 className="font-bold text-2xl mb-4 text-gray-800">Panel de Control</h1>
            <button onClick={() => setAddTurnoModal(true)} className="bg-blue-500 text-md text-white font-medium py-1 px-2 rounded hover:shadow-md mb-3 hover:bg-blue-700 transition duration-200 ease-in-out">
                Añadir Turno
            </button>
            {addTurnoModal && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-20">
                    <div className="bg-white rounded-lg overflow-hidden shadow-lg px-5 pt-2 pb-2">
                        <h2 className="mb-2 text-xl">Agregar nuevo turno</h2>
                        <form onSubmit={handleSubmit(agregarTurno)}>
                            <input {...register("newTurnoName")} placeholder='Nombre del turno' className="text-md shadow appearance-none border rounded w-full py-1 px-2 text-gray-600 leading-tight focus:outline-none focus:shadow-outline mb-3" />
                            <div className="flex items-center justify-between">
                                <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white text-md font-medium py-1 px-2 rounded hover:shadow-md transition duration-200 ease-in-out">Agregar</button>
                                <button onClick={() => setAddTurnoModal(false)} className="bg-red-500 hover:bg-red-700 text-white text-md font-medium py-1 px-2 rounded hover:shadow-md transition duration-200 ease-in-out">
                                    Cerrar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <div className="flex flex-col items-center w-full">
                <h2 className="text-xl mb-2">Selecciona un turno</h2>
                <div className="w-full flex-1">
                    <select onChange={(e) => setTurnoSeleccionado(e.target.value)} className="text-md shadow appearance-none border rounded w-full py-1 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline mb-3">
                        <option value="">Seleccione un turno</option>
                        {turnos.map(turno => (
                            <option key={turno} value={turno}>
                                {turno}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            {turnoSeleccionado && (
                <div className="mt-2 flex flex-col items-center w-full">
                    <h2 className="text-xl mb-2">Gestiona los empleados</h2>
                    <form onSubmit={handleSubmit(agregarEmpleado)} className="flex items-baseline w-full">
                        <input {...register("name")} placeholder='Nombre del empleado' className="text-md shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline mb-3  flex-grow mr-1" />
                        <button type='submit' className="bg-green-500 hover:bg-green-700 text-white text-md font-medium py-2 px-2 rounded hover:shadow-md transition duration-200 ease-in-out">Agregar</button>
                    </form>
                    {empleados.map((empleado, index) =>
                        <div key={index} className="flex items-center mt-2 w-full">
                            <p className="text-md flex-grow mr-1">{empleado}</p>
                            <button onClick={() => quitarEmpleado(empleado)} className="bg-red-500 hover:bg-red-700 text-white text-md font-medium py-2 px-2 rounded hover:shadow-md transition duration-200 ease-in-out">Eliminar</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );

}

export default PanelControl;

