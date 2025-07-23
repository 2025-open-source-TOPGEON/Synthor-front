import React, { useState } from "react";
import { FieldList, DataGenerationPrompt } from "./components";
import FormatSettingsModal from "./components/FormatSettingsModal";

export default function SynthorPage() {
    const [prompt, setPrompt] = useState("");
    const [isFormatOpen, setIsFormatOpen] = useState(false);
    const [rows, setRows] = useState(50);


    return (
        <div className="min-h-screen bg-synthor text-white">

            {/* Field Configuration */}
            <div className="space-y-1 mb-6">
                <h2 className="text-xl font-semibold">Field Configuration</h2>
                <p className="text-gray-400 text-[15px]">
                    Define the structure of your data by configuring individual fields
                </p>
            </div>

            <FieldList />

            <div className="-mx-6 mt-40 border-t border-white px-6">

                {/* Data Generation Prompt */}
                <div className="mt-6">
                    <div className="space-y-1 mb-6">
                        <h2 className="text-xl font-semibold">Data Generation Prompt</h2>
                        <p className="text-gray-400 text-[15px]">
                            Describe the data want to generate for more context and customization
                        </p>
                    </div>
                    <DataGenerationPrompt value={prompt} onChange={setPrompt} />
                </div>


                {/* 하단 버튼 & Rows 입력 */}
                <div className="flex items-center justify-between mt-6">

                    {/* 왼쪽: Format Settings + Preview */}
                    <div className="flex gap-4">
                        <button
                            onClick={() => setIsFormatOpen(true)}
                            className="flex items-center justify-center gap-2 w-[200px] h-[50px] bg-gray-700 rounded-[10px] hover:bg-gray-600"
                        >
                            ⚙️ Format Settings
                        </button>

                        <button
                            className="w-[200px] h-[50px] bg-gray-700 rounded-[10px] hover:bg-gray-600"
                        >
                            Preview
                        </button>
                    </div>

                    {/* 오른쪽: Rows + Generate Data */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-xl ">#Rows:</span>
                            <input
                                type="number"
                                value={rows}
                                min={1}
                                onChange={(e) => setRows(Number(e.target.value))}
                                className="w-[200px] h-[50px] rounded-[10px] border border-gray-500 bg-transparent text-white text-center outline-none focus:border-purple-400"
                            />
                        </div>

                        <button
                            className="w-[200px] h-[50px] bg-cyan-400 text-black font-bold rounded-[10px] ㄴㄴ
                            shadow-[0_0_20px_5px_rgba(0,255,255,0.6)]
                            hover:shadow-[0_0_25px_8px_rgba(0,255,255,0.9)]
                            transition-all duration-300
                            "
                        >
                            Generate Data
                        </button>

                    </div>
                </div>

                {/* 모달 구현 예정 */}
                {isFormatOpen && (
                    <FormatSettingsModal onClose={() => setIsFormatOpen(false)} />
                )}
            </div>
        </div>
    );
}
