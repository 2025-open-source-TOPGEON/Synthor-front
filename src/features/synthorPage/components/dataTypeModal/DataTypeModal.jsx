// components/DataTypeModal.jsx
import React, { useState } from "react";
import TypeSidebar from "../dataTypeModal/TypeSidebar";
import TypeList from "./TypeList";

export default function DataTypeModal({ onClose }) {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedType, setSelectedType] = useState(null);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-gray-900 text-white p-6 rounded-lg w-[900px] h-[600px] flex flex-col relative">
                {/* 헤더 */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Select a Data Type</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white text-xl"
                    >
                        ✕
                    </button>
                </div>

                {/* 본문: 탭 + 리스트 */}
                <div className="flex flex-1 overflow-hidden">
                    {/* 탭바 */}
                    <TypeSidebar
                        selectedCategory={selectedCategory}
                        onSelectCategory={setSelectedCategory}
                    />

                    {/* 리스트 */}
                    <TypeList
                        selectedCategory={selectedCategory}
                        selectedType={selectedType}
                        onSelectType={setSelectedType}
                    />
                </div>
            </div>
        </div>
    );
}
