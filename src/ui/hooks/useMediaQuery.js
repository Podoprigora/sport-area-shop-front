import { useEffect, useState } from 'react';

export default function useMediaQuery(query = '') {
    const isSupportMatchMedia =
        typeof window !== 'undefined' && typeof window.matchMedia !== 'undefined';

    const [matches, setMatches] = useState(() =>
        isSupportMatchMedia ? window.matchMedia(query).matches : false
    );

    useEffect(() => {
        if (!isSupportMatchMedia) {
            return undefined;
        }

        const mqList = window.matchMedia(query);
        let isMounted = true;

        const updateMatches = () => {
            if (isMounted) {
                setMatches(mqList.matches);
            }
        };

        updateMatches();
        mqList.addListener(updateMatches);

        return () => {
            isMounted = false;
            mqList.removeListener(updateMatches);
        };
    }, [query, isSupportMatchMedia]);

    return matches;
}
