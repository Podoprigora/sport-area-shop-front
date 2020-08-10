import React from 'react';
import PropTypes from 'prop-types';
import Pagination from '@ui/Pagination';

const CatalogGridPagination = (props) => {
    return <Pagination className="catalog-grid__pagination" count={10} />;
};

CatalogGridPagination.propTypes = {};

export default CatalogGridPagination;
