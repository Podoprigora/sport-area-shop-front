import { useRef, useEffect, useCallback } from 'react';

export default function useEventCallback(fn) {
    const ref = useRef(fn);

    useEffect(() => {
        ref.current = fn;
    });

    return useCallback((...args) => {
        const handler = ref.current;
        return handler(...args);
    }, []);
}
