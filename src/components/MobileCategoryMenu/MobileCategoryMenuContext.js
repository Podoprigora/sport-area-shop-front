import { createContext, useContext } from 'react';

const MobileCategoryMenuContext = createContext();

const useMobileCategoryMenu = () => useContext(MobileCategoryMenuContext);

export { MobileCategoryMenuContext, useMobileCategoryMenu };
