
import React, { useEffect } from "react";

export default function CountryOptions({ options, setOptions }) {
    const countryType = [
        "South Korea",
        "United States",
        "China",
        "Germany",
        "United Kingdom",
        "France",
        "Japan",
        "India",
        "Russia",
        "Brazil",
        "Canada",
        "Italy",
        "Australia",
        "Spain",
        "Turkey"
    ];

    //최초 렌더링 시 기본값 설정 
    useEffect(() => {
        setOptions((prev) =>
        ({
            options: prev.options ?? "South Korea"
        }));
    }, [setOptions]);

    const handleChange = (e) => {
        setOptions((prev) => ({
            ...prev,
            options: e.target.value
        }));
    }


    return (

        <div className="space-y-2 text-sm text-gray-200">
            <label className="block mb-1">Country Type</label>
            <select
                value={options.options || "South Korea"}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-600 focus:border-[#8E25E2] focus:outline-none"
            >
                {countryType.map((type) => (
                    <option key={type} value={type}>
                        {type}
                    </option>
                ))}
            </select>

        </div>
    )
}