import React, { useState, useCallback } from 'react';
import List, { ListItem } from '@components/List';
import ShoppingBasketIcon from '@svg-icons/material/ShoppingBasketIcon';
import FavoriteOutlineIcon from '@svg-icons/material/FavoriteOutlineIcon';
import Checkbox from '@components/Checkbox';
import Divider from '@components/Divider';
import Button from '@components/Button';
import ShoppingCartIcon from '@svg-icons/feather/ShoppingCartIcon';
import IconButton from '@components/IconButton';
import CreatemodeEditIcon from '@svg-icons/material/CreatemodeEditIcon';
import ClearCloseIcon from '@svg-icons/material/ClearCloseIcon';
import SearchIcon from '@svg-icons/feather/SearchIcon';
import ListItemIcon from '@components/List/ListItemIcon';
import ListItemAction from '@components/List/ListItemAction';
import ListItemText from '@components/List/ListItemText';
import Input from '@components/Input';

const TestList = () => {
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [checked, setChecked] = useState([]);

    const handleItemClick = useCallback(
        (index) => (ev) => {
            setSelectedIndex(index);
        },
        []
    );

    const handleChecked = useCallback(
        (value) => (ev) => {
            const currentIndex = checked.indexOf(value);
            const newState = [...checked];

            if (currentIndex !== -1) {
                newState.splice(currentIndex, 1);
            } else {
                newState.push(value);
            }

            setChecked(newState);
        },
        [checked]
    );

    const handleDeleteClick = (ev) => {
        console.log(ev);
    };

    const checkedItems = [1, 2, 3, 4];

    return (
        <>
            <div
                style={{
                    background: '#fff',
                    maxWidth: '50rem',
                    width: '100%',
                    marginBottom: '1.6rem'
                }}
            >
                <List>
                    <ListItem button selected={selectedIndex === 0} onClick={handleItemClick(0)}>
                        <ListItemIcon>
                            <SearchIcon size="medium" />
                        </ListItemIcon>
                        <ListItemText truncate flex>
                            Lorem ipsum dolor sit, amet consectetur
                        </ListItemText>
                        <ListItemAction>
                            <IconButton size="small" tabIndex="-1">
                                <ClearCloseIcon />
                            </IconButton>
                        </ListItemAction>
                    </ListItem>
                    <ListItem button selected={selectedIndex === 1} onClick={handleItemClick(1)}>
                        <ListItemIcon>
                            <SearchIcon size="medium" />
                        </ListItemIcon>
                        <ListItemText truncate flex>
                            Lorem ipsum dolor sit, amet consectetur
                        </ListItemText>
                        <ListItemAction>
                            <IconButton size="small" tabIndex="-1">
                                <ClearCloseIcon />
                            </IconButton>
                        </ListItemAction>
                    </ListItem>
                    <ListItem button selected={selectedIndex === 2} onClick={handleItemClick(2)}>
                        <ListItemIcon>
                            <SearchIcon size="medium" />
                        </ListItemIcon>
                        <ListItemText truncate flex>
                            Lorem ipsum dolor sit, amet consectetur
                        </ListItemText>
                        <ListItemAction>
                            <IconButton size="small" tabIndex="-1" onClick={handleDeleteClick}>
                                <ClearCloseIcon />
                            </IconButton>
                        </ListItemAction>
                    </ListItem>
                    <Divider />
                    {checkedItems.map((item) => (
                        <ListItem key={item} button onClick={handleChecked(item)}>
                            <ListItemAction>
                                <Checkbox checked={checked.indexOf(item) !== -1} tabIndex="-1" />
                            </ListItemAction>
                            <ListItemText flex>
                                Lorem ipsum dolor sit, amet consectetur
                            </ListItemText>
                            <ListItemText>(34)</ListItemText>
                        </ListItem>
                    ))}
                </List>
            </div>
        </>
    );
};

export default TestList;
