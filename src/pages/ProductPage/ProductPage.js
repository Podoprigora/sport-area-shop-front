import React from 'react';

import ProductPageProvider from './context';
import ProductPageEffects from './ProductPageEffects';

import ProductPageView from './ProductPageView';

const ProductPage = () => {
    return (
        <ProductPageProvider>
            <ProductPageEffects>
                <ProductPageView />
            </ProductPageEffects>
        </ProductPageProvider>
    );
};

export default ProductPage;
