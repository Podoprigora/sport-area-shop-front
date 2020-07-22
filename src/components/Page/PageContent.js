import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const PageContent = React.forwardRef(function PageContent(props, ref) {
    const { children, className, paper, ...other } = props;

    return (
        <div
            className={classNames('page__content', className, {
                paper
            })}
            {...other}
            ref={ref}
        >
            {children}
        </div>
    );
});

PageContent.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    paper: PropTypes.bool
};

export default PageContent;
