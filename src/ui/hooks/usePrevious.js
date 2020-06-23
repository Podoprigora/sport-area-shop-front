import { useRef, useEffect } from 'react';

export default function usePrevious(newValue) {
    const value = useRef();

    useEffect(() => {
        value.current = newValue;
    }, [newValue]);

    return value.current;
}
