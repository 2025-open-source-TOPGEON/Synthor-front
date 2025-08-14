// src/pages/preview/PreviewPage.jsx
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { manualGenerate } from "../../api/dataApi";
import GenerateButton from "../../components/common/button/GenerateButton";
import RowInputBox from "../../components/common/inputBox/RowInputBox";
import { buildGeneratePayload } from "../synthorPage/utils/buildPatload";
import useDownload from "../../hooks/useDownload";
import PreviewTable from "../previewPage/PreviewTable";

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
    }, [state, navigate, fields, rows, format, prompt]);

    // JSON 배열 여부 판정
    const isJsonArray =
        Array.isArray(result) ||
        (typeof result === "string" &&
            result.trim().startsWith("[") &&
            result.trim().endsWith("]"));

    // JSON 파싱 (배열만)
    const parsedJsonArray = useMemo(() => {
        if (Array.isArray(result)) return result;
        if (typeof result === "string") {
            try {
                const parsed = JSON.parse(result);
                return Array.isArray(parsed) ? parsed : null;
            } catch {/* noop */ }
        }
        return null;
    }, [result]);

    const displayedRows = useMemo(() => {
        if (!parsedJsonArray) return null;
        return parsedJsonArray.slice(0, 100);
    }, [parsedJsonArray]);

    const { previewInfo, textPreview } = useMemo(() => {
        const fallback = { previewInfo: { total: 0, shown: 0, label: "items" }, textPreview: null };

        // JSON 배열이면 테이블에서 처리
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

            // XML/HTML/SQL/그 외: 라인 기준
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

    return (
        <div className="w-full min-h-screen bg-synthor flex flex-col">

            <header className="h-[90px] bg-cyan-400 text-black font-bold text-2xl flex justify-between items-center -mt-6 -ml-6 -mr-6 px-6 rounded-t-[30px] shadow-[0_0_20px_5px_rgba(0,255,255,0.6)]">
                <h1>Preview</h1>
                <div className="flex items-center gap-3">
                    <button
                        className="text-2xl font-bold hover:opacity-80"
                        onClick={() => window.history.back()}
                    >
                        ✕
                    </button>
                </div>
            </header>

            <main className="p-6 text-white flex-1">
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

            <div className="sticky bottom-0 -mx-6 px-6 py-4 bg-synthor/90 backdrop-blur border-t border-white/10">
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
    );
}
