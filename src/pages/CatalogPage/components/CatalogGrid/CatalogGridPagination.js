import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';

import { Pagination } from '@ui/Pagination';

const defaultSelected = [1];

const CatalogGridPagination = (props) => {
    const { count, selected = defaultSelected, onChange } = props;

    const handleChange = useCallback(
        (ev, page) => {
            if (onChange) {
                onChange(ev, page);
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
