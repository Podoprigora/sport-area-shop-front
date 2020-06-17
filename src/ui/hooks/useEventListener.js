import { useRef, useEffect } from 'react';
import setRef from '@ui/utils/setRef';

export default function useEventListener(
    type,
    handler,
    useCapture = false,
    { enabled = true, target = document } = {}
) {
    const handlerRef = useRef(handler);

    useEffect(() => {
        handlerRef.current = handler;
    });

    useEffect(() => {
        if (!enabled) {
            return undefined;
        }

        function innerHandler(e) {
            return handlerRef.current(e);
        }

        target.addEventListener(type, innerHandler, useCapture);

        return () => {
            target.removeEventListener(type, innerHandler, useCapture);
        };
    }, [type, useCapture, enabled, target]);
}
