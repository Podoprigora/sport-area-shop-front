import React from 'react';
import PropTypes from 'prop-types';

import List, { ListItem, ListItemIcon, ListItemText } from '@ui/List';
import Divider from '@ui/Divider';
import NavigateNextChevronRightIcon from '@svg-icons/material/NavigateNextChevronRightIcon';

function formatFeatureItemTitleByKey(key = '') {
    let result = String(key).replace(/[A-W]/g, (match) => {
        return ` ${match.toLowerCase()}`;
    });

    result = result.replace(/^[a-z]/, (match) => {
        return match.toUpperCase();
    });

    return result;
}

function formatFeatureItem(text) {
    if (text && typeof text === 'string') {
        const __html = text.replace(
            /([A-Z][a-z0-9-_\s]+:)/g,
            `<span class="u-text-strong">$1</span>`
        );
        return <span dangerouslySetInnerHTML={{ __html }} />;
    }

    return null;
}

const ProductFeatureList = (props) => {
    const { features } = props;
    const featureKeys = Object.keys(features);

    if (featureKeys.length === 0) {
        return null;
    }

    const featureItems = featureKeys.map((key, fIndex) => {
        const feature = features[key];
        const dividerElemement = fIndex > 0 && fIndex < featureKeys.length && <Divider />;

        if (Array.isArray(feature)) {
            return (
                <React.Fragment key={fIndex}>
                    {dividerElemement}
                    {feature.map((item, index) => {
                        return (
                            <ListItem
                                key={`${fIndex}-${index}`}
                                className="product-features__item product-features__item--condensed"
                            >
                                <ListItemIcon>
                                    <NavigateNextChevronRightIcon size="medium" />
                                </ListItemIcon>
                                <ListItemText>{formatFeatureItem(item)}</ListItemText>
                            </ListItem>
                        );
                    })}
                </React.Fragment>
            );
        }

        return (
            <React.Fragment key={fIndex}>
                {dividerElemement}
                <ListItem className="product-features__item">
                    <ListItemText className="product-features__item-title">
                        {formatFeatureItemTitleByKey(key)}
                    </ListItemText>
                    <ListItemText flex>{formatFeatureItem(feature)}</ListItemText>
                </ListItem>
            </React.Fragment>
        );
    });

    return <List>{featureItems}</List>;
};

ProductFeatureList.propTypes = {
    features: PropTypes.object
};

export default ProductFeatureList;
