import React, { useState } from "react";
import TypeSidebar from "../dataTypeModal/TypeSidebar";
import TypeList from "./TypeList";

export default function DataTypeModal({ onClose }) {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedType, setSelectedType] = useState(null);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-gray-900 text-white p-6 rounded-lg w-[900px] h-[600px] flex relative">
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

                {/* 닫기 */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white"
                >
                    ✕
                </button>
            </div>
        </div>
    );
}
