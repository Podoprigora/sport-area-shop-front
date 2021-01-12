import React, { memo } from 'react';
import PropTypes from 'prop-types';

import FolderIcon from '@ui/svg-icons/feather/FolderIcon';
import { useMobileCategoryMenu } from './MobileCategoryMenuContext';

const MobileCategoryMenuGroup = (props) => {
    const { path = [] } = props;

    const { data = [], onGroupClick = () => {} } = useMobileCategoryMenu() || {};

    if (path.length === 0) {
        return null;
    }

    return (
        <div
            role="presentation"
            className="mobile-category-menu__group"
            onClick={onGroupClick}
            onTouchEnd={onGroupClick}
        >
            <div className="mobile-category-menu__group-image">
                <FolderIcon className="mobile-category-menu__group-icon" />
            </div>
            <div className="mobile-category-menu__group-content">
                {path.map((id) => {
                    const existItem = data.find((item) => item.id === id);

                    if (!existItem) {
                        return null;
                    }

                    return (
                        <div key={id} className="mobile-category-menu__group-title">
                            {existItem.title}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

MobileCategoryMenuGroup.propTypes = {
    path: PropTypes.arrayOf(PropTypes.number)
};

export default memo(MobileCategoryMenuGroup);
