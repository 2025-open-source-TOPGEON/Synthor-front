import { useNavigate } from "react-router-dom";

export default function PreviewButton({ fields, format = "json", prompt, count = 50 }) {
    const navigate = useNavigate();

    const onClick = () => {

        navigate("/preview", { state: { fields, format, prompt, initialCount: count } });
    };

    return (
        <button
            onClick={onClick}
            className="w-[200px] h-[50px] bg-gray-700 rounded-[10px] hover:bg-gray-600"
        >
            Preview
        </button>
    );
}
