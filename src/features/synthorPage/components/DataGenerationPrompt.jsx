import React from "react";
import SendIcon from "../../../assets/icons/SVG/sendIcon.svg";

export default function DataGenerationPrompt({ value, onChange, onSend }) {
    const hasValue = (value ?? "").trim().length > 0;

    return (
        <div className="relative w-full">
            <textarea
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                placeholder={`Describe the data you need. SYNTHOR AI will generate realistic values.
e.g. 100 Korean female users in their 20s with the last name Kim.`}
                className={`w-full h-[80px] p-3 pr-10 bg-synthor text-white rounded-md
                    placeholder-gray-500 outline-none transition-colors duration-200
                    ${hasValue
                        ? "border-2 border-[#8E25E2]"
                        : "border border-white focus:border-2 focus:border-[#8E25E2]"
                    }`}
            />

            {/* 전송 버튼 */}
            <button
                type="button"
                onClick={onSend}
                aria-label="Send prompt to AI"
                className="absolute top-1/2 -translate-y-1/2 right-3 p-1 rounded-md
             transition-transform duration-150 hover:scale-110 hover:bg-gray-600/40"
            >
                <img
                    src={SendIcon}
                    alt=""
                    className="w-8 h-8"
                />
            </button>


        </div>
    );
}
