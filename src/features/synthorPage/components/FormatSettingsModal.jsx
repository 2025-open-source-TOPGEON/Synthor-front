import React from "react";

export default function FormatSettingsModal({ onClose }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-gray-900 text-white p-6 rounded-lg w-[400px]">
                <h3 className="text-lg font-semibold mb-4">Format Settings</h3>

                <p className="text-gray-400 text-sm mb-4">
                    Configure the format settings for generated data here.
                </p>

                <button
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 w-full"
                >
                    Close
                </button>
            </div>
        </div>
    );
}
