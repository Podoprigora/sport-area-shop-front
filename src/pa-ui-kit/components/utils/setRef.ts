export function setRef<T>(ref: React.Ref<T>, value: T | null) {
    if (typeof ref === 'function') {
        ref(value);
    } else if (ref) {
        (ref as React.MutableRefObject<typeof value>).current = value;
    }
}
