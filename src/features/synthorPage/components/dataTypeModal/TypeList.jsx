// TypeList.jsx
import React from "react";
import { CATEGORY_EXAMPLES } from "../../../../constants/categoryDataTypes.js";

function TypeList({ selectedCategory, selectedType, onSelectType, searchQuery }) {
    let items = selectedCategory === "All"
        ? Object.values(CATEGORY_EXAMPLES).flat()
        : CATEGORY_EXAMPLES[selectedCategory] || [];

    // 검색어 필터링
    if (searchQuery.trim()) {
        const lower = searchQuery.toLowerCase();
        items = items.filter((item) => item.name.toLowerCase().includes(lower));
    }

    return (
        <div className="w-full px-4 py-2 border-r border-gray-700 h-full overflow-y-auto">
            <h4 className="text-sm font-semibold mb-4 text-gray-200">
                {items.length} types available
            </h4>
            <ul className="space-y-3">
                {items.map((item) => (
                    <li
                        key={item.name}
                        onClick={() => onSelectType(item)}
                        className={`p-3 rounded-lg cursor-pointer transition ${selectedType?.name === item.name
                            ? "bg-cyan-400 text-black"
                            : "bg-gray-800 hover:bg-gray-700"
                            }`}
                    >
                        <p className="font-medium mb-1">{item.name}</p>
                        <div className="text-sm text-gray-300 flex flex-wrap gap-x-2 gap-y-1">
                            {item.examples.map((ex, i) => (
                                <span key={i} className="bg-gray-700 px-2 py-0.5 rounded text-xs">
                                    {ex}
                                </span>
                            ))}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}


export default TypeList; 
