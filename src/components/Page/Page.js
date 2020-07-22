import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Page = React.forwardRef(function Page(props, ref) {
    const { children, className, paper, ...other } = props;

    return (
        <div
            className={classNames('page', className, {
                paper
            })}
            {...other}
            ref={ref}
        >
            {children}
        </div>
    );
});

Page.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    paper: PropTypes.bool
};

export default Page;
