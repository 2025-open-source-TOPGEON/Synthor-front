import { useState } from "react";

export default function useFieldList() {
    const [fields, setFields] = useState([
        { id: "1", fieldName: "full_name", fieldType: "Full Name", constraint: "" },
        { id: "1", fieldName: "gender", fieldType: "Gender", constraint: "" },
        { id: "1", fieldName: "age", fieldType: "Number", constraint: "" },
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
        setFields((prev) => [
            ...prev,
            {
                id: Date.now().toString(),
                fieldName: "",
                fieldType: "Full Name",
                constraint: "",
            },
        ]);
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
