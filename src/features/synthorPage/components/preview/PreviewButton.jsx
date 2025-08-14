import { useNavigate } from "react-router-dom";
import { buildGeneratePayload } from "../../utils/buildPatload";

export default function PreviewButton({ fields, format = "json", prompt }) {
    const navigate = useNavigate();

    const onClick = () => {
        const payload = buildGeneratePayload(fields, 20);
        navigate("/preview", { state: { payload, format, prompt } });
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
