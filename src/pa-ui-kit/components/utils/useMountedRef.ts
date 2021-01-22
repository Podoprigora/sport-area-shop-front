import { useRef, useEffect } from 'react';

export function useMountedRef(): React.MutableRefObject<boolean> {
    const isMounted = useRef(true);

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    return isMounted;
}
