import React from 'react';
import PropTypes from 'prop-types';

import Panel from '@ui/Panel';
import PanelHeader from '@ui/Panel/PanelHeader';
import PanelBody from '@ui/Panel/PanelBody';
import FileTextIcon from '@svg-icons/feather/FileTextIcon';
import List, { ListItem, ListItemIcon, ListItemText } from '@ui/List';
import Divider from '@ui/Divider';
import NavigateNextChevronRightIcon from '@svg-icons/material/NavigateNextChevronRightIcon';

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
        'Sweat material, Warming material',
        'Washing instructions: Machine washable at 30°C, Do not tumble dry, Iron at a low temperature',
        'Contains non-textile parts of animal origin: No',
        'Manufacturer color: grey melange'
    ],

    material: 'Fabric: 65% Cotton, 35% Polyester',
    modelSize: 'Size: S, Breast x waist x hips: 82 x 60 x 88 cm, Height: 172 cm'
};

const formatFeatureItem = (text) => {
    if (text && typeof text === 'string') {
        const __html = text.replace(
            /([A-Z][a-z0-9-_\s]+:)/g,
            `<span class="u-text-strong">$1</span>`
        );
        return <span dangerouslySetInnerHTML={{ __html }} />;
    }

    return null;
};

const ProductFeatures = (props) => {
    return (
        <Panel>
            <PanelHeader title="Features" icon={FileTextIcon} />
            <PanelBody className="product-features paper paper--outlined">
                <List>
                    {features.items.map((item, index) => {
                        return (
                            <ListItem
                                key={index}
                                className="product-features__item product-features__item--condensed"
                            >
                                <ListItemIcon>
                                    <NavigateNextChevronRightIcon size="medium" />
                                </ListItemIcon>
                                <ListItemText>{formatFeatureItem(item)}</ListItemText>
                            </ListItem>
                        );
                    })}
                    <Divider />
                    <ListItem className="product-features__item">
                        <ListItemText className="product-features__item-title">
                            Material
                        </ListItemText>
                        <ListItemText flex>{formatFeatureItem(features.material)}</ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem className="product-features__item">
                        <ListItemText className="product-features__item-title">
                            Model Size
                        </ListItemText>
                        <ListItemText flex>{formatFeatureItem(features.modelSize)}</ListItemText>
                    </ListItem>
                </List>
            </PanelBody>
        </Panel>
    );
};

ProductFeatures.propTypes = {};

export default ProductFeatures;
