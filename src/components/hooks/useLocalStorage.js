import { useCallback, useEffect, useState, useMemo, useRef } from 'react';

const localStorage = window.localStorage;

const defaultValueMap = (item) => item;

export default function useLocalStorage(key, defaultData = null, valueMap = defaultValueMap) {
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
    const valueMapRef = useRef(valueMap);

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

    const value = useMemo(() => {
        if (storedValue) {
            return valueMapRef.current(storedValue);
        }
        return storedValue;
    }, [storedValue]);

    return useMemo(() => [value, setItem, removeItem], [value, setItem, removeItem]);
}
