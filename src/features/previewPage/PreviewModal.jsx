// src/pages/preview/PreviewModal.jsx
import { useEffect, useMemo, useState } from "react";
import { manualGenerate } from "../../api/dataApi";
import GenerateButton from "../../components/common/button/GenerateButton";
import RowInputBox from "../../components/common/inputBox/RowInputBox";
import { buildGeneratePayload } from "../synthorPage/utils/buildPatload";
import useDownload from "../../hooks/useDownload";
import PreviewTable from "../previewPage/PreviewTable";

export default function PreviewModal({ open, onClose, state }) {
    const download = useDownload();
    const format = state?.format || "json";
    const fields = state?.fields || [];
    const prompt = state?.prompt;
    const [rows, setRows] = useState(() => Number(state?.initialCount ?? 50));
    const [result, setResult] = useState(null);
    const [err, setErr] = useState(null);

    useEffect(() => {
        if (!open) return;
        const original = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = original; };
    }, [open]);

    useEffect(() => {
        if (!open) return;
        (async () => {
            try {
                const payload = {
                    ...buildGeneratePayload(fields, rows),
                    ...(prompt ? { prompt } : {}),
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
    }, [open, fields, rows, format, prompt]);

    const parsedJsonArray = useMemo(() => {
        if (Array.isArray(result)) return result;
        if (typeof result === "string") {
            try {
                const parsed = JSON.parse(result);
                return Array.isArray(parsed) ? parsed : null;
            } catch { }
        }
        return null;
    }, [result]);

    const displayedRows = useMemo(() => {
        if (!parsedJsonArray) return null;
        return parsedJsonArray.slice(0, 100);
    }, [parsedJsonArray]);

    const { previewInfo, textPreview } = useMemo(() => {
        const fallback = { previewInfo: { total: 0, shown: 0, label: "items" }, textPreview: null };
        if (parsedJsonArray) {
            const total = parsedJsonArray.length;
            const shown = Math.min(100, total);
            return { previewInfo: { total, shown, label: "rows" }, textPreview: null };
        }
        if (typeof result === "string") {
            const raw = result;
            if (format === "csv") {
                const lines = raw.split(/\r?\n/);
                const header = lines[0] ?? "";
                const dataLines = lines.slice(1).filter((l) => l.trim().length > 0);
                const total = dataLines.length;
                const shown = Math.min(100, total);
                const preview = [header, ...dataLines.slice(0, shown)].join("\n");
                return { previewInfo: { total, shown, label: "rows" }, textPreview: preview };
            }
            if (format === "ldif") {
                const trimmed = raw.trim();
                const records = trimmed.length ? trimmed.split(/\n\s*\n/) : [];
                const total = records.length;
                const shown = Math.min(100, total);
                const preview = records.slice(0, shown).join("\n\n");
                return { previewInfo: { total, shown, label: "records" }, textPreview: preview };
            }
            const lines = raw.split(/\r?\n/);
            const total = lines.length;
            const shown = Math.min(100, total);
            const preview = lines.slice(0, shown).join("\n");
            return { previewInfo: { total, shown, label: "lines" }, textPreview: preview };
        }
        if (result != null) {
            const str = JSON.stringify(result, null, 2);
            const lines = str.split(/\r?\n/);
            const total = lines.length;
            const shown = Math.min(100, total);
            const preview = lines.slice(0, shown).join("\n");
            return { previewInfo: { total, shown, label: "lines" }, textPreview: preview };
        }
        return fallback;
    }, [result, format, parsedJsonArray]);

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

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60">
            <div className="w-[96vw] max-w-[1600px] h-[94vh] bg-synthor rounded-[20px] overflow-hidden shadow-[0_0_20px_5px_rgba(0,255,255,0.3)]">
                <div className="grid grid-rows-[auto,1fr,auto] h-full min-h-0">
                    <header className="bg-cyan-400 text-black font-bold text-2xl flex justify-between items-center px-6 py-4 rounded-t-[20px] shadow-[0_0_20px_5px_rgba(0,255,255,0.6)]">
                        <h1>Preview</h1>
                        <div className="flex items-center gap-3">
                            <button
                                className="text-2xl font-bold hover:opacity-80"
                                onClick={onClose}
                            >
                                ✕
                            </button>
                        </div>
                    </header>


                    <main className="p-6 text-white min-h-0 overflow-auto">
                        {err && (
                            <div className="text-red-400 text-sm border border-red-600 rounded-[10px] p-2 mb-4">
                                {err.message || "Error"}
                            </div>
                        )}

                        {!result && !err && <p>Synthor AI Loading...</p>}

                        {result && (
                            <>
                                <div className="text-xs text-gray-400 mb-2">
                                    Showing {previewInfo.shown} of {previewInfo.total} {previewInfo.label}
                                    {previewInfo.total > 100 && " (download includes all)"}
                                </div>

                                {parsedJsonArray ? (
                                    <PreviewTable rows={displayedRows} />
                                ) : (
                                    <pre
                                        className="
                      font-mono text-sm leading-7 tracking-wide
                      whitespace-pre-wrap break-words
                      bg-gray-900 text-gray-100
                      p-4 rounded-lg border border-gray-700 shadow-inner
                      max-h-[70vh] overflow-auto
                    "
                                    >
                                        {textPreview ??
                                            (typeof result === "string" ? result : JSON.stringify(result, null, 2))}
                                    </pre>
                                )}
                            </>
                        )}
                    </main>

                    <div className="px-6 py-4 bg-synthor/90 backdrop-blur border-t border-white/10">
                        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 justify-end">
                            <div className="w-full md:w-auto">
                                <RowInputBox value={rows} onChange={setRows} />
                            </div>
                            <div className="w-full md:w-auto">
                                <GenerateButton className="w-full md:w-auto" onClick={handleGenerateAndDownload} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
