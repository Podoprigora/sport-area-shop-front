import React, { useEffect, useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import Heading from '@ui/Heading';
import { ExpandedPanel, ExpandedPanelHeader, ExpandedPanelBody } from '@ui/ExpandedPanel';

import CatalogFiltersBrands from './CatalogFiltersBrands';

const CatalogFilters = (props) => {
    return (
        <div className="catalog-page__filters">
            <CatalogFiltersBrands />
            <ExpandedPanel defaultExpanded={false} className="catalog-page-filters-panel">
                <ExpandedPanelHeader>
                    <Heading
                        gutterBottom={false}
                        size={6}
                        upperCase
                        className="catalog-page-filters-panel__title"
                    >
                        Sizes
                    </Heading>
                </ExpandedPanelHeader>
                <ExpandedPanelBody>
                    <div className="catalog-page-filters-panel__body">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia quasi nisi
                        reprehenderit laborum necessitatibus saepe atque blanditiis commodi quaerat
                        magnam! Tenetur explicabo hic alias dolore, eius sequi at perspiciatis
                        dignissimos?
                    </div>
                </ExpandedPanelBody>
            </ExpandedPanel>
            <ExpandedPanel defaultExpanded={false} className="catalog-page-filters-panel">
                <ExpandedPanelHeader>
                    <Heading
                        gutterBottom={false}
                        size={6}
                        upperCase
                        className="catalog-page-filters-panel__title"
                    >
                        Colors
                    </Heading>
                </ExpandedPanelHeader>
                <ExpandedPanelBody>
                    <div className="catalog-page-filters-panel__body">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia quasi nisi
                        reprehenderit laborum necessitatibus saepe atque blanditiis commodi quaerat
                        magnam! Tenetur explicabo hic alias dolore, eius sequi at perspiciatis
                        dignissimos?
                    </div>
                </ExpandedPanelBody>
            </ExpandedPanel>
            <ExpandedPanel defaultExpanded={false} className="catalog-page-filters-panel">
                <ExpandedPanelHeader>
                    <Heading
                        gutterBottom={false}
                        size={6}
                        upperCase
                        className="catalog-page-filters-panel__title"
                    >
                        Price
                    </Heading>
                </ExpandedPanelHeader>
                <ExpandedPanelBody>
                    <div className="catalog-page-filters-panel__body">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia quasi nisi
                        reprehenderit laborum necessitatibus saepe atque blanditiis commodi quaerat
                        magnam! Tenetur explicabo hic alias dolore, eius sequi at perspiciatis
                        dignissimos?
                    </div>
                </ExpandedPanelBody>
            </ExpandedPanel>
        </div>
    );
};

CatalogFilters.propTypes = {
    style: PropTypes.object
};

export default CatalogFilters;
