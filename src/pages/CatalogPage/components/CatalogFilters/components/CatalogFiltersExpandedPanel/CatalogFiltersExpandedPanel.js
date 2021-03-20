import React from 'react';
import PropTypes from 'prop-types';

import { ExpandedPanel, ExpandedPanelHeader, ExpandedPanelBody } from '@ui/ExpandedPanel';
import { Link } from '@ui/Link';
import { useEventCallback } from '@ui/utils';

const CatalogFiltersExpandedPanel = (props) => {
    const { children, title, resetButton, defaultExpanded = true, onResetClick } = props;

    const handleResetClick = useEventCallback((ev) => {
        if (onResetClick) {
            onResetClick(ev);
        }
    });

    return (
        <ExpandedPanel defaultExpanded={defaultExpanded} className="catalog-page-filters-panel">
            <ExpandedPanelHeader title={title} className="catalog-page-filters-panel__header">
                {resetButton && (
                    <Link
                        className="catalog-page-filters-panel__header-reset"
                        onClick={handleResetClick}
                    >
                        Clear
                    </Link>
                )}
            </ExpandedPanelHeader>
            <ExpandedPanelBody className="catalog-page-filters-panel__body">
                {children}
            </ExpandedPanelBody>
        </ExpandedPanel>
    );
};

CatalogFiltersExpandedPanel.propTypes = {
    children: PropTypes.element.isRequired,
    title: PropTypes.string.isRequired,
    resetButton: PropTypes.bool,
    defaultExpanded: PropTypes.bool,
    onResetClick: PropTypes.func
};

export default CatalogFiltersExpandedPanel;
