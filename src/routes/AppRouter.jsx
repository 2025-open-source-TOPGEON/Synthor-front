import React from "react";
import { Routes, Route } from "react-router-dom";
import SynthorPage from "../features/synthorPage/SynthorPage"
import PreviewPage from "../features/previewPage/PreviewPage"


export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<SynthorPage />} />
            <Route path="/preview" element={<PreviewPage />} />
        </Routes>
    );
}
