
import React, { useState, useEffect } from "react";
import useFieldList from "../synthorPage/hooks/useFieldList";
import FieldList from "./components/FieldList/FieldList";
import DataGenerationPrompt from "./components/DataGenerationPrompt";
import FormatSettingsModal from "./components/FormatSettingsModal";
import GenerateButton from "../../components/common/button/GenerateButton";
import RowInputBox from "../../components/common/inputBox/RowInputBox";
import PreviewButton from "./components/preview/PreviewButton";
import { buildGeneratePayload } from "./utils/buildPatload";
import useDownload from "../../hooks/useDownload";
import PreviewModal from "../previewPage/PreviewModal";
import Logo from "../../assets/image/logo.svg";
import { aiGenerateWithPrompt, manualGenerate } from "../../api/dataApi";
import { buildUIFieldsFromResponse } from "./utils/buildPatload";

const ROWS_KEY = "synthor_rows";
const PROMPT_KEY = "synthor_prompt";
const FIELDS_KEY = "synthor_fields";
const FORMAT_KEY = "synthor_format";

const isHardReload = () => {
    try {
        const nav = performance.getEntriesByType?.("navigation")?.[0];
        if (nav) return nav.type === "reload";
        return performance.navigation?.type === 1;
    } catch {
        return false;
    }
};

if (isHardReload()) {
    try {
        localStorage.removeItem(FIELDS_KEY);
        localStorage.removeItem(ROWS_KEY);
        localStorage.removeItem(PROMPT_KEY);
        localStorage.removeItem(FORMAT_KEY);
    } catch { }
}


export default function SynthorPage() {
    const [isFormatOpen, setIsFormatOpen] = useState(false);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    const [format, setFormat] = useState(() => localStorage.getItem(FORMAT_KEY) || "json");
    const [prompt, setPrompt] = useState(() => localStorage.getItem(PROMPT_KEY) || "");
    const [rows, setRows] = useState(() => {
        const saved = localStorage.getItem(ROWS_KEY);
        return saved ? Number(saved) : 50;
    });

    useEffect(() => { localStorage.setItem(PROMPT_KEY, prompt); }, [prompt]);
    useEffect(() => { localStorage.setItem(ROWS_KEY, String(rows)); }, [rows]);
    useEffect(() => { localStorage.setItem(FORMAT_KEY, format); }, [format]);

    const fieldList = useFieldList();
    const download = useDownload();


    const handleGenerateAndDownload = async () => {
        const payload = {
            ...buildGeneratePayload(fieldList.fields, rows),
            ...(prompt ? { prompt } : {}),
        };
        const resp = await manualGenerate(format, payload);
        download(resp, { ext: format, filename: "synthorData" });
    };


    const handleSendPrompt = async () => {

        try {
            if (!prompt?.trim()) return;           // 빈 프롬프트면 호출 안 함
            const data = await aiGenerateWithPrompt(prompt); // ← 오직 prompt만 전송


            if (data && Array.isArray(data.fields) && data.fields.length > 0) {
                const next = buildUIFieldsFromResponse(data.fields, fieldList.fields);
                fieldList.replaceAllFields(next);
            }

        } catch {

        }
    };

    return (
        <div>
            <header className="-mx-6 border-b border-white pb-4 mb-8 px-6 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <img src={Logo} alt="Synthor Logo" className="w-8 h-8" />
                    <h1 className="text-2xl font-bold">Synthor</h1>
                </div>
                <nav className="space-x-4 text-gray-300">
                    <a href="/about" className="hover:text-white">About</a>
                </nav>
            </header>

            <div className="min-h-screen bg-synthor text-white">
                <div className="space-y-1 mb-6">
                    <h2 className="text-xl font-semibold">Field Configuration</h2>
                    <p className="text-gray-400 text-[15px]">Define the structure of your data by configuring individual fields</p>
                </div>

                <FieldList
                    fields={fieldList.fields}
                    handleChange={fieldList.handleChange}
                    handleDelete={fieldList.handleDelete}
                    handleAdd={fieldList.handleAdd}
                    reorderFields={fieldList.reorderFields}
                />

                <div className="-mx-6 mt-28 border-t border-white px-6">
                    <div className="mt-6">
                        <div className="space-y-1 mb-6">
                            <h2 className="text-xl font-semibold">Data Generation Prompt</h2>
                            <p className="text-gray-400 text-[15px]">Describe the data want to generate for more context and customization</p>
                        </div>

                        {/* ← 전송 버튼 핸들러 연결 */}
                        <DataGenerationPrompt value={prompt} onChange={setPrompt} onSend={handleSendPrompt} />
                    </div>

                    <div className="flex items-center justify-between mt-6">
                        <div className="flex gap-4">
                            <div className="relative">
                                <button
                                    onClick={() => setIsFormatOpen((v) => !v)}
                                    className="flex items-center justify-center gap-2 w-[200px] h-[50px] bg-gray-700 rounded-[10px] hover:bg-gray-600"
                                    aria-haspopup="menu"
                                    aria-expanded={isFormatOpen}
                                >
                                    ⚙️ Format: {format.toUpperCase()}
                                </button>

                                {isFormatOpen && (
                                    <FormatSettingsModal
                                        value={format}
                                        onSelect={(fmt) => setFormat(fmt)}
                                        onClose={() => setIsFormatOpen(false)}
                                    />
                                )}
                            </div>

                            <PreviewButton onOpen={() => setIsPreviewOpen(true)} />
                        </div>

                        <div className="flex items-center gap-4">
                            <RowInputBox value={rows} onChange={setRows} />
                            <GenerateButton onClick={handleGenerateAndDownload} />
                        </div>
                    </div>
                </div>
            </div>

            <PreviewModal
                open={isPreviewOpen}
                onClose={() => setIsPreviewOpen(false)}
                state={{
                    fields: fieldList.fields,
                    format,
                    prompt,
                    initialCount: rows,
                }}
            />
        </div>
    );
}