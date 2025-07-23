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
    onOpenTypeModal,
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
            className="flex items-start gap-3 mb-4">

            {/* ✅ 드래그 아이콘 (왼쪽 컨테이너) */}
            <div
                className="w-8 h-8 flex justify-center items-center cursor-grab active:cursor-grabbing mt-8"
                {...attributes}
                {...listeners}
            >
                <img src={dragIcon} alt="drag" className="w-5 h-5" />
            </div>


            {/* 필드 전체 컨테이너 */}
            <div className="flex-1 border border-gray-500 rounded-[15px] p-4 bg-transparent">
                <div className="flex items-start justify-between gap-6">
                    {/* Field Assembly (fieldName + fieldType) */}
                    <div className="flex-1">
                        <p className="text-sm text-gray-300 mb-2">Field Assembly</p>
                        <div className="flex items-center gap-3">
                            <InputBox
                                value={fieldName}
                                onChange={(e) => onChange(id, "fieldName", e.target.value)}
                                placeholder="field_name"
                            />


                            {/* Data Type (모달 열기 버튼) */}
                            <button
                                onClick={() => onOpenTypeModal(id)}
                                className="w-[140px] px-3 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 text-left"
                            >
                                {fieldType || "Select Data Type"}
                            </button>
                        </div>
                    </div>


                    {/* Constraints */}
                    <div className="w-[300px]">
                        <p className="text-sm text-gray-300 mb-2">Constraints</p>
                        <InputBox
                            value={constraint}
                            onChange={(e) => onChange(id, "constraint", e.target.value)}
                            placeholder="constraint (e.g. under 40)"
                            className="w-full"
                        />
                    </div>
                </div>
            </div>


            <button
                onClick={() => onDelete(id)}
                className="ml-3 p-1 rounded hover:bg-gray-700/30 transition"
            >
                <img src={deleteIcon} alt="delete" className="w-7 h-7" />
            </button>

        </div >
    );
}
