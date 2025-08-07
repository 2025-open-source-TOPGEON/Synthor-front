import React from "react";

export default function PasswordOptions({ options, setOptions }) {
    const handle = (key, value) => {
        setOptions((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <div className="space-y-4 text-sm text-gray-200 mb-4">
            {/* 최소 길이 */}
            <div>
                <label className="block mb-1">Minimum Length</label>
                <input
                    type="number"
                    className="w-full px-2 py-1 rounded bg-gray-800 border border-gray-600"
                    value={options.minimum_length || ""}
                    onChange={(e) => handle("minimum_length", parseInt(e.target.value) || 0)}
                    min={0}
                    placeholder="e.g. 8"
                />
            </div>

            {/* 개수 제한 필드 */}
            <div className="grid gap-4">
                {[
                    { key: "upper", label: "Minimum Uppercase" },
                    { key: "lower", label: "Minimum Lowercase" },
                    { key: "numbers", label: "Minimum Numbers" },
                    { key: "symbols", label: "Minimum Symbols" },
                ].map(({ key, label }) => (
                    <div key={key}>
                        <label className="block mb-1">{label}</label>
                        <input
                            type="number"
                            className="w-full px-2 py-1 rounded bg-gray-800 border border-gray-600"
                            value={options[key] || ""}
                            onChange={(e) => handle(key, parseInt(e.target.value) || 0)}
                            min={0}
                            placeholder="e.g. 1"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
