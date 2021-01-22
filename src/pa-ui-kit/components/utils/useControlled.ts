import { useState, useRef, useCallback } from 'react';

export function useControlled<T>(value?: T, defaultValue?: T) {
    const [valueState, setValueState] = useState<T | undefined>(defaultValue);
    const { current: isControlled } = useRef<boolean>(value !== null && value !== undefined);
    const innerValue = isControlled ? value : valueState;

    const setValueIfUncontrolled = useCallback(
        (newValue: React.SetStateAction<T | undefined>): void => {
            if (!isControlled) {
                setValueState(newValue);
            }
        },
        [isControlled]
    );

    return [innerValue, setValueIfUncontrolled] as const;
}
