import React, { useMemo, useCallback, useState } from 'react';

import { createCtx } from '../utils';

interface WindowManagerProviderProps {
    children?: React.ReactNode;
}

type WindowParams = Record<string, unknown>;
type Windows = Record<string, WindowParams>;

export type WindowManagerContextValue = {
    isOpenWindow: (key: string) => boolean;
    getWindowParams: (key: string) => WindowParams;
    openWindow: (key: string, params?: WindowParams) => void;
    closeWindow: (key: string) => void;
};

const formatKey = (key: string) => String(key).toLocaleLowerCase();

const WindowContext = createCtx<WindowManagerContextValue>();

export const useWindowManager = WindowContext.useContext;

export const WindowManagerProvider = (props: WindowManagerProviderProps) => {
    const { children } = props;

    const [windows, setWindows] = useState<Windows>({});

    const handleOpen = useCallback((key: string, params?: WindowParams): void => {
        setWindows((prevState) => {
            if (key) {
                const formatedKey = formatKey(key);

                return { ...prevState, [formatedKey]: { ...params } };
            }

            return prevState;
        });
    }, []);

    const handleClose = useCallback((key: string): void => {
        setWindows((prevState) => {
            const newState = { ...prevState };
            const formatedKey = formatKey(key);

            delete newState[formatedKey];

            return newState;
        });
    }, []);

    const handleIsOpen = useCallback(
        (key: string): boolean => {
            const formatedKey = formatKey(key);

            return !!windows[formatedKey];
        },
        [windows]
    );

    const handleGetParams = useCallback(
        (key: string): WindowParams => {
            const formatedKey = formatKey(key);

            return windows[formatedKey] || {};
        },
        [windows]
    );

    const contextValue = useMemo<WindowManagerContextValue>(
        () => ({
            isOpenWindow: handleIsOpen,
            getWindowParams: handleGetParams,
            openWindow: handleOpen,
            closeWindow: handleClose
        }),
        [handleClose, handleIsOpen, handleOpen, handleGetParams]
    );

    return <WindowContext.Provider value={contextValue}>{children}</WindowContext.Provider>;
};
