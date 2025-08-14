
import { useMemo } from "react";

export default function PreviewTable({ rows = [] }) {
    const columns = useMemo(() => {
        const set = new Set();
        (rows || []).forEach((r) => Object.keys(r || {}).forEach((k) => set.add(k)));
        return Array.from(set);
    }, [rows]);

    return (
        <div className="overflow-auto border border-gray-700 rounded-lg">
            <table className="min-w-full text-[13px] font-mono">
                <thead className="bg-gray-800 sticky top-0">
                    <tr>
                        {columns.map((c) => (
                            <th key={c} className="px-3 py-2 text-left font-semibold">
                                {c}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                    {(rows || []).map((r, idx) => (
                        <tr key={idx} className="odd:bg-gray-900 even:bg-gray-950 align-top">
                            {columns.map((c) => (
                                <td
                                    key={c}
                                    className="px-3 py-2 whitespace-pre-wrap break-words leading-6"
                                >
                                    {r?.[c] === null || r?.[c] === undefined ? "—" : String(r[c])}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
