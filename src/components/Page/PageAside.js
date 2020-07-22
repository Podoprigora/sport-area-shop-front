import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const PageAside = React.forwardRef(function PageAside(props, ref) {
    const { children, className, paper, ...other } = props;

    return (
        <div
            className={classNames('page__aside', className, {
                paper
            })}
            {...other}
            ref={ref}
        >
            {children}
        </div>
    );
});

PageAside.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    paper: PropTypes.bool
};

export default PageAside;
