import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./routes/AppRouter";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-synthor text-white flex justify-center items-start">
        <div className="w-[calc(100%-30px)] h-[calc(100%-30px)] rounded-[30px] m-[40px] border border-white p-6">

          {/* 라우터 페이지 */}
          <main>
            <AppRouter />
          </main>
        </div>
      </div>

    </Router>
  );
}
