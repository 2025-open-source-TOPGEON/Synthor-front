import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./routes/AppRouter";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-synthor text-white flex justify-center items-start">

        {/* 고정된 흰색 테두리 틀 */}
        <div className="w-[calc(100%-30px)] h-[calc(100%-30px)] rounded-[30px] m-[40px] border border-white rounded-xl p-6">

          {/* Synthor 헤더 */}
          <header className="flex justify-between items-center border-b border-gray-600 pb-4 mb-6">
            <h1 className="text-2xl font-bold">Synthor</h1>
            <nav className="space-x-4 text-gray-300">
              <a href="/" className="hover:text-white">Home</a>
              <a href="/about" className="hover:text-white">About</a>
            </nav>
          </header>

          {/* 라우터로 페이지 교체 */}
          <main>
            <AppRouter />
          </main>
        </div>
      </div>
    </Router>
  );
}
