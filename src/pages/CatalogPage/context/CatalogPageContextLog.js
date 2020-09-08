import { useCatalogPageState } from './CatalogPageContext';
import { useCatalogPageSelectors } from './catalogPageSelectors';

export function CatalogPageContextLog() {
    const state = useCatalogPageState();
    const selectors = useCatalogPageSelectors(state);

    if (process.env.NODE_ENV === 'development') {
        console.groupCollapsed('CatalogPageContext');
        console.log({ state });
        console.log({ selectors });
        console.groupEnd();
    }

    return null;
}
