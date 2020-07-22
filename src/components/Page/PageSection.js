import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const PageSection = React.forwardRef(function PageSection(props, ref) {
    const { children, className, paper, ...other } = props;

    return (
        <div
            className={classNames('page__section', className, {
                paper
            })}
            {...other}
            ref={ref}
        >
            {children}
        </div>
    );
});

PageSection.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    paper: PropTypes.bool
};

export default PageSection;
