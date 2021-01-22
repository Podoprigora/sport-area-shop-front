import { useCallback, useEffect, useState } from 'react';

const localStorage = window.localStorage;

export function useLocalStorage<T>(key: string, defaultData?: T) {
    const [storedValue, setStoredValue] = useState<T | undefined>(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultData;
        } catch (error) {
            console.log(error);
            return defaultData;
        }
    });

    const setItem = useCallback(
        (item: React.SetStateAction<T | undefined>) => {
            try {
                const value = item instanceof Function ? item(storedValue) : item;
                setStoredValue(value);
                localStorage.setItem(key, JSON.stringify(value));
            } catch (error) {
                console.error(error);
            }
        },
        [key, storedValue]
    );

    const removeItem = useCallback(() => {
        try {
            localStorage.removeItem(key);
            setStoredValue(undefined);
        } catch (error) {
            console.error(error);
        }
    }, [key]);

    useEffect(() => {
        if (!key) {
            console.error('useLocalStorage require a key prop!');
        }
    }, [key]);

    return [storedValue, setItem, removeItem] as const;
}
