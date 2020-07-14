import { createContext, useContext } from 'react';

export const ScreeMaskContext = createContext();

export default function useScreenMask() {
    return useContext(ScreeMaskContext);
}
