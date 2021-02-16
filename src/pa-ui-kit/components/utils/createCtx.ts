// Source: https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context/
import React from 'react';

export function createCtx<T extends Record<string, unknown> | null>() {
    const Context = React.createContext<T | undefined>(undefined);
    const Provider = Context.Provider;

    const useContext = () => {
        const contextValue = React.useContext(Context);

        if (contextValue === undefined) {
            throw new Error('useContext must be inside a privide with a value!');
        }

        return contextValue;
    };

    return { Provider, useContext } as const;
}
