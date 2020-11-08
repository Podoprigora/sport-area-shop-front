import React from 'react';
import PropTypes from 'prop-types';

const Main = (props) => {
    const { children, ...other } = props;

    return (
        <main className="main" {...other}>
            <div className="container">{children}</div>
        </main>
    );
};

Main.propTypes = {
    children: PropTypes.node
};

export default Main;
