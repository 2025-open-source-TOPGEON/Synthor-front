
import React from "react";
import InputBox from "../../../../components/common/inputBox/InputBox";

export default function Constraints({ id, constraint, onChange }) {
    return (
        <div className="flex-1">
            <p className="text-s text-gray-200 mb-2">Constraints</p>
            <div className="flex-1 border border-gray-700 focus-within:border-[#8E25E2] rounded-[15px] p-2 bg-transparent">
                <InputBox
                    value={constraint}
                    onChange={(e) => onChange(id, "constraint", e.target.value)}
                    placeholder="constraint (e.g. under 40)"
                    fullWidth={true}
                />
            </div>
        </div>
    );
}
