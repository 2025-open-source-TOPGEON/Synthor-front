// components/DataTypeModal.jsx
import React, { useState } from "react";
import TypeSidebar from "../dataTypeModal/TypeSidebar";
import TypeList from "./TypeList";
import InputBox from "../../../../components/common/inputBox/InputBox";
import searchIcon from "../../../../assets/icons/SVG/searchIcon.svg";

export default function DataTypeModal({ onClose }) {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedType, setSelectedType] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-gray-900 text-white p-6 rounded-lg w-[900px] h-[600px] flex flex-col relative">

                {/* 헤더 */}
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-semibold">Select a Data Type</h2>

                    <div className="flex items-center gap-4">
                        {/* 검색창 */}
                        <div className="flex items-center bg-transparent border border-gray-700 focus-within:border-[#8E25E2] rounded-[10px] px-3 h-9">
                            <img src={searchIcon} className="w-4 h-4 mr-2" />
                            <InputBox
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search Data types"
                                fullWidth
                            />
                        </div>

                        {/* X 버튼 */}
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white text-xl h-9 flex items-center"
                        >
                            ✕
                        </button>
                    </div>
                </div>


                {/* 구분선 */}
                <div className="border-b border-gray-700 mb-4"></div>

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
                        searchQuery={searchQuery}
                    />
                </div>
            </div>
        </div>
    );
}
