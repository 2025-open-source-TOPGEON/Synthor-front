import React from "react";
import useFieldList from "../../hooks/useFieldList";
import FieldItem from "./FieldItem";

export default function FieldList() {
    const { fields, handleChange, handleDelete, handleAdd } = useFieldList();

    return (
        <div>
            {fields.map((field) => (
                <FieldItem
                    key={field.id}
                    {...field}
                    onChange={handleChange}
                    onDelete={handleDelete}
                />
            ))}
            {/* Add Field 박스 */}
            <button
                onClick={handleAdd}
                className="w-full h-[60px] border-2 border-dashed border-gray-500 rounded-md 
               flex justify-center items-center text-gray-400 
               hover:bg-[#8E25E2]/10 hover:text-white transition-colors duration-200"
            >
                + Add Field
            </button>

        </div>
    );
}
