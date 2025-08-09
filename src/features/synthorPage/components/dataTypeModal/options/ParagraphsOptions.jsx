import React from "react";

export default function ParagraphsOptions({ options, setOptions }) {
    const handleChange = (key, value) => {
        setOptions({
            ...options,
            [key]: Number(value),
        });
    };

    return (
        <div>
            <label className="block text-sm text-gray-300 mb-2">
                At least
            </label>
            <input
                type="number"
                min={1}
                value={String(options["at least"] ?? 1)}
                onChange={(e) => handleChange("at least", e.target.value)}
                className="w-full bg-transparent border border-gray-700 rounded-[10px] px-3 py-2 mb-4"
            />

            <label className="block text-sm text-gray-300 mb-2">
                But no more than
            </label>
            <input
                type="number"
                min={1}
                value={String(options["but no more than"] ?? 4)}
                onChange={(e) => handleChange("but no more than", e.target.value)}
                className="w-full bg-transparent border border-gray-700 rounded-[10px] px-3 py-2"
            />
        </div>
    );
}
