import { useState } from "react";

export default function useFieldList() {
  const [fields, setFields] = useState([
    { id: "1", fieldName: "full_name", fieldType: "Full Name", constraint: "", options: {}, nullRatio: 0 },
    { id: "2", fieldName: "email", fieldType: "Email Address", constraint: "", options: {}, nullRatio: 0 },
    { id: "3", fieldName: "password", fieldType: "Password", constraint: "", options: {}, nullRatio: 0 },
    { id: "4", fieldName: "age", fieldType: "Number", constraint: "", options: {}, nullRatio: 0 },
    { id: "5", fieldName: "date", fieldType: "Datetime", constraint: "", options: {}, nullRatio: 0 },
  ]);

  const handleChange = (id, key, value) => {
    setFields((prev) => prev.map((f) => (f.id === id ? { ...f, [key]: value } : f)));
  };

  const handleDelete = (id) => {
    setFields((prev) => prev.filter((f) => f.id !== id));
  };

  const handleAdd = () => {
    setFields((prev) => {
      const last = prev[prev.length - 1];
      const nextId = String((last ? Number(last.id) : 0) + 1);
      return [
        ...prev,
        {
          id: nextId,
          fieldName: "",
          fieldType: "",
          constraint: "",
          options: {},
          nullRatio: 0,
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
