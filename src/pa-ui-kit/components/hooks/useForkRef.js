import { useMemo } from 'react';
import setRef from '../utils/setRef';

export default function(refA, refB) {
    return useMemo(() => {
        if (!refA && !refB) {
            return null;
        }

        return (value) => {
            setRef(refA, value);
            setRef(refB, value);
        };
    }, [refA, refB]);
}
