import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useListItem } from './ListItemContext';

const ListItemAction = React.forwardRef(function ListItemAction(props, ref) {
    const { children, className, ...other } = props;
    const listItem = useListItem();

    let childElement = children;

    if (listItem) {
        childElement = React.cloneElement(children, {
            disabled: listItem.disabled
        });
    }

    return (
        <div className={classNames('list__action', className)} ref={ref} {...other}>
            {childElement}
        </div>
    );
});

ListItemAction.propTypes = {
    children: PropTypes.element,
    className: PropTypes.string
};

export default ListItemAction;
