import { useMemo } from 'react';

export default function useUrlSearchParams(urlParamsString = '') {
    return useMemo(() => {
        if (urlParamsString) {
            const searchQuery = new URLSearchParams(urlParamsString);

            return Array.from(searchQuery.entries()).reduce((result, param) => {
                return { ...result, [param[0]]: param[1] };
            }, {});
        }

        return null;
    }, [urlParamsString]);
}
