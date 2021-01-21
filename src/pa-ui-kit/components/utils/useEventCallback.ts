import { useRef, useEffect, useCallback } from 'react';

export function useEventCallback<T extends (...args: any[]) => unknown>(fn: T): T {
    const ref = useRef(fn);

    useEffect(() => {
        ref.current = fn;
    });

    return useCallback((...args: any[]) => {
        const handler = ref.current;
        return handler(...args);
    }, []) as T;
}
