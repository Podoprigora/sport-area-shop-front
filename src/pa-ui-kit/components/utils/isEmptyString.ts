export function isEmptyString(string: string | undefined | null) {
    return !string || (typeof string === 'string' && !string.trim());
}
