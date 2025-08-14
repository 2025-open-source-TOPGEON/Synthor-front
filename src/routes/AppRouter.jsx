import React from "react";
import { Routes, Route } from "react-router-dom";
import SynthorPage from "../features/synthorPage/SynthorPage"


export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<SynthorPage />} />
        </Routes>
    );
}
