import React from 'react';
import PropTypes from 'prop-types';

import { ExpandedPanel, ExpandedPanelHeader, ExpandedPanelBody } from '@ui/ExpandedPanel';
import CatalogFiltersPriceForm from './CatalogFiltersPriceForm';

const CatalogFiltersPrice = (props) => {
    return (
        <ExpandedPanel className="catalog-page-filters-panel">
            <ExpandedPanelHeader title="Price" className="catalog-page-filters-panel__header" />
            <ExpandedPanelBody className="catalog-page-filters-panel__body">
                <CatalogFiltersPriceForm />
            </ExpandedPanelBody>
        </ExpandedPanel>
    );
};

CatalogFiltersPrice.propTypes = {};

export default CatalogFiltersPrice;
