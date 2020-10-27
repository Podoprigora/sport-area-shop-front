import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import Panel, { PanelHeader, PanelBody } from '@ui/Panel';
import FileTextIcon from '@svg-icons/feather/FileTextIcon';

import { useProductPageState } from '@pages/ProductPage/context';
import ProductFeatureList from './ProductFeatureList';

const ProductFeatures = (props) => {
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
