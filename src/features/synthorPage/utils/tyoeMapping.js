
export const TYPE_MAP = {
    "Full Name": "full_name",
    "First Name": "first_name",
    "Last Name": "last_name",
    "Phone": "phone_number",
    "Address": "address",
    "Street Address": "street_address",
    "City": "city",
    "State": "state",
    "Country": "country",
    "Postal Code": "postal_code",
    "Company Name": "company_name",
    "Job Title": "job_title",
    "Department (Corporate)": "department_corporate",
    "Department (Retail)": "department_retail",
    "Product Name": "product_name",
    "Product Category": "product_category",
    "Catch Phrase": "catch_phrase",
    "Product Description": "product_description",
    "Language": "language",
    "Color": "color",
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
    "App Name": "app_name",
    "App Version": "app_version",
    "Device Model": "device_model",
    "Device Brand": "device_brand",
    "Device OS": "device_os",
    "Credit Card Number": "credit_card_number",
    "Credit Card Type": "credit_card_type",
    "Product Price": "product_price",
    "Currency": "currency",
    "IBAN": "iban",
    "SWIFT/BIC": "swift_bic",
    "Paragraphs": "paragraphs",
    "Datetime": "datetime",
    "Time": "time",
    "Latitude": "latitude",
    "Longitude": "longitude",
    "Number": "number",
    "Fixed": "fixed",
};

// UI -> 백엔드
export function toBackendType(uiType) {
    if (!uiType) return "string";
    if (TYPE_MAP[uiType]) return TYPE_MAP[uiType];
    return uiType.replaceAll(/\s+/g, "_").replaceAll(/[()]/g, "").toLowerCase();
}

// 백엔드 -> UI 
const REVERSE_TYPE_MAP = Object.fromEntries(
    Object.entries(TYPE_MAP).map(([ui, be]) => [be, ui])
);

export function toUIType(backendType) {
    if (!backendType) return "Number";
    return REVERSE_TYPE_MAP[backendType] ?? backendType
        .replaceAll("_", " ")
        .replace(/\b\w/g, (m) => m.toUpperCase());
}
