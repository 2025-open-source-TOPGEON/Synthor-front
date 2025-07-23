import React from "react";
import useFieldList from "../../hooks/useFieldList";
import FieldItem from "./FieldItem";
import {
    DndContext,
    closestCenter,
} from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
    arrayMove,
} from "@dnd-kit/sortable";

export default function FieldList() {
    const { fields, handleChange, handleDelete, handleAdd, reorderFields } = useFieldList();

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;
        reorderFields(active.id, over.id);
    };

    return (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext
                items={fields.map((f) => f.id)}
                strategy={verticalListSortingStrategy}
            >
                {fields.map((field) => (
                    <FieldItem
                        key={field.id}
                        id={field.id}
                        fieldName={field.fieldName}
                        fieldType={field.fieldType}
                        constraint={field.constraint}
                        onChange={handleChange}
                        onDelete={handleDelete}
                    />
                ))}
            </SortableContext>

            <button
                onClick={handleAdd}
                className="mt-2 w-full h-[60px] border-2 border-dashed border-gray-400 rounded-md text-gray-400
                   hover:bg-[#8E25E2]/10 transition"
            >
                + Add Field
            </button>
        </DndContext>
    );
}
