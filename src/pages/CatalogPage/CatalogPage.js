import React from 'react';

import { CatalogPageProvider } from './context';
import CatalogPageView from './CatalogPageView';
import CatalogPageEffects from './CatalogPageEffects';

const CatalogPage = () => {
    return (
        <CatalogPageProvider>
            <CatalogPageEffects>
                <CatalogPageView />
            </CatalogPageEffects>
        </CatalogPageProvider>
    );
};

export default CatalogPage;
