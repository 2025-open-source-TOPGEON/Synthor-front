
import React from "react";
import { CATEGORY_EXAMPLES } from "../../../../constants/categoryDataTypes";

export default function TypeSidebar({ selectedCategory, onSelectCategory }) {
    const categories = Object.keys(CATEGORY_EXAMPLES);

    return (
        <div className="w-full h-full px-3 py-2 border-r border-gray-700  overflow-y-auto px-3 py-2">
            <ul className="space-y-2">
                {/* All 탭 추가 */}
                <li
                    onClick={() => onSelectCategory("All")}
                    className={`cursor-pointer px-3 py-2 rounded-md text-sm font-medium transition ${selectedCategory === "All"
                        ? "bg-cyan-400 text-black"
                        : "text-gray-300 hover:bg-gray-700"
                        }`}
                >
                    All
                </li>

                {categories.map((category) => (
                    <li
                        key={category}
                        onClick={() => onSelectCategory(category)}
                        className={`cursor-pointer px-3 py-2 rounded-md text-sm font-medium transition ${selectedCategory === category
                            ? "bg-cyan-400 text-black"
                            : "text-gray-300 hover:bg-gray-700"
                            }`}
                    >
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    );
}
