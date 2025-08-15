
import { useEffect, useState } from "react";

const LS_KEY = "synthor_fields";

export default function useFieldList() {

  const [fields, setFields] = useState(() => {

    const saved = localStorage.getItem(LS_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return (parsed ?? []).map(f => ({
          ...f,
          prompt: f.prompt ?? "",
          options: f.options ?? {},   // ✅ 누락 시만 채움
        }));
      } catch { }
    }


    // 초기 기본값
    return [
      { id: "1", fieldName: "full_name", fieldType: "Full Name", nullRatio: 0 },
      { id: "2", fieldName: "email", fieldType: "Email Address", nullRatio: 0 },
      { id: "3", fieldName: "password", fieldType: "Password", nullRatio: 0 },
      { id: "4", fieldName: "age", fieldType: "Number", nullRatio: 0 },
      { id: "5", fieldName: "date", fieldType: "Datetime", nullRatio: 0 },
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

      // 마지막 필드가 없으면 기본값으로 추가
      if (!last) {
        return [{
          id: "1",
          fieldName: "full_name",
          fieldType: "Full name",
          nullRatio: 0
        }];
      }

      // 마지막 필드를 복제하되 id만 변경
      const nextId = String(Number(last.id) + 1);
      const newField = {
        ...last,
        id: nextId
      };

      return [...prev, newField];
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

  // 성공 시 응답으로 전체 교체
  const replaceAllFields = (next) => {
    setFields(Array.isArray(next) ? next : []);
  };

  return { fields, handleChange, handleDelete, handleAdd, reorderFields, replaceAllFields };
}
