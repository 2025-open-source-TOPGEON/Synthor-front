import React, { useEffect } from "react";

export default function DatetimeOptions({ options, setOptions }) {
    useEffect(() => {
        setOptions((prev) => ({
            startDate: prev.startDate ?? "",
            endDate: prev.endDate ?? "",
            format: prev.format ?? "m/d/yyyy",
            blank: prev.blank ?? 0,
        }));
    }, [setOptions]);

    const handle = (key, value) => {
        setOptions((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <div className="space-y-3 text-sm text-gray-200">
            {/* 시작 날짜 */}
            <div>
                <label className="block mb-1">Start Date</label>
                <input
                    type="date"
                    value={options.startDate}
                    onChange={(e) => handle("startDate", e.target.value)}
                    className="w-full px-2 py-1 rounded bg-gray-800 border border-gray-600"
                />
            </div>

            {/* 종료 날짜 */}
            <div>
                <label className="block mb-1">End Date</label>
                <input
                    type="date"
                    value={options.endDate}
                    onChange={(e) => handle("endDate", e.target.value)}
                    className="w-full px-2 py-1 rounded bg-gray-800 border border-gray-600"
                />
            </div>

            {/* 날짜 포맷  */}

            <label className="block mb-1">Format</label>
            <select
                value={options.format}
                onChange={(e) => handle("format", e.target.value)}
                className="w-full px-2 py-1 rounded bg-gray-800 border border-gray-600"
            >
                <option value="m/d/yyyy">m/d/yyyy</option>
                <option value="yyyy-MM-dd">yyyy-MM-dd</option>
                <option value="dd/MM/yyyy">dd/MM/yyyy</option>
            </select>


        </div>
    );
}
