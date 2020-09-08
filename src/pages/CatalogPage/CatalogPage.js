import React from 'react';

import { CatalogPageProvider } from './context';
import CatalogPageLayout from './CatalogPageLayout';
import CatalogPageEffects from './CatalogPageEffects';

const CatalogPage = (props) => {
    return (
        <CatalogPageProvider>
            <CatalogPageEffects>
                <CatalogPageLayout />
            </CatalogPageEffects>
        </CatalogPageProvider>
    );
};

export default CatalogPage;
