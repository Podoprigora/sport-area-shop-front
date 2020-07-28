import React, { memo } from 'react';
import PropTypes from 'prop-types';

import CatalogGridItemsSkeleton from '@components/Skeletons/CatalogGridItemsSkeleton';

import data from '@remote/json/products.json';
import CatalogGridItem from './CatalogGridItem';

const CatalogGrid = (props) => {
    const { loading = false } = props;

    let items = data.map((item) => {
        const { id } = item;
        const randomId = Math.round(Math.random() * 10000000000000);

        return <CatalogGridItem key={randomId} {...item} />;
    });

    if (loading) {
        items = <CatalogGridItemsSkeleton />;
    }

    return (
        <div className="catalog-grid">
            <div className="catalog-grid__tbar">Tbar</div>
            <div className="catalog-grid__body">{items}</div>
        </div>
    );
};

CatalogGrid.propTypes = {
    loading: PropTypes.bool
};

export default memo(CatalogGrid);