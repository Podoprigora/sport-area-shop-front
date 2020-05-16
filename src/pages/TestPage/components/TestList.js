import React from 'react';
import List, { ListItem } from '@components/List';
import ShoppingBasketIcon from '@svg-icons/material/ShoppingBasketIcon';
import FavoriteOutlineIcon from '@svg-icons/material/FavoriteOutlineIcon';
import Checkbox from '@components/Checkbox';

const TestList = () => {
    return (
        <div style={{ background: '#fff', maxWidth: '40rem', width: '100%' }}>
            <List>
                <ListItem>
                    <div className="list__icon">
                        <ShoppingBasketIcon />
                    </div>
                    <div className="list__text list__text--flex">
                        Lorem ipsum dolor sit, amet consectetur
                    </div>
                    <div className="list__icon-btn" role="button" tabIndex="-1">
                        <FavoriteOutlineIcon />
                    </div>
                </ListItem>
                <ListItem>
                    <div className="list__icon">
                        <Checkbox />
                    </div>
                    <div className="list__text list__text--flex">
                        Lorem ipsum dolor sit, amet consectetur
                    </div>
                    <div className="list__text">10</div>
                </ListItem>
                <ListItem>
                    <div className="list__icon">
                        <Checkbox />
                    </div>
                    <div className="list__text list__text--flex">
                        Lorem ipsum dolor sit, amet consectetur
                    </div>
                    <div className="list__text">10</div>
                </ListItem>
            </List>
        </div>
    );
};

export default TestList;
