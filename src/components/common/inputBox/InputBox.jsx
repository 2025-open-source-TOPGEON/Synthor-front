import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

export default function InputBox({
    value,
    onChange,
    placeholder = "",
    type = "text",
    fullWidth = false,
    disabled = false,
    maxLength,
}) {
    const [isOverflowing, setIsOverflowing] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const inputRef = useRef(null);

    const baseClasses =
        "px-3 py-2 rounded-md bg-transparent text-white outline-none";
    const widthClass = fullWidth ? "w-full" : "w-auto";

    // ✅ 글자가 짤렸는지 감지
    useEffect(() => {
        const el = inputRef.current;
        if (el && el.scrollWidth > el.clientWidth) {
            setIsOverflowing(true);
        } else {
            setIsOverflowing(false);
        }
    }, [value]);

    if (type === "textarea") {
        return (
            <textarea
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                maxLength={maxLength}
                className={`${baseClasses} ${widthClass} resize-none`}
                rows={3}
            />
        );
    }

    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <input
                ref={inputRef}
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                maxLength={maxLength}
                className={`${baseClasses} ${widthClass}`}
            />

            {/* 호버 시 + 글자 짤릴 때만 미리보기 */}
            {isOverflowing && isHovering && (
                <div className="absolute top-full mt-1 left-0 max-w-[300px] p-2 bg-gray-800 text-white text-sm rounded shadow-lg z-50">
                    {value}
                </div>
            )}
        </div>
    );
}

InputBox.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.oneOf(["text", "textarea"]),
    fullWidth: PropTypes.bool,
    disabled: PropTypes.bool,
    maxLength: PropTypes.number,
};
