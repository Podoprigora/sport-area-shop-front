import React, { useMemo } from 'react';

import { Panel, PanelHeader, PanelBody } from '@ui/Panel';
import { FileTextIcon } from '@ui/svg-icons/feather';

import { useProductPageState } from '@pages/ProductPage/context';
import ProductFeatureList from './ProductFeatureList';

const ProductFeatures = () => {
    const { features } = useProductPageState();

    return useMemo(() => {
        return (
            <Panel>
                <PanelHeader title="Features" icon={FileTextIcon} />
                <PanelBody className="product-features paper paper--outlined">
                    <ProductFeatureList features={features} />
                </PanelBody>
            </Panel>
        );
    }, [features]);
};

export default ProductFeatures;
