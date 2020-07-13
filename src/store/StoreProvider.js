import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

import configireStore from './configureStore';

const store = configireStore();

const StoreProvider = (props) => {
    const { children } = props;

    return <Provider store={store}>{children}</Provider>;
};

StoreProvider.propTypes = {
    children: PropTypes.node
};

export default StoreProvider;
