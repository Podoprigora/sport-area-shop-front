export default function defineEventTarget(event, value) {
    Object.defineProperty(event, 'target', {
        writable: true,
        value
    });
}
