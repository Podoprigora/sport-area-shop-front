import { useProductPageState } from './ProductPageContext';
import { useProductPageSelectors } from './productPageSelectors';

export default function ProductPageContextLog() {
    const state = useProductPageState();
    const selectors = useProductPageSelectors(state);

    if (process.env.NODE_ENV === 'development') {
        console.groupCollapsed('ProductPageContext');
        console.log({ state });
        console.log({ selectors });
        console.groupEnd();
    }

    return null;
}
