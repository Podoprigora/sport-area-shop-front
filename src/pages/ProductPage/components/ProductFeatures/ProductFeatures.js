import React from 'react';
import PropTypes from 'prop-types';

import Panel from '@ui/Panel';
import PanelHeader from '@ui/Panel/PanelHeader';
import PanelBody from '@ui/Panel/PanelBody';
import FileTextIcon from '@svg-icons/feather/FileTextIcon';

import ProductFeatureList from './ProductFeatureList';

const features = {
    items: [
        'Regular fit',
        'Large hood, Double-layer hood, Drawstring hood',
        'High collar',
        'Asymmetric zip, Zip with a logo zipper pull',
        'Side pockets',
        'Ribbed sleeve cuffs',
        'Ribbed waistband',
        'Mottled look',
        'Logo emblem, Logo patch',
        'Sweat material, Warming material'
    ],
    material: 'Fabric: 65% Cotton, 35% Polyester',
    modelSize: 'Size: S, Breast x waist x hips: 82 x 60 x 88 cm, Height: 172 cm',
    manufacturerColor: 'grey melange',
    washingInstructions: 'Machine washable at 30°C, Do not tumble dry, Iron at a low temperature',
    'containsNon-textilePartsOfAnimalOrigin': 'No'
};

const ProductFeatures = (props) => {
    return (
        <Panel>
            <PanelHeader title="Features" icon={FileTextIcon} />
            <PanelBody className="product-features paper paper--outlined">
                <ProductFeatureList features={features} />
            </PanelBody>
        </Panel>
    );
};

ProductFeatures.propTypes = {};

export default ProductFeatures;
