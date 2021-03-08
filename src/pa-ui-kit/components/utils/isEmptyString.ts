export function isEmptyString<T = unknown>(string: T) {
    return !string || (typeof string === 'string' && !string.trim());
}
