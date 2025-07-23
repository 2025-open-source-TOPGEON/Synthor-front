import React from "react";

export default function DataGenerationPrompt({ value, onChange }) {
    const hasValue = value.trim().length > 0;

    return (

        <div className="w-full">
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Describe the data you need. SYNTHOR AI will generate realistic values. 
e.g. 100 Korean female users in their 20s with the last name Kim."

                className={`w-full h-[80px] p-3 bg-synthor text-white rounded-md 
                           placeholder-gray-500 outline-none transition-colors duration-200
                           ${hasValue
                        ? "border-2 border-[#8E25E2]"
                        : "border border-white focus:border-2 focus:border-[#8E25E2]"
                    }`}
            />
        </div>
    );
}
