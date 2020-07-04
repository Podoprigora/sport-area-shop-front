import React, { memo, useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import categoriesData from '@remote/json/categories.json';
import { CategoriesStateContext, CategoriesActionsContext } from './CategoriesContext';

const CategoriesContextProvider = ({ children }) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setItems(categoriesData);
        }, 200);
    }, []);

    const contextValue = useMemo(() => ({ items }), [items]);
    const contextActions = useMemo(() => ({}), []);

    return (
        <CategoriesStateContext.Provider value={contextValue}>
            <CategoriesActionsContext.Provider value={contextActions}>
                {children}
            </CategoriesActionsContext.Provider>
        </CategoriesStateContext.Provider>
    );
};

CategoriesContextProvider.propTypes = {
    children: PropTypes.node
};

export default memo(CategoriesContextProvider);
