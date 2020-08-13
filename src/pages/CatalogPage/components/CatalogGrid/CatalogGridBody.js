import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import CatalogGridItemsSkeleton from '@components/Skeletons/CatalogGridItemsSkeleton';

import CatalogGridItem from './CatalogGridItem';

const CatalogGridBody = (props) => {
    const { items, loading, itemsPerPage } = props;

    let products = items.map((item) => {
        const { id } = item;

        return <CatalogGridItem key={id} {...item} />;
    });

    if (loading) {
        products = <CatalogGridItemsSkeleton size={itemsPerPage} />;
    }

    return <div className="catalog-grid__body">{products}</div>;
};

CatalogGridBody.propTypes = {
    loading: PropTypes.bool,
    itemsPerPage: PropTypes.number,
    items: PropTypes.array
};

export default memo(CatalogGridBody);
