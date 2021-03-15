import { useRef, useEffect } from 'react';

export function usePrevious<T>(newValue: T) {
    const value = useRef<T>();

    useEffect(() => {
        value.current = newValue;
    }, [newValue]);

    return value.current;
}
