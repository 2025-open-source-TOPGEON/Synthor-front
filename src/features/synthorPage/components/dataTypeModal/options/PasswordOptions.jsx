import React, { useEffect } from "react";

export default function PasswordOptions({ options, setOptions }) {
    // 기본값 설정 (최초 렌더링 시)
    useEffect(() => {
        setOptions((prev) => ({
            minimum_length: prev.minimum_length ?? 8,
            upper: prev.upper ?? 1,
            lower: prev.lower ?? 1,
            numbers: prev.numbers ?? 1,
            symbols: prev.symbols ?? 1,
        }));
    }, [setOptions]);

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
                    value={String(options.minimum_length ?? 8)}
                    onChange={(e) => handle("minimum_length", parseInt(e.target.value, 10) || 0)}
                    min={0}
                />
            </div>

            {/* 개수 제한 필드 */}
            <div className="grid grid-cols-2 gap-4">
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
                            value={String(options[key] ?? 0)}
                            onChange={(e) => handle(key, parseInt(e.target.value, 10) || 0)}

                            min={0}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
