import React, { useEffect } from "react";

export default function TimeOptions({ options, setOptions }) {
    useEffect(() => {
        setOptions((prev) => ({
            from: prev.from ?? "09:00",
            to: prev.to ?? "18:00",
            format: prev.format ?? "12hour",
        }));
    }, [setOptions]);

    const handle = (key, value) => {
        setOptions((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <div className="space-y-3 text-sm text-gray-200">
            {/* 시작 시간 */}
            <div>
                <label className="block mb-1">From</label>
                <input
                    type="time"
                    value={options.from}
                    onChange={(e) => handle("from", e.target.value)}
                    className="w-full px-2 py-1 rounded bg-gray-800 border border-gray-600"
                />
            </div>

            {/* 종료 시간 */}
            <div>
                <label className="block mb-1">To</label>
                <input
                    type="time"
                    value={options.to}
                    onChange={(e) => handle("to", e.target.value)}
                    className="w-full px-2 py-1 rounded bg-gray-800 border border-gray-600"
                />
            </div>

            {/* 시간 포맷 */}
            <div>
                <label className="block mb-1">Format</label>
                <select
                    value={options.format}
                    onChange={(e) => handle("format", e.target.value)}
                    className="w-full px-2 py-1 rounded bg-gray-800 border border-gray-600"
                >
                    <option value="12hour">12 Hour</option>
                    <option value="24hour">24 Hour</option>
                </select>
            </div>
        </div>
    );
}
