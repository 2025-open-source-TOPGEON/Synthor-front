import axios from "./axiosInstance";

const SUPPORTED_FORMATS = ["json", "csv", "html", "sql", "xml", "ldif"];

/**
 * POST /api/data/manual-generate
 * @param {"json"|"csv"|"html"|"sql"|"xml"|"ldif"} format
 * @param {object} body DataGenerationRequest
 * @returns {Promise<any|string>}
 */


export async function manualGenerate(format, body) {
    if (!SUPPORTED_FORMATS.includes(format)) {
        throw new Error(`Unsupported format: ${format}`);
    }

    const res = await axios.post("/api/data/manual-generate", body, {
        params: { format },
        headers: { "Content-Type": "application/json" },
        responseType: format === "json" ? "json" : "text",
        transformResponse: [(data, headers) => {
            const ct = headers?.["content-type"] || "";
            if (ct.includes("application/json")) {
                try { return JSON.parse(data); } catch { /* noop */ }
            }
            return data;
        }],
    });

    return res.data;
}
