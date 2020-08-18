import React from 'react';
import PropTypes from 'prop-types';

import { ExpandedPanel, ExpandedPanelHeader, ExpandedPanelBody } from '@ui/ExpandedPanel';
import CatalogFiltersBrandsList from './CatalogFiltersBrandsList';

const CatalogFiltersBrands = (props) => {
    return (
        <ExpandedPanel defaultExpanded className="catalog-page-filters-panel">
            <ExpandedPanelHeader title="Brands" className="catalog-page-filters-panel__header" />
            <ExpandedPanelBody className="catalog-page-filters-panel__body">
                <CatalogFiltersBrandsList />
            </ExpandedPanelBody>
        </ExpandedPanel>
    );
};

CatalogFiltersBrands.propTypes = {};

export default CatalogFiltersBrands;
