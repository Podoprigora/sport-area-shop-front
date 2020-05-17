import React from 'react';
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

const TestList = () => {
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
                    <ListItem>
                        <ListItemIcon>
                            <SearchIcon size="medium" />
                        </ListItemIcon>
                        <ListItemText truncate flex>
                            Lorem ipsum dolor sit, amet consectetur
                        </ListItemText>
                        <ListItemAction className="list__action">
                            <IconButton size="small">
                                <ClearCloseIcon />
                            </IconButton>
                        </ListItemAction>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <SearchIcon size="medium" />
                        </ListItemIcon>
                        <ListItemText truncate flex>
                            Lorem ipsum dolor sit, amet consectetur
                        </ListItemText>
                        <ListItemAction className="list__action">
                            <IconButton size="small">
                                <ClearCloseIcon />
                            </IconButton>
                        </ListItemAction>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <SearchIcon size="medium" />
                        </ListItemIcon>
                        <ListItemText truncate flex>
                            Lorem ipsum dolor sit, amet consectetur
                        </ListItemText>
                        <ListItemAction className="list__action">
                            <IconButton size="small">
                                <ClearCloseIcon />
                            </IconButton>
                        </ListItemAction>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemIcon>
                            <Checkbox />
                        </ListItemIcon>
                        <ListItemText flex>Lorem ipsum dolor sit, amet consectetur</ListItemText>
                        <ListItemText>10</ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <Checkbox />
                        </ListItemIcon>
                        <ListItemText flex>Lorem ipsum dolor sit, amet consectetur</ListItemText>
                        <ListItemText>10</ListItemText>
                    </ListItem>
                </List>
            </div>
        </>
    );
};

export default TestList;
