import { useState } from "react";

export default function useFieldList() {
    const [fields, setFields] = useState([
        { id: "1", fieldName: "full_name", fieldType: "Full Name", constraint: "" },
        { id: "2", fieldName: "password", fieldType: "Password", constraint: "" },
        { id: "3", fieldName: "age", fieldType: "Number", constraint: "" },
    ]);

    const handleChange = (id, key, value) => {
        setFields((prev) =>
            prev.map((field) => (field.id === id ? { ...field, [key]: value } : field))
        );
    };

    const handleDelete = (id) => {
        setFields((prev) => prev.filter((field) => field.id !== id));
    };

    const handleAdd = () => {
        setFields((prev) => {
            const last = prev[prev.length - 1] || {
                fieldName: "",
                fieldType: "",
                constraint: "",
            };

            return [
                ...prev,
                {
                    id: last.id + 1,
                    fieldName: last.fieldName,
                    fieldType: last.fieldType,
                    constraint: last.constraint,
                },
            ];
        });
    };


    const reorderFields = (activeId, overId) => {
        setFields((prev) => {
            const oldIndex = prev.findIndex((f) => f.id === activeId);
            const newIndex = prev.findIndex((f) => f.id === overId);
            const updated = [...prev];
            const [moved] = updated.splice(oldIndex, 1);
            updated.splice(newIndex, 0, moved);
            return updated;
        });
    };

    return { fields, handleChange, handleDelete, handleAdd, reorderFields };
}
