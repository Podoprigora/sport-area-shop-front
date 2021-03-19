import { useMemo } from 'react';

export function useUrlSearchParams<T extends Record<string, unknown>>(urlParamsString = '') {
    return useMemo(() => {
        if (urlParamsString) {
            const searchQuery = new URLSearchParams(urlParamsString);

            return Object.fromEntries(searchQuery.entries()) as T;
        }

        return undefined;
    }, [urlParamsString]);
}
