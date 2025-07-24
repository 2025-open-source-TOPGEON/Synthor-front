import React, { useState } from "react";
import { FieldList, DataGenerationPrompt } from "./components";
import FormatSettingsModal from "./components/FormatSettingsModal";
import { useNavigate } from "react-router-dom";
import GenerateButton from "../../components/common/button/GenerateButton";
import RowInputBox from "../../components/common/inputBox/RowInputBox";

export default function SynthorPage() {
    const [prompt, setPrompt] = useState("");
    const [isFormatOpen, setIsFormatOpen] = useState(false);
    const [rows, setRows] = useState(50);
    const navigate = useNavigate();



    return (
        <div>
            <header className="-mx-6 border-b border-white pb-4 mb-8 px-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Synthor</h1>
                <nav className="space-x-4 text-gray-300">
                    <a href="/" className="hover:text-white">Home</a>
                    <a href="/about" className="hover:text-white">About</a>

                </nav>
            </header>

            <div className="min-h-screen bg-synthor text-white">


                {/* Field Configuration */}
                <div className="space-y-1 mb-6">
                    <h2 className="text-xl font-semibold">Field Configuration</h2>
                    <p className="text-gray-400 text-[15px]">
                        Define the structure of your data by configuring individual fields
                    </p>
                </div>

                <FieldList />

                <div className="-mx-6 mt-28 border-t border-white px-6">

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


                    {/* 하단 버튼 4개 */}
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
                                onClick={() => navigate("/preview")}
                                className="w-[200px] h-[50px] bg-gray-700 rounded-[10px] hover:bg-gray-600"
                            >
                                Preview
                            </button>
                        </div>


                        {/* 오른쪽: Rows + Generate Data */}
                        <div className="flex items-center gap-4">
                            <RowInputBox value={rows} onChange={setRows} />
                            <GenerateButton onClick={() => console.log("Generated Rows:", rows, "Prompt:", prompt)} />

                        </div>
                    </div>

                </div>
            </div >

            {/*모달*/}
            {isFormatOpen && (
                <FormatSettingsModal onClose={() => setIsFormatOpen(false)} />
            )}

        </div>

    );
}
