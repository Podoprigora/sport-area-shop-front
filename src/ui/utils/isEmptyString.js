export default function isEmptyString(string) {
    return !string || (typeof string === 'string' && !string.trim());
}
