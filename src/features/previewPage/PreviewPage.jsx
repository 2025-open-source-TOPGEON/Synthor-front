import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { manualGenerate } from "../../api/dataApi";
import GenerateButton from "../../components/common/button/GenerateButton";
import RowInputBox from "../../components/common/inputBox/RowInputBox";
import { buildGeneratePayload } from "../synthorPage/utils/buildPatload";
import useDownload from "../../hooks/useDownload";

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
    const { state } = useLocation(); // { fields, format, prompt, initialCount }
    const navigate = useNavigate();
    const download = useDownload();

    const format = state?.format || "json";
    const fields = state?.fields || [];
    const prompt = state?.prompt;
    const [rows, setRows] = useState(() => Number(state?.initialCount ?? 50));
    const [result, setResult] = useState(null);
    const [err, setErr] = useState(null);

    // 최초 프리뷰 자동 생성
    useEffect(() => {
        if (!state?.fields) {
            navigate("/");
            return;
        }
        (async () => {
            try {
                const payload = {
                    ...buildGeneratePayload(fields, rows),
                    ...(prompt ? { prompt } : {}), // 최상위 prompt 필요 시 포함
                };
                const resp = await manualGenerate(format, payload);
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
    }, [state, navigate, fields, rows, format, prompt]);

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

    const handleGenerateAndDownload = async () => {
        try {
            const payload = {
                ...buildGeneratePayload(fields, rows),
                ...(prompt ? { prompt } : {}),
            };
            const resp = await manualGenerate(format, payload);
            setResult(resp);
            download(resp, { ext: format, filename: "synthorData" });
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
    };

    return (
        <div className="w-full min-h-screen bg-synthor flex flex-col relative">
            {/* 헤더 */}
            <header className="h-[90px] bg-cyan-400 text-black font-bold text-2xl flex justify-between items-center -mt-6 -ml-6 -mr-6 px-6 rounded-t-[30px] shadow-[0_0_20px_5px_rgba(0,255,255,0.6)]">
                <h1>Preview</h1>
                <div className="flex items-center gap-3">
                    <button className="text-2xl font-bold hover:opacity-80" onClick={() => window.history.back()}>✕</button>
                </div>
            </header>

            {/* 본문 */}
            <main className="p-6 text-white">
                {err && (
                    <div className="text-red-400 text-sm border border-red-600 rounded-[10px] p-2 mb-4">
                        {err.message || "Error"}
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

            {/* 하단 컨트롤: Generate = 생성+다운로드 */}
            <div className="absolute bottom-6 right-6 flex items-center gap-4">
                <RowInputBox value={rows} onChange={setRows} />
                <GenerateButton onClick={handleGenerateAndDownload} />
            </div>
        </div>
    );
}
