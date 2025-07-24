export default function GenerateButton({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="w-[200px] h-[50px] bg-cyan-400 text-black font-bold rounded-[10px] 
            shadow-[0_0_20px_5px_rgba(0,255,255,0.6)]
            hover:shadow-[0_0_25px_8px_rgba(0,255,255,0.9)]
            transition-all duration-300
            animate-neon"
        >
            Generate Data
        </button>
    );
}
