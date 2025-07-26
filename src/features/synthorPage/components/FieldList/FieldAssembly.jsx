import React from "react";
import InputBox from "../../../../components/common/inputBox/InputBox";
import moveIcon from "../../../../assets/icons/SVG/move.svg";

export default function FieldAssembly({
    id,
    fieldName,
    fieldType,
    onChange,
    onOpenTypeModal,
}) {
    return (
        <div className="flex-1">

            <div className="flex items-center gap-3">
                <InputBox
                    value={fieldName}
                    onChange={(e) => onChange(id, "fieldName", e.target.value)}
                    placeholder="field_name"
                    maxLength={30}
                />

                {/* Data Type (모달 열기 버튼) */}
                <button
                    onClick={() => onOpenTypeModal(id)}
                    className="flex items-center w-[200px] rounded-[10px] px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-600 text-left">
                    {fieldType}
                    <img src={moveIcon} className="w-3 h-3 ml-auto" />
                </button>
            </div>
        </div>
    );
}
