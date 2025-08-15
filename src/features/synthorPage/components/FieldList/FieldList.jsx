import React from "react";
import useFieldTypeModalState from "../../hooks/useFieldTypeModalState";
import FieldItem from "./FieldItem";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

export default function FieldList({
    fields,
    handleChange,
    handleDelete,
    handleAdd,
    reorderFields,
}) {
    const { setFieldType, getFieldType } = useFieldTypeModalState();

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;
        reorderFields(active.id, over.id);
    };

    return (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={fields.map((f) => f.id)} strategy={verticalListSortingStrategy}>
                {fields.map((field) => (
                    <FieldItem
                        key={field.id}
                        id={field.id}
                        fieldName={field.fieldName}
                        fieldType={field.fieldType}
                        options={field.options}
                        nullRatio={field.nullRatio}
                        prompt={field.prompt}
                        onChange={handleChange}
                        onDelete={handleDelete}
                        initialType={getFieldType(field.id, fields)}
                        onSaveType={(name, options, nullRatio) =>
                            setFieldType(field.id, name, options, nullRatio)
                        }
                    />
                ))}
            </SortableContext>

            <button
                onClick={handleAdd}
                className="mt-2 w-full h-[60px] border-2 border-dashed border-gray-400 rounded-[15px] text-gray-400 hover:bg-[#8E25E2]/10 transition"
            >
                + Add Field
            </button>
        </DndContext>
    );
}
