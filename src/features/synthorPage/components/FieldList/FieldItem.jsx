import React from "react";
import InputBox from "../../../../components/common/InputBox";

export default function FieldItem({
    id,
    fieldName,
    fieldType,
    constraint,
    onChange,
    onDelete,
}) {
    return (
        <div className="flex items-center justify-between p-3 bg-gray-800 rounded-md mb-2">
            <div className="flex items-center gap-2 flex-1">
                <InputBox
                    value={fieldName}
                    onChange={(e) => onChange(id, "fieldName", e.target.value)}
                    placeholder="field_name"
                />

                <select
                    value={fieldType}
                    onChange={(e) => onChange(id, "fieldType", e.target.value)}
                    className="px-2 py-1 text-sm rounded bg-gray-700 text-white outline-none"
                >
                    <option value="Full Name">Full Name</option>
                    <option value="Email">Email</option>
                    <option value="Age">Age</option>
                </select>

                <InputBox
                    value={constraint}
                    onChange={(e) => onChange(id, "constraint", e.target.value)}
                    placeholder="constraint (e.g. under 40)"
                />
            </div>

            <button
                onClick={() => onDelete(id)}
                className="ml-3 px-2 py-1 text-sm bg-red-600 rounded hover:bg-red-500"
            >
                ✕
            </button>
        </div>
    );
}
