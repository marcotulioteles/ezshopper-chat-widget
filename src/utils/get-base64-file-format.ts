const imageFileFormats = new Map([
    ["/", "jpg"],
    ["i", "png"],
    ["P", "svg"],
])

export const getBase64FileFormat = (base64Str: string) => {
    const firstChar = base64Str.charAt(0);
    return imageFileFormats.get(firstChar) || "png"
}