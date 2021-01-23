export function defineEventTarget<T = Element>(event: React.SyntheticEvent<T>, value: string) {
    Object.defineProperty(event, 'target', {
        writable: true,
        value
    });
}
