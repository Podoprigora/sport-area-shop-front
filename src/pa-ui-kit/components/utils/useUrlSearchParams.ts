import { useMemo } from 'react';

export function useUrlSearchParams<T extends Record<string, unknown>>(urlParamsString = '') {
    return useMemo(() => {
        if (urlParamsString) {
            const searchQuery = new URLSearchParams(urlParamsString);

            return Array.from(searchQuery.entries()).reduce((result: T, param) => {
                return { ...result, [param[0]]: param[1] };
            }, {} as T);
        }

        return null;
    }, [urlParamsString]);
}
