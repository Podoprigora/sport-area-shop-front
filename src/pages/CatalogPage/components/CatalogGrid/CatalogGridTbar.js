import React from 'react';
import PropTypes from 'prop-types';

import Hidden from '@ui/Hidden';
import Button from '@ui/Button';
import FilterIcon from '@svg-icons/feather/FilterIcon';
import CatalogGridSortBySelect from './CatalogGridSortBySelect';

const CatalogGridTbar = (props) => {
    return (
        <div className="catalog-grid__tbar">
            <Hidden lgUp>
                <Button primary centered plain icon={FilterIcon}>
                    Filters
                </Button>
            </Hidden>
            <CatalogGridSortBySelect />
        </div>
    );
};

CatalogGridTbar.propTypes = {};

export default CatalogGridTbar;
