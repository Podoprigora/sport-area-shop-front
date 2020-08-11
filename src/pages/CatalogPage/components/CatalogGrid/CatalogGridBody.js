import React, { memo } from 'react';
import PropTypes from 'prop-types';

import CatalogGridItemsSkeleton from '@components/Skeletons/CatalogGridItemsSkeleton';

import data from '@remote/json/products.json';
import CatalogGridItem from './CatalogGridItem';

const CatalogGridBody = (props) => {
    const { loading = false } = props;

    let items = data.slice(0, 8).map((item) => {
        const { id } = item;
        // const randomId = Math.round(Math.random() * 10000000000);

        return <CatalogGridItem key={id} {...item} />;
    });

    if (loading) {
        items = <CatalogGridItemsSkeleton />;
    }

    return <div className="catalog-grid__body">{items}</div>;
};

CatalogGridBody.propTypes = {
    loading: PropTypes.bool
};

export default memo(CatalogGridBody);
