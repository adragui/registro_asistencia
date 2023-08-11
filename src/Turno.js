import React from 'react';
const empleadosPorTurno = {
    mañana: ['Pedro', 'Ana', 'Carlos'],
    tarde: ['Karla', 'Daniel'],
    noche: ['Isabel', 'Hernan', 'Beatriz', 'Ricardo']
};

function Turno({ onTurnoSelected }) {
    const handleTurnoChange = e => {
        onTurnoSelected(e.target.value, empleadosPorTurno[e.target.value]);
    };

    return (
        <div className="flex justify-center">
            <div className="w-64">
                <select
                    onChange={handleTurnoChange}
                    className="form-select block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <option value="">Seleccione el turno</option>
                    <option value="mañana">Mañana</option>
                    <option value="tarde">Tarde</option>
                    <option value="noche">Noche</option>
                </select>
            </div>
        </div>
    );
}

export default Turno;
