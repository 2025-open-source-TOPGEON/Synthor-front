import { useState } from "react";

export default function useFieldList() {
    const [fields, setFields] = useState([
        { id: "1", fieldName: "full_name", fieldType: "Full Name", constraint: "" },
    ]);

    const handleChange = (id, key, value) => {
        setFields((prev) =>
            prev.map((f) => (f.id === id ? { ...f, [key]: value } : f))
        );
    };

    const handleDelete = (id) => {
        setFields((prev) => prev.filter((f) => f.id !== id));
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

    return { fields, handleChange, handleDelete, handleAdd };
}
