import { useState } from "react";

export default function useFieldTypeModalState() {
    const [fieldTypeStates, setFieldTypeStates] = useState({});

    const setFieldType = (fieldId, type, options = {}, nullRatio = 0) => {
        setFieldTypeStates(prev => ({
            ...prev,
            [fieldId]: { type, options, nullRatio },
        }));
    };

    const updateNullRatio = (fieldId, nullRatio) => {
        setFieldTypeStates(prev => ({
            ...prev,
            [fieldId]: {
                ...(prev[fieldId] || { type: "", options: {} }),
                nullRatio,
            },
        }));
    };

    const getFieldType = (fieldId) => {
        return fieldTypeStates[fieldId] || { type: "", options: {}, nullRatio: 0 };
    };

    return { fieldTypeStates, setFieldType, getFieldType, updateNullRatio };
}
