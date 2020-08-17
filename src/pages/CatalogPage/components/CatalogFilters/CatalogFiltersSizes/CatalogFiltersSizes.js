import React from 'react';
import PropTypes from 'prop-types';

import { ExpandedPanel, ExpandedPanelHeader, ExpandedPanelBody } from '@ui/ExpandedPanel';
import CatalogFiltersSizesList from './CatalogFiltersSizesList';

const CatalogFiltersSizes = (props) => {
    return (
        <ExpandedPanel className="catalog-page-filters-panel">
            <ExpandedPanelHeader title="Sizes" className="catalog-page-filters-panel__header" />
            <ExpandedPanelBody className="catalog-page-filters-panel__body">
                <CatalogFiltersSizesList />
            </ExpandedPanelBody>
        </ExpandedPanel>
    );
};

CatalogFiltersSizes.propTypes = {};

export default CatalogFiltersSizes;
