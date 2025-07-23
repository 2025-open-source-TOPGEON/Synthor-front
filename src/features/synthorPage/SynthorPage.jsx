import React, { useState } from "react";
import { FieldList, DataGenerationPrompt } from "./components";

export default function SynthorPage() {
    const [prompt, setPrompt] = useState("");

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
            </div>
        </div>
    );
}
