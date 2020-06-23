import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const BP_SIZES = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

const Hidden = ({ children, component: Component = 'div', ...props }) => {
    const classes = [];

    BP_SIZES.forEach((bp) => {
        const bpValUp = props[`${bp}Up`];
        const bpValDown = props[`${bp}Down`];

        if (bpValUp) {
            classes.push(`u-hidden-${bp}-up`);
        }

        if (bpValDown) {
            classes.push(`u-hidden-${bp}-down`);
        }
    });

    if (Component) {
        return <Component className={classes.join(' ')}>{children}</Component>;
    }

    return React.cloneElement(children, {
        className: classNames(children.props.className, ...classes)
    });
};

Hidden.propTypes = {
    children: PropTypes.node.isRequired,
    component: PropTypes.node,

    xsUp: PropTypes.bool,
    smUp: PropTypes.bool,
    mdUp: PropTypes.bool,
    lgUp: PropTypes.bool,
    xlUp: PropTypes.bool,
    xxlUp: PropTypes.bool,

    xsDown: PropTypes.bool,
    smDown: PropTypes.bool,
    mdDown: PropTypes.bool,
    lgDown: PropTypes.bool,
    xlDown: PropTypes.bool,
    xxlDown: PropTypes.bool
};

export default Hidden;
