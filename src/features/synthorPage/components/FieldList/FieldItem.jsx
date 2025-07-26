import React, { useState } from "react";
import FieldAssembly from "./FieldAssembly";
import dragIcon from "../../../../assets/icons/SVG/dragIcon.svg";
import deleteIcon from "../../../../assets/icons/SVG/deleteIcon.svg";


import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DataTypeModal from "../DataTypeModal";
import Constraints from "./Constrains";

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


    const [isTypeOpen, setIsTypeOpen] = useState(false);

    return (

        <div
            ref={setNodeRef}
            style={style}
            className="flex items-start gap-3 mb-4">

            {/* 드래그 아이콘 (왼쪽 컨테이너) */}
            <div
                className="w-8 h-8 flex justify-center items-center cursor-grab active:cursor-grabbing mt-8"
                {...attributes}
                {...listeners}
            >
                <img src={dragIcon} alt="drag" className="w-5 h-5" />
            </div>


            {/* 필드 전체 컨테이너 */}
            <div className="flex-1 border border-gray-500 rounded-[15px] p-3 bg-transparent">

                <div className="flex items-start justify-between gap-20">

                    <div className="flex items-start justify-between flex-col">
                        {/* Field Assembly (fieldName + fieldType) */}
                        <p className="text-s text-gray-200 mb-2">Field Assembly</p>
                        <div className="flex-1 border border-gray-700 rounded-[15px] p-2 bg-transparent focus-within:border-[#8E25E2] ">

                            <FieldAssembly
                                id={id}
                                fieldName={fieldName}
                                fieldType={fieldType}
                                onChange={onChange}
                                onOpenTypeModal={() => setIsTypeOpen(true)}
                            />

                        </div>
                    </div>

                    <Constraints
                        id={id}
                        constraint={constraint}
                        onChange={onChange}
                    />

                </div>
            </div>


            <button
                onClick={() => onDelete(id)}
                className="ml-3 p-1 rounded hover:bg-gray-700/30 transition"
            >
                <img src={deleteIcon} alt="delete" className="w-7 h-7" />
            </button>

            {/*모달*/}
            {isTypeOpen && (
                <DataTypeModal onClose={() => setIsTypeOpen(false)} />
            )}

        </div >
    );
}