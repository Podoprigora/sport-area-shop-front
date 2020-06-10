import { useCallback, useEffect, useState, useMemo, useRef } from 'react';

const localStorage = window.localStorage;

export default function useLocalStorage(key, defaultData = null) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            let item = localStorage.getItem(key);
            item = JSON.parse(item);
            return item || defaultData;
        } catch (error) {
            console.log(error);
            return defaultData;
        }
    });

    const setItem = useCallback(
        (item) => {
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

    return [storedValue, setItem, removeItem];
}
