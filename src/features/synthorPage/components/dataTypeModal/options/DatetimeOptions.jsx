import React, { useEffect } from "react";

export default function DatetimeOptions({ options, setOptions }) {
    useEffect(() => {
        const today = new Date();
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(today.getFullYear() - 1);

        // 날짜를 YYYY-MM-DD 형태로 변환
        const formatDate = (date) => date.toISOString().split("T")[0];

        setOptions((prev) => ({
            from: prev.from ?? formatDate(oneYearAgo),
            to: prev.to ?? formatDate(today),
            format: prev.format ?? "M/d/yyyy",
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
                    value={options.from}
                    onChange={(e) => handle("from", e.target.value)}
                    className="w-full px-2 py-1 rounded bg-gray-800 border border-gray-600"
                />
            </div>

            {/* 종료 날짜 */}
            <div>
                <label className="block mb-1">End Date</label>
                <input
                    type="date"
                    value={options.to}
                    onChange={(e) => handle("to", e.target.value)}
                    className="w-full px-2 py-1 rounded bg-gray-800 border border-gray-600"
                />
            </div>

            {/* 날짜 포맷 */}
            <label className="block mb-1">Format</label>
            <select
                value={options.format}
                onChange={(e) => handle("format", e.target.value)}
                className="w-full px-2 py-1 rounded bg-gray-800 border border-gray-600"
            >
                {/* m/d/yyyy, mm/dd/yyyy, yyyy-mm-dd, yyyy-mm, d/m/yyyy, dd/mm/yyyy */}
                <option value="M/d/yyyy">M/d/yyyy</option>
                <option value="yyyy-MM-dd">yyyy-MM-dd</option>
                <option value="dd/MM/yyyy">dd/MM/yyyy</option>
                <option value="yyyy-MM">yyyy-mm</option>
                <option value="d/M/yyyy">d/m/yyyy</option>
                <option value="dd/MM/yyyy">dd/mm/yyyy</option>
            </select>
        </div>
    );
}
