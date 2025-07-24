export default function RowInputBox({ value, onChange }) {
    return (
        <div className="flex items-center gap-2">
            <span className="font-semibold text-xl">#Rows:</span>
            <input
                type="number"
                value={value}
                min={1}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-[200px] h-[50px] rounded-[10px] border border-gray-500 bg-transparent text-white text-center outline-none focus:border-2 focus:border-[#8E25E2]"
            />
        </div>
    );
}
