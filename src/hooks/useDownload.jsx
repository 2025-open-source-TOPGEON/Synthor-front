export default function useDownload() {
    return (data, { ext = "json", filename = "synthorData" } = {}) => {
        const content = typeof data === "string" ? data : JSON.stringify(data, null, 2);
        const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${filename}.${ext}`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    };
}
