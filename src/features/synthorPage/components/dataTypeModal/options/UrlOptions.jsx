import React, { useEffect } from "react";

export default function UrlOptions({ options, setOptions }) {
    useEffect(() => {
        setOptions((prev) => ({
            protocol: prev.protocol ?? true,
            host: prev.host ?? true,
            path: prev.path ?? true,
            query_string: prev.query_string ?? true,
        }));
    }, [setOptions]);

    const handleCheckbox = (key) => {
        setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="space-y-3 text-sm text-gray-200">
            {[
                { key: "protocol", label: "Protocol" },
                { key: "host", label: "Host" },
                { key: "path", label: "Path" },
                { key: "query_string", label: "Query String" },
            ].map(({ key, label }) => (
                <label key={key} className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={!!options[key]}
                        onChange={() => handleCheckbox(key)}
                        className="w-4 h-4 accent-[#8E25E2]"
                    />
                    {label}
                </label>
            ))}
        </div>
    );
}
