import React, { useEffect, useState } from "react";

export default function AvatarOptions({ options, setOptions }) {
    const [from, setFrom] = useState(50);
    const [to, setTo] = useState(50);

    // 초기값 설정
    useEffect(() => {
        setFrom(options.size ? Number(options.size.split("x")[0]) : 50);
        setTo(options.size ? Number(options.size.split("x")[1]) : 50);
        setOptions({
            size: options.size ?? "50x50",
            format: options.format ?? "png",
        });
    }, []);

    const handleFromChange = (value) => {
        const num = Number(value);
        setFrom(num);
        setOptions((prev) => ({
            size: `${num}x${to}`,
            format: prev.format ?? "png",
        }));
    };

    const handleToChange = (value) => {
        const num = Number(value);
        setTo(num);
        setOptions((prev) => ({
            size: `${from}x${num}`,
            format: prev.format ?? "png",
        }));
    };

    const handleFormatChange = (value) => {
        setOptions((prev) => ({
            size: prev.size ?? `${from}x${to}`,
            format: value,
        }));
    };

    return (
        <div>
            {/* Size 입력 */}
            <label className="block text-sm text-gray-300 mb-2">Size</label>
            <div className="flex gap-2 mb-4">
                <input
                    type="number"
                    value={from.toString()}
                    onChange={(e) => handleFromChange(e.target.value)}
                    className="w-full bg-transparent border border-gray-700 rounded-[10px] px-3 py-2"
                    placeholder="Width"
                    min={0}
                />
                <span className="flex items-center text-gray-400">x</span>
                <input
                    type="number"
                    value={to.toString()}
                    onChange={(e) => handleToChange(e.target.value)}
                    className="w-full bg-transparent border border-gray-700 rounded-[10px] px-3 py-2"
                    placeholder="Height"
                    min={0}
                />
            </div>

            {/* Format 선택 */}
            <label className="block text-sm text-gray-300 mb-2">Format</label>
            <select
                value={options.format ?? "png"}
                onChange={(e) => handleFormatChange(e.target.value)}
                className="w-full bg-transparent border border-gray-700 rounded-[10px] px-3 py-2"
            >
                <option value="png">PNG</option>
                <option value="jpg">JPG</option>
                <option value="bmp">BMP</option>
            </select>
        </div>
    );
}
