import React, { useMemo } from 'react';
import { setRef } from './setRef';

export function useForkRef<T>(refA: React.Ref<T>, refB: React.Ref<T>): React.Ref<T> {
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
