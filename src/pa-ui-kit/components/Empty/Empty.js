import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import InboxIcon from '@ui/svg-icons/feather/InboxIcon';

const Empty = (props) => {
    const { children, className, icon: iconProp } = props;

    const iconComponent = React.cloneElement(iconProp || <InboxIcon />, {
        className: 'empty__icon'
    });

    return (
        <div className={classNames('empty', className)}>
            {iconComponent}
            <span className="empty__text">{children}</span>
        </div>
    );
};

Empty.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    icon: PropTypes.node
};

export default Empty;
