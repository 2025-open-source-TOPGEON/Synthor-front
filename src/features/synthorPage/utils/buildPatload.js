

import { toBackendType, toUIType } from "../utils/tyoeMapping";


function compact(obj) {
    // undefined/null/빈문자열 제거
    return Object.fromEntries(
        Object.entries(obj).filter(([_, v]) => v !== undefined && v !== null && v !== "")
    );
}

/**
 * @param {Array<{
 *  fieldName:string; fieldType:string; options?:object; nullRatio?:number;
 *  value?:any; prompt?:string; description?:string;
 * }>} fields
 * @param {number} count
 * @returns {DataGenerationRequest}
 */

export function buildGeneratePayload(fields, count = 3) {
    return {
        count,
        fields: (fields ?? []).map((f) => {
            const type = toBackendType(f.fieldType);
            const base = {
                name: f.fieldName,
                type,
                prompt: f.prompt,
                constraints: f.options ?? {},
                nullablePercent: typeof f.nullRatio === "number" ? f.nullRatio : 0,
                description: f.description,
            };

            // type이 fixed일 때만 value 포함
            if (type === "fixed") {
                base.value = f.value;
            }

            return compact(base);
        }),
    };
}


// 응답 -> UI 필드 변환기 추가
export function buildUIFieldsFromResponse(respFields, prevFields = []) {
    // prevFields: id 재사용을 위해 이름 기반 매칭
    const idByName = new Map(prevFields.map(f => [f.fieldName, f.id]));
    let nextId = prevFields.length > 0
        ? String(Math.max(...prevFields.map(f => Number(f.id) || 0)) + 1)
        : "1";

    const out = (respFields ?? []).map((rf) => {
        const fieldName = rf.name ?? "field_" + nextId;
        const existingId = idByName.get(fieldName);
        const id = existingId ?? (nextId++);
        return {
            id: String(id),
            fieldName,
            fieldType: toUIType(rf.type),                 // ← 백엔드 타입을 UI 라벨로
            options: rf.constraints ?? {},                // ← constraints → options
            nullRatio: typeof rf.nullablePercent === "number" ? rf.nullablePercent : 0,
            description: rf.description ?? "",
            // value/prompt 등은 응답에 없으면 비워둠
        };
    });

    // id가 겹치지 않도록 최종 보정
    const seen = new Set();
    return out.map((f, i) => {
        let id = f.id;
        while (seen.has(id)) id = String(Number(id) + 1);
        seen.add(id);
        return { ...f, id };
    });
}
