import React from "react";

export default function NumberOptions({ options, setOptions }) {
    const handleChange = (key, value) => {
        setOptions({
            ...options,
            [key]: Number(value),
        });
    };

    return (
        <div>
            <label className="block text-sm text-gray-300 mb-2">
                Min
            </label>
            <input
                type="number"
                value={String(options.min ?? 1)}
                onChange={(e) => handleChange("min", e.target.value)}
                className="w-full bg-transparent border border-gray-700 rounded-[10px] px-3 py-2 mb-4"
            />

            <label className="block text-sm text-gray-300 mb-2">
                Max
            </label>
            <input
                type="number"
                value={String(options.max ?? 100)}
                onChange={(e) => handleChange("max", e.target.value)}
                className="w-full bg-transparent border border-gray-700 rounded-[10px] px-3 py-2 mb-4"
            />

            <label className="block text-sm text-gray-300 mb-2">
                Decimals
            </label>
            <input
                type="number"
                min={0}
                value={String(options.decimals ?? 0)}
                onChange={(e) => handleChange("decimals", e.target.value)}
                className="w-full bg-transparent border border-gray-700 rounded-[10px] px-3 py-2"
            />
        </div>
    );
}

