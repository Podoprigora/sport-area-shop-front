import React, { memo } from 'react';
import PropTypes from 'prop-types';
import RotateCwIcon from '@svg-icons/feather/RotateCwIcon';
import Button from '@ui/Button';

const CatalogGridLoadMore = (props) => {
    return (
        <div className="catalog-grid__load-more">
            <Button primary transparent icon={RotateCwIcon} iconSize="xlarge">
                Load more products
            </Button>
        </div>
    );
};

CatalogGridLoadMore.propTypes = {};

export default memo(CatalogGridLoadMore);
