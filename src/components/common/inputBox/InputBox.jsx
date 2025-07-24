import React from "react";
import PropTypes from "prop-types";

export default function InputBox({
    value,
    onChange,
    placeholder = "",
    type = "text",
    fullWidth = false,
    disabled = false,
}) {
    const baseClasses =
        "px-3 py-2 rounded-md bg-transparent text-white outline-none";
    const widthClass = fullWidth ? "w-full" : "w-auto";

    if (type === "textarea") {
        return (
            <textarea
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                className={`${baseClasses} ${widthClass} resize-none`}
                rows={3}
            />
        );
    }

    return (
        <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            className={`${baseClasses} ${widthClass}`}
        />
    );
}

InputBox.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.oneOf(["text", "textarea"]),
    fullWidth: PropTypes.bool,
    disabled: PropTypes.bool,
};
