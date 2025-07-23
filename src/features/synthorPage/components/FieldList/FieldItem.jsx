import React from "react";
import InputBox from "../../../../components/common/InputBox";
import dragIcon from "../../../../assets/icons/SVG/dragIcon.svg";
import deleteIcon from "../../../../assets/icons/SVG/deleteIcon.svg";


import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function FieldItem({
    id,
    fieldName,
    fieldType,
    constraint,
    onChange,
    onDelete,
}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (

        <div
            ref={setNodeRef}
            style={style}
            className="flex items-center gap-3 mb-4">

            {/* ✅ 드래그 아이콘 (왼쪽 컨테이너) */}
            <div
                className="w-8 h-8 flex justify-center items-center cursor-grab active:cursor-grabbing"
                {...attributes}
                {...listeners}
            >
                <img src={dragIcon} alt="drag" className="w-5 h-5" />
            </div>


            <div className="flex items-center justify-between flex-1 p-4 border border-gray-500 rounded-[15px] bg-transparent">
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
                    className="ml-3 p-1 rounded hover:bg-gray-700/30 transition"
                >
                    <img src={deleteIcon} alt="delete" className="w-7 h-7" />
                </button>
            </div>
        </div>
    );
}
