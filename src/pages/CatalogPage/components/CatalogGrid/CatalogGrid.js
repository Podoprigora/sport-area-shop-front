import React from 'react';
import PropTypes from 'prop-types';

import data from '@remote/json/products.json';
import CatalogGridItem from './CatalogGridItem';

console.log(data);

const CatalogGrid = (props) => {
    return (
        <div className="catalog-grid">
            <div className="catalog-grid__tbar">Tbar</div>
            <div className="catalog-grid__body">
                {data.map((item) => {
                    const { id } = item;

                    return <CatalogGridItem key={id} {...item} />;
                })}
            </div>
        </div>
    );
};

CatalogGrid.propTypes = {};

export default CatalogGrid;
