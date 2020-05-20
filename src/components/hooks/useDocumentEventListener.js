import { useRef, useEffect } from 'react';
import setRef from '@components/utils/setRef';

export default function useDocumentEventListener(type, handler, useCapture = false) {
    const handlerRef = useRef(handler);

    useEffect(() => {
        setRef(handlerRef, handler);
    });

    useEffect(() => {
        function innerHandler(e) {
            return handlerRef.current(e);
        }

        document.addEventListener(type, innerHandler, useCapture);

        return () => {
            document.removeEventListener(type, innerHandler, useCapture);
        };
    }, [type, useCapture]);
}
