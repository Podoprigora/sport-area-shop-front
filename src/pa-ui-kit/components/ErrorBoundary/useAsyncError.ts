import { useCallback, useState } from 'react';

export function useAsyncError() {
    const [, setError] = useState(null);

    return useCallback((error: Error) => {
        setError(() => {
            throw error;
        });
    }, []);
}
