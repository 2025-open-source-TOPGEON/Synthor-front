import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./routes/AppRouter";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-synthor text-white flex justify-center items-start">
        <div className="w-[calc(100%-30px)] h-[calc(100%-30px)] rounded-[30px] m-[40px] border border-white p-6">

          <header className="-mx-6 border-b border-white pb-4 mb-8 px-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Synthor</h1>
            <nav className="space-x-4 text-gray-300">
              <a href="/" className="hover:text-white">Home</a>
              <a href="/about" className="hover:text-white">About</a>
            </nav>
          </header>

          {/* 라우터 페이지 */}
          <main>
            <AppRouter />
          </main>
        </div>
      </div>
    </Router>
  );
}
