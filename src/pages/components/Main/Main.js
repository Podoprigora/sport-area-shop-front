import React from 'react';
import PropTypes from 'prop-types';

const Main = ({ children }) => {
    return (
        <main className="main">
            <div className="container">{children}</div>
        </main>
    );
};

Main.propTypes = {
    children: PropTypes.node
};

export default Main;
