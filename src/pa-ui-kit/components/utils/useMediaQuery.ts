import { useEffect, useState } from 'react';
import { useMountedRef } from './useMountedRef';

export function useMediaQuery(query: string): boolean {
    const isSupportMatchMedia: boolean =
        typeof window !== 'undefined' && typeof window.matchMedia !== 'undefined';

    const [matches, setMatches] = useState(() =>
        isSupportMatchMedia ? window.matchMedia(query).matches : false
    );

    const isMountedRef = useMountedRef();

    useEffect(() => {
        if (!isSupportMatchMedia) {
            return undefined;
        }

        const mqList = window.matchMedia(query);

        const updateMatches = () => {
            if (isMountedRef.current) {
                setMatches(mqList.matches);
            }
        };

        updateMatches();

        mqList.addEventListener('change', updateMatches);

        return () => {
            mqList.removeEventListener('change', updateMatches);
        };
    }, [query, isSupportMatchMedia, isMountedRef]);

    return matches;
}
