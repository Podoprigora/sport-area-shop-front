import { useState, useRef, useCallback } from 'react';

export default function useControlled(value, defaultValue = '') {
    const [valueState, setValueState] = useState(defaultValue);
    const { current: isControlled } = useRef(value !== null && value !== undefined);
    const innerValue = isControlled ? value : valueState;

    const setValueIfUncontrolled = useCallback(
        (newValue) => {
            if (!isControlled) {
                setValueState(newValue);
            }
        },
        [isControlled]
    );

    return [innerValue, setValueIfUncontrolled];
}
