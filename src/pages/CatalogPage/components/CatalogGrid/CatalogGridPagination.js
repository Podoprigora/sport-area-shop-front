import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import Pagination from '@ui/Pagination';

const CatalogGridPagination = (props) => {
    const { count, selected = [1], onChange } = props;

    const handleChange = useCallback(
        (page, ev) => {
            if (onChange) {
                onChange(page, ev);
            }
        },
        [onChange]
    );

    if (!count) {
        return null;
    }

    return (
        <Pagination
            className="catalog-grid__pagination"
            count={count}
            selectedPages={selected}
            siblingCount={2}
            onChange={handleChange}
        />
    );
};

CatalogGridPagination.propTypes = {
    selected: PropTypes.arrayOf(PropTypes.number),
    count: PropTypes.number,
    onChange: PropTypes.func
};

export default memo(CatalogGridPagination);
