import { useRef, useEffect } from 'react';

export default function useMountedRef() {
    const isMounted = useRef(true);

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    return isMounted;
}
