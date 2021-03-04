export function defineEventTarget<T = Element>(
    event: React.SyntheticEvent<T>,
    value: Record<string, unknown>
) {
    Object.defineProperty(event, 'target', {
        writable: true,
        value
    });
}
