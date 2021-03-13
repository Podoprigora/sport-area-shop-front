// Source: https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context/
import React from 'react';

type ExtendedProps = Record<string, unknown> | null;

export function createCtx<T extends ExtendedProps>() {
    const Context = React.createContext<T | undefined>(undefined);
    const Provider = Context.Provider;

    const useContext = () => {
        const contextValue = React.useContext(Context);

        if (contextValue === undefined) {
            throw new Error('useContext must be inside a provider with a value!');
        }

        return contextValue;
    };

    return { Provider, useContext } as const;
}
