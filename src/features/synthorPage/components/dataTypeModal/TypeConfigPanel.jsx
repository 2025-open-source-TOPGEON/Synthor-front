
import React, { useState } from "react";
import PasswordOptions from "./options/PasswordOptions";

export default function TypeConfigPanel({ selectedType, onConfirm }) {
    const [options, setOptions] = useState({});

    if (!selectedType) {
        return (
            <div className="w-full h-full overflow-y-auto px-4 py-2">


            </div>
        );
    }

    const renderOptionsUI = () => {
        switch (selectedType.name) {
            case "Password":
                return <PasswordOptions options={options} setOptions={setOptions} />;

            default:
                return null;
        }
    };

    return (
        <div className="w-full h-full overflow-y-auto px-4 py-2">

            <h4 className="text-lg font-semibold mb-4">{selectedType.name}</h4>
            <p className="text-gray-400 text-sm mb-4">
                Configure the selected data type
            </p>

            {renderOptionsUI()}

            <button
                className="mt-2 px-4 py-2 bg-cyan-400 rounded hover:bg-cyan-700"
                onClick={() => onConfirm(options)} // options 전달
            >
                Select Type
            </button>
        </div>
    );
}
