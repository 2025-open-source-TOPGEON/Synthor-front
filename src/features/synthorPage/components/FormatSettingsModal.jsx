import React, { useEffect, useRef } from "react";

const FORMATS = ["json", "csv", "html", "sql", "xml", "ldif"];

export default function FormatSettingsModal({ value = "json", onSelect, onClose }) {
    const panelRef = useRef(null);


    useEffect(() => {
        const onClickOutside = (e) => {
            if (panelRef.current && !panelRef.current.contains(e.target)) onClose?.();
        };
        document.addEventListener("mousedown", onClickOutside);
        return () => document.removeEventListener("mousedown", onClickOutside);
    }, [onClose]);

    return (

        <div
            ref={panelRef}
            className="absolute bottom-full left-0 mb-2 w-48 rounded-xl border border-cyan-400  bg-gray-500 text-gray-900 shadow-lg"
            role="menu"
            aria-label="Select format"
        >
            <div className="px-3 py-2 text-xs font-semibold text-white">Format</div>
            <ul className="max-h-60 overflow-auto">
                {FORMATS.map((fmt) => {
                    const active = fmt === value;
                    return (
                        <li key={fmt}>
                            <button
                                type="button"
                                role="menuitemradio"
                                aria-checked={active}
                                onClick={() => {
                                    onSelect?.(fmt);
                                    onClose?.();
                                }}
                                className={`w-full text-left px-3 py-2 hover:bg-gray-400 ${active ? "font-bold" : ""
                                    }`}
                            >
                                {fmt.toUpperCase()}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
