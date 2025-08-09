import React, { useEffect, useState } from "react";
import PasswordOptions from "./options/PasswordOptions";
import DatetimeOptions from "./options/ DatetimeOptions";
import TimeOptions from "./options/TimeOptions";
import UrlOptions from "./options/UrlOptions";
import CreditCardTypeOptions from "./options/CreditCardTypeOptions";
import CreditCardNuberOptions from "./options/CreditCardTypeOptions";
import ParagraphsOptions from "./options/ParagraphsOptions";
import NumberOptions from "./options/NumberOptions";
import StateOptions from "./options/StateOptions";
import CountryOptions from "./options/CountryOptions"
import PhoneOptions from "./options/PhoneOptions";
import AvatarOptions from "./options/AvatarOptions";

export default function TypeConfigPanel({
    selectedType,
    onConfirm,
    initialOptions = {},
    initialNullRatio = 0,
}) {
    const [options, setOptions] = useState(initialOptions);
    const [nullRatio, setNullRatio] = useState(initialNullRatio); // %

    // selectedType 또는 초기값이 바뀔 때 동기화
    useEffect(() => {
        setOptions(initialOptions || {});
    }, [selectedType, initialOptions]);

    useEffect(() => {
        setNullRatio(
            typeof initialNullRatio === "number" ? initialNullRatio : 0
        );
    }, [selectedType, initialNullRatio]);

    if (!selectedType) {
        return <div className="w-full h-full overflow-y-auto px-4 py-2" />;
    }

    const renderOptionsUI = () => {
        switch (selectedType.name) {
            case "Password":
                return (<PasswordOptions options={options} setOptions={setOptions} />);

            case "Datetime":
                return (<DatetimeOptions options={options} setOptions={setOptions} />);

            case "Time":
                return <TimeOptions options={options} setOptions={setOptions} />;

            case "URL":
                return <UrlOptions options={options} setOptions={setOptions} />;

            case "Credit Card Type":
                return <CreditCardTypeOptions options={options} setOptions={setOptions} />;

            case "Credit Card #":
                return <CreditCardNuberOptions options={options} setOptions={setOptions} />;

            case "Paragraphs":
                return <ParagraphsOptions options={options} setOptions={setOptions} />;

            case "Number":
                return <NumberOptions options={options} setOptions={setOptions} />;

            case "State":
                return <StateOptions options={options} setOptions={setOptions} />;

            case "Country":
                return <CountryOptions options={options} setOptions={setOptions} />;

            case "Phone":
                return <PhoneOptions options={options} setOptions={setOptions} />;

            case "Avatar":
                return <AvatarOptions options={options} setOptions={setOptions} />;

            default:
                return null;
        }
    };

    return (
        <div className="w-full h-full overflow-y-auto px-4 py-2">
            <h4 className="text-lg font-semibold mb-4">{selectedType.name}</h4>
            <p className="text-gray-400 text-sm mb-4">
                Configure the selected data type
            </p>

            {/* 상세 옵션 */}
            {renderOptionsUI()}

            {/* Null 비율 설정 (모든 타입 공통) */}
            <div className="mt-6">
                <label className="block text-sm text-gray-300 mb-2">
                    Null ratio (%)
                </label>
                <input
                    type="number"
                    min={0}
                    max={100}
                    value={nullRatio.toString()}
                    onChange={(e) => {
                        const v = Number(e.target.value);
                        if (!Number.isNaN(v)) setNullRatio(Math.max(0, Math.min(100, v)));
                    }}
                    className="w-full bg-transparent border border-gray-700 rounded-[10px] px-3 py-2 focus:outline-none focus:border-[#8E25E2]"
                />
            </div>

            <button
                className="mt-4 w-full px-4 py-2 bg-cyan-400 rounded hover:bg-cyan-700 transition"
                onClick={() => onConfirm({ options, nullRatio })}
            >
                Select Type
            </button>
        </div>
    );
}
