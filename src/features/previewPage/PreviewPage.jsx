
export default function PreviewPage() {
    return (
        <div className="w-full min-h-screen bg-synthor flex flex-col">

            {/* 헤더 */}
            <header
                className="
                    h-[75px] 
                    bg-cyan-400 text-black font-bold text-2xl
                    flex justify-between items-center
                    -mt-6 -ml-6 -mr-6 
                    px-6 rounded-t-[30px]
                    shadow-[0_0_20px_5px_rgba(0,255,255,0.6)]
                    transition-all duration-300
                    animate-neon
                "
            >
                <h1>Preview</h1>
                <button
                    className="text-2xl font-bold hover:opacity-80"
                    onClick={() => window.history.back()}
                >
                    ✕
                </button>
            </header>


            <main className="p-6 text-white">
                {/* Preview 데이터 표시 영역 */}
                <p>여기에 받아옴</p>
            </main>
        </div>
    );
}
