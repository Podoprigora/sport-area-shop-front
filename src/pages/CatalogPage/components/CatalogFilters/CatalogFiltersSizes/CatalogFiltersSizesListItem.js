import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';

import useEventCallback from '@ui/hooks/useEventCallback';
import { CellListItem } from '@ui/CellList';

const CatalogFiltersSizesListItem = (props) => {
    const { id, name, selected, onClick } = props;

    const handleClick = useEventCallback((ev) => {
        if (onClick) {
            onClick({ id, name });
        }
    });

    return (
        <CellListItem selected={selected} onClick={handleClick}>
            {name}
        </CellListItem>
    );
};

CatalogFiltersSizesListItem.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    selected: PropTypes.bool,
    onClick: PropTypes.func
};

export default memo(CatalogFiltersSizesListItem);
