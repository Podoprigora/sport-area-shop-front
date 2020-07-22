import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const PageAside = React.forwardRef(function PageAside(props, ref) {
    const { children, className, paper = true, ...other } = props;

    return (
        <div
            className={classNames('page__aside', className, {
                'page__aside--paper': paper
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
