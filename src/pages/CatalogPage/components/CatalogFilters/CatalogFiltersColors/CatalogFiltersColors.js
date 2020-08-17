import React from 'react';
import PropTypes from 'prop-types';

import { ExpandedPanel, ExpandedPanelHeader, ExpandedPanelBody } from '@ui/ExpandedPanel';
import CatalogFiltersColorsList from './CatalogFiltersColorsList';

const CatalogFiltersColors = (props) => {
    return (
        <ExpandedPanel className="catalog-page-filters-panel">
            <ExpandedPanelHeader title="Colors" className="catalog-page-filters-panel__header" />
            <ExpandedPanelBody className="catalog-page-filters-panel__body">
                <CatalogFiltersColorsList />
            </ExpandedPanelBody>
        </ExpandedPanel>
    );
};

CatalogFiltersColors.propTypes = {};

export default CatalogFiltersColors;
