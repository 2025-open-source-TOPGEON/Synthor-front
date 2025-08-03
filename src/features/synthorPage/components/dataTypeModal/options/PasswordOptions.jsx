import React from "react";

export default function PasswordOptions({ options, setOptions }) {
    const handle = (key, value) => {
        setOptions((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <div className="space-y-2 text-sm text-gray-200 mb-4">
            <div>
                <label className="block mb-1">Minimum Length</label>
                <input
                    type="number"
                    className="w-full px-2 py-1 rounded bg-gray-800 border border-gray-600"
                    value={options.minLength || ""}
                    onChange={(e) => handle("minLength", parseInt(e.target.value))}
                    min={1}
                    placeholder="e.g. 8"
                />
            </div>

            <div className="flex gap-4 flex-wrap">
                {["uppercase", "lowercase", "numbers", "symbols"].map((key) => (
                    <label key={key} className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={options[key] || false}
                            onChange={(e) => handle(key, e.target.checked)}
                        />
                        <span className="capitalize">{key}</span>
                    </label>
                ))}
            </div>
        </div>
    );
}
