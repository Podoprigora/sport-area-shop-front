import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import MobileCategoryMenuList from './MobileCategoryMenuList';
import MobileCategoryMenuGroup from './MobileCategoryMenuGroup';

const MobileCategoryMenuCard = (props) => {
    const { path = [], ...other } = props;
    const parentId = path.length > 0 ? path[path.length - 1] : 0;

    return (
        <CSSTransition classNames="mobile-category-menu__card" timeout={500} {...other}>
            <div className="mobile-category-menu__card">
                <MobileCategoryMenuGroup path={path} />
                <MobileCategoryMenuList parentId={parentId} />
            </div>
        </CSSTransition>
    );
};

MobileCategoryMenuCard.propTypes = {
    path: PropTypes.arrayOf(PropTypes.number)
};

export default MobileCategoryMenuCard;
