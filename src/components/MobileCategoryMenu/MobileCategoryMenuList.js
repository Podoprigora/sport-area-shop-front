import React, { memo } from 'react';
import PropTypes from 'prop-types';
import List, { ListItemIcon, ListItemText, ListItem } from '@ui/List';
import ChevronRightIcon from '@ui/svg-icons/feather/ChevronRightIcon';
import { useMobileCategoryMenu } from './MobileCategoryMenuContext';

const MobileCategoryMenuList = (props) => {
    const { parentId = 0 } = props;

    const { data = [], onItemClick = () => {} } = useMobileCategoryMenu() || {};

    const items = data.filter((item) => {
        return !parentId ? !item.parentId : item.parentId === parentId;
    });

    if (items.length === 0) {
        return null;
    }

    return (
        <List className="mobile-category-menu__list">
            {items.map((item) => {
                const { id, title, hasItems } = item;

                return (
                    <ListItem
                        key={id}
                        button
                        className="mobile-category-menu__item"
                        onClick={onItemClick(item)}
                    >
                        <ListItemText flex>{title}</ListItemText>
                        {hasItems && (
                            <ListItemIcon>
                                <ChevronRightIcon size="medium" />
                            </ListItemIcon>
                        )}
                    </ListItem>
                );
            })}
        </List>
    );
};

MobileCategoryMenuList.propTypes = {
    parentId: PropTypes.number,
    data: PropTypes.array
};

export default memo(MobileCategoryMenuList);
