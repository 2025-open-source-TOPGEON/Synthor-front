// src/pages/synthorPage/components/preview/PreviewButton.jsx
export default function PreviewButton({ onOpen }) {
    return (
        <button
            onClick={onOpen}
            className="w-[200px] h-[50px] bg-gray-700 rounded-[10px] hover:bg-gray-600"
        >
            Preview
        </button>
    );
}
