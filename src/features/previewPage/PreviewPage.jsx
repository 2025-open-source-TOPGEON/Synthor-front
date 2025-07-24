import { useState } from "react";
import GenerateButton from "../../components/common/button/GenerateButton";
import RowInputBox from "../../components/common/inputBox/RowInputBox";

export default function PreviewPage() {
    const [rows, setRows] = useState(50);
    const [prompt, setPrompt] = useState("");

    return (
        <div className="w-full min-h-screen bg-synthor flex flex-col relative">

            {/* 헤더 */}
            <header
                className="
                    h-[90px] 
                    bg-cyan-400 text-black font-bold text-2xl
                    flex justify-between items-center
                    -mt-6 -ml-6 -mr-6 
                    px-6 rounded-t-[30px]
                    shadow-[0_0_20px_5px_rgba(0,255,255,0.6)]
                    transition-all duration-300
                    animate-neon
                "
            >
                <h1>Preview</h1>
                <button
                    className="text-2xl font-bold hover:opacity-80"
                    onClick={() => window.history.back()}
                >
                    ✕
                </button>
            </header>

            {/* 메인 내용 */}
            <main className="p-6 text-white">
                <p>여기에 받아오는데요
                </p>
            </main>


            <div
                className="
                    absolute bottom-6 right-6
                    flex items-center gap-4
                "
            >
                <RowInputBox value={rows} onChange={setRows} />
                <GenerateButton onClick={() => console.log("Generated Rows:", rows, "Prompt:", prompt)} />
            </div>
        </div>
    );
}
