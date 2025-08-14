import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { manualGenerate } from "../../api/dataApi";
import GenerateButton from "../../components/common/button/GenerateButton";
import RowInputBox from "../../components/common/inputBox/RowInputBox";

function PreviewTable({ rows }) {

    const columns = useMemo(() => {
        const set = new Set();
        (rows || []).forEach((r) => Object.keys(r || {}).forEach((k) => set.add(k)));
        return Array.from(set);
    }, [rows]);

    return (
        <div className="overflow-auto border border-gray-700 rounded-lg">
            <table className="min-w-full text-sm">
                <thead className="bg-gray-800 sticky top-0">
                    <tr>
                        {columns.map((c) => (
                            <th key={c} className="px-3 py-2 text-left font-semibold">{c}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((r, idx) => (
                        <tr key={idx} className="odd:bg-gray-900 even:bg-gray-950">
                            {columns.map((c) => (
                                <td key={c} className="px-3 py-2 align-top">
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

export default function PreviewPage() {
    const { state } = useLocation(); // { payload, format, prompt }
    const navigate = useNavigate();
    const [rows, setRows] = useState(50);   // 하단 Generate용
    const [result, setResult] = useState(null); // any | string
    const [err, setErr] = useState(null);

    useEffect(() => {
        if (!state?.payload) {
            navigate("/");
            return;
        }
        (async () => {
            try {
                const fmt = state.format || "json";
                const resp = await manualGenerate(fmt, state.payload);
                setResult(resp);
            } catch (e) {
                const status = e?.response?.status;
                const statusText = e?.response?.statusText;
                const body = e?.response?.data;
                console.error("[manualGenerate error]", { status, statusText, body, e });
                setErr({
                    status,
                    statusText,
                    body: typeof body === "string" ? body : JSON.stringify(body),
                    message: e?.message || String(e),
                });
            }
        })();
    }, [state, navigate]);

    const onDownload = () => {
        const blob = new Blob(
            [typeof result === "string" ? result : JSON.stringify(result, null, 2)],
            { type: "text/plain;charset=utf-8" }
        );
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        const ext = (state?.format || "json");
        a.href = url;
        a.download = `synthorData.${ext}`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    };

    const isJsonArray =
        Array.isArray(result) ||
        (typeof result === "string" && result.trim().startsWith("[") && result.trim().endsWith("]"));

    const parsedJsonArray = useMemo(() => {
        if (Array.isArray(result)) return result;
        if (typeof result === "string") {
            try {
                const parsed = JSON.parse(result);
                return Array.isArray(parsed) ? parsed : null;
            } catch { /* noop */ }
        }
        return null;
    }, [result]);

    return (
        <div className="w-full min-h-screen bg-synthor flex flex-col relative">
            {/* 헤더 */}
            <header className="h-[90px] bg-cyan-400 text-black font-bold text-2xl flex justify-between items-center -mt-6 -ml-6 -mr-6 px-6 rounded-t-[30px] shadow-[0_0_20px_5px_rgba(0,255,255,0.6)]">
                <h1>Preview</h1>
                <div className="flex items-center gap-3">
                    {result && (
                        <button onClick={onDownload} className="text-sm px-3 py-1 bg-black/10 rounded hover:bg-black/20">
                            ⬇︎ Download
                        </button>
                    )}
                    <button className="text-2xl font-bold hover:opacity-80" onClick={() => window.history.back()}>✕</button>
                </div>
            </header>

            {/* 본문 */}
            <main className="p-6 text-white">
                {err && (
                    <div className="text-red-400 text-sm border border-red-600 rounded-[10px] p-2 mb-4">
                        {String(err)}
                    </div>
                )}

                {!result && !err && <p>Synthor AI Loading...</p>}

                {result && (
                    isJsonArray && parsedJsonArray
                        ? <PreviewTable rows={parsedJsonArray} />
                        : (
                            <pre className="text-xs bg-gray-900 text-gray-200 p-3 rounded overflow-auto max-h-[70vh]">
                                {typeof result === "string" ? result : JSON.stringify(result, null, 2)}
                            </pre>
                        )
                )}
            </main>

            {/* 하단 컨트롤 (그대로 유지) */}
            <div className="absolute bottom-6 right-6 flex items-center gap-4">
                <RowInputBox value={rows} onChange={setRows} />
                <GenerateButton onClick={() => console.log("Generated Rows:", rows, "Prompt:", state?.prompt)} />
            </div>
        </div>
    );
}
