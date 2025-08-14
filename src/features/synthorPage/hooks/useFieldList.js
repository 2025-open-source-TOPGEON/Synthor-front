
import { useEffect, useState } from "react";

const LS_KEY = "synthor_fields";

export default function useFieldList() {
  const [fields, setFields] = useState(() => {
    const saved = localStorage.getItem(LS_KEY);
    if (saved) {
      try { return JSON.parse(saved); } catch { }
    }
    // 초기 기본값
    return [
      { id: "1", fieldName: "full_name", fieldType: "Full Name", options: {}, nullRatio: 0 },
      { id: "2", fieldName: "email", fieldType: "Email Address", options: {}, nullRatio: 0 },
      { id: "3", fieldName: "password", fieldType: "Password", options: {}, nullRatio: 0 },
      { id: "4", fieldName: "age", fieldType: "Number", options: {}, nullRatio: 0 },
      { id: "5", fieldName: "date", fieldType: "Datetime", options: {}, nullRatio: 0 },
    ];
  });

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(fields));
  }, [fields]);

  const handleChange = (id, key, value) => {
    setFields((prev) => prev.map((f) => (f.id === id ? { ...f, [key]: value } : f)));
  };
  const handleDelete = (id) => setFields((prev) => prev.filter((f) => f.id !== id));
  const handleAdd = () => {
    setFields((prev) => {
      const last = prev[prev.length - 1];
      const nextId = String((last ? Number(last.id) : 0) + 1);
      return [...prev, { id: nextId, fieldName: "", fieldType: "", options: {}, nullRatio: 0 }];
    });
  };
  const reorderFields = (activeId, overId) => {
    setFields((prev) => {
      const oldIndex = prev.findIndex((f) => f.id === activeId);
      const newIndex = prev.findIndex((f) => f.id === overId);
      const arr = [...prev];
      const [moved] = arr.splice(oldIndex, 1);
      arr.splice(newIndex, 0, moved);
      return arr;
    });
  };

  return { fields, handleChange, handleDelete, handleAdd, reorderFields };
}
