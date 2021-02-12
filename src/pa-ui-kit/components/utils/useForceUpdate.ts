import { useCallback, useState } from 'react';

export function useForceUpdate() {
    const [, setValue] = useState(0);

    return useCallback(() => {
        setValue((prevState) => prevState + 1);
    }, []);
}
