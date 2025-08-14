
import React from "react";
import InputBox from "../../../../components/common/inputBox/InputBox";
import { CATEGORY_PLACEHOLDERS } from "../../../../constants/categoryPlaceholders"

export default function PromptInput({ id, prompt, onChange, selectedType }) {

    // 선택된 타입의 placeholder 찾기
    const placeholder = (() => {

        for (const category in CATEGORY_PLACEHOLDERS) {
            const match = CATEGORY_PLACEHOLDERS[category].find(
                (item) => item.name === selectedType.name
            );
            if (match) return match.placeholder;
        }
    })();

    return (
        <div className="flex-1">
            <p className="text-s text-gray-200 mb-2">Constraints Prompt</p>
            <div className="flex-1 border border-gray-700 focus-within:border-[#8E25E2] rounded-[15px] p-2 bg-transparent">
                <InputBox
                    value={prompt}
                    onChange={(e) => onChange(id, "prompt", e.target.value)}
                    placeholder={placeholder}
                    fullWidth={true}
                />
            </div>
        </div>
    );
}
