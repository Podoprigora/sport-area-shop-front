import { useState, useCallback } from 'react';

export default function useSelectedState(defaultValue = null) {
    const [selected, setSelected] = useState(defaultValue);

    const handleSelect = useCallback((newValue) => {
        setSelected((prevState) => {
            if (prevState instanceof Array && newValue) {
                if (prevState.indexOf(newValue) !== -1) {
                    return prevState.filter((selectedValue) => selectedValue !== newValue);
                }

                return [...prevState, newValue];
            }

            return newValue;
        });
    }, []);

    return [selected, handleSelect];
}
