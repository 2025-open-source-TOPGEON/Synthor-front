
const TYPE_MAP = {
    // 개인정보
    "Full Name": "full_name",
    "First Name": "first_name",
    "Last Name": "last_name",
    "Phone": "phone",

    // 주소
    "Address": "address",
    "Street Address": "street_address",
    "City": "city",
    "State": "state",
    "Country": "country",
    "Postal Code": "postal_code",

    // 회사/상업
    "Company Name": "company_name",
    "Job Title": "job_title",
    "Department (Corporate)": "department_corporate",
    "Department (Retail)": "department_retail",
    "Product Name": "product_name",
    "Product Category": "product_category",
    "Catch Phrase": "catch_phrase",
    "Product Description": "product_description",

    // 기타
    "Language": "language",
    "Color": "color",

    // 인터넷/기술
    "Username": "username",
    "Password": "password",
    "Email Address": "email_address",
    "Domain Name": "domain_name",
    "URL": "url",
    "MAC Address": "mac_address",
    "IPv4 Address": "ip_v4_address",
    "IPv6 Address": "ip_v6_address",
    "User Agent": "user_agent",
    "Avatar": "avatar",

    // 앱/기기
    "App Name": "app_name",
    "App Version": "app_version",
    "Device Model": "device_model",
    "Device Brand": "device_brand",
    "Device OS": "device_os",

    // 금융
    "Credit Card Number": "credit_card_number",
    "Credit Card Type": "credit_card_type",
    "Product Price": "product_price",
    "Currency": "currency",
    "IBAN": "iban",
    "SWIFT/BIC": "swift_bic",

    // 기타
    "Paragraphs": "paragraphs",
    "Datetime": "datetime",
    "Time": "time",
    "Latitude": "latitude",
    "Longitude": "longitude",
    "Number (1~100)": "number_between_1_100",

    // 고정값(예: UI에서 "Fixed" 라벨을 쓰는 경우)
    "Fixed": "fixed",
};

export function toBackendType(uiType) {
    if (!uiType) return "string";
    if (TYPE_MAP[uiType]) return TYPE_MAP[uiType];
    return uiType.replaceAll(/\s+/g, "_").replaceAll(/[()]/g, "").toLowerCase();
}

function compact(obj) {
    // undefined/null/빈문자열 제거
    return Object.fromEntries(
        Object.entries(obj).filter(([_, v]) => v !== undefined && v !== null && v !== "")
    );
}

/**
 * @param {Array<{
 *  fieldName:string; fieldType:string; options?:object; nullRatio?:number;
 *  value?:any; prompt?:string; description?:string;
 * }>} fields
 * @param {number} count
 * @returns {DataGenerationRequest}
 */

export function buildGeneratePayload(fields, count = 3) {
    return {
        count,
        fields: (fields ?? []).map((f) => {
            const type = toBackendType(f.fieldType);
            const base = {
                name: f.fieldName,
                type,
                prompt: f.prompt,
                constraints: f.options ?? {},
                nullablePercent: typeof f.nullRatio === "number" ? f.nullRatio : 0,
                description: f.description,
            };

            // type이 fixed일 때만 value 포함
            if (type === "fixed") {
                base.value = f.value;
            }

            return compact(base);
        }),
    };
}
