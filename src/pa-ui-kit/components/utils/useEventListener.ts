import { useRef, useEffect } from 'react';

export function useEventListener<E = Event>(
    type: string,
    handler: (ev: E) => void,
    useCapture = false,
    options?: {
        enabled?: boolean;
        target?: Document | Window | Element;
    }
) {
    const { enabled = true, target = document } = options || {};
    const handlerRef = useRef(handler);

    useEffect(() => {
        handlerRef.current = handler;
    });

    useEffect(() => {
        if (!enabled) {
            return undefined;
        }

        function innerHandler(e: unknown) {
            return handlerRef.current(e as E);
        }

        target.addEventListener(type, innerHandler, useCapture);

        return () => {
            target.removeEventListener(type, innerHandler, useCapture);
        };
    }, [type, useCapture, enabled, target]);
}
