import React from 'react';
import List, { ListItem } from '@components/List';
import ShoppingBasketIcon from '@svg-icons/material/ShoppingBasketIcon';
import FavoriteOutlineIcon from '@svg-icons/material/FavoriteOutlineIcon';
import Checkbox from '@components/Checkbox';
import MenuDivider from '@components/Divider';
import Button from '@components/Button';
import ShoppingCartIcon from '@svg-icons/feather/ShoppingCartIcon';
import IconButton from '@components/IconButton';

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
                        <div className="list__icon">
                            <ShoppingBasketIcon />
                        </div>
                        <div className="list__text list__text--truncate list__text--flex">
                            Lorem ipsum dolor sit, amet consectetur
                        </div>
                        <div className="list__icon">
                            <IconButton>
                                <FavoriteOutlineIcon />
                            </IconButton>
                        </div>
                        <div className="list__icon">
                            <IconButton>
                                <FavoriteOutlineIcon />
                            </IconButton>
                        </div>
                    </ListItem>
                    <MenuDivider />
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
                    <MenuDivider />
                    <ListItem>
                        <div className="list__icon">
                            <Checkbox />
                        </div>
                        <div className="list__text list__text--flex">
                            <strong>Lorem ipsum dolor sit, amet consectetur</strong>
                            <br />
                            <small>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et
                                molestias ab esse labore quo exercitationem accusamus dolorem vitae
                                illum, impedit, sequi soluta inventore quis dolores accusantium.
                                Fugiat illo neque omnis.
                            </small>
                        </div>
                        <div className="list__text">10</div>
                    </ListItem>
                    <MenuDivider />
                    <ListItem>
                        <div className="list__text list__text--flex">
                            Lorem ipsum dolor sit, amet consectetur
                        </div>
                        <div className="list__icon">
                            <Checkbox />
                        </div>
                    </ListItem>
                    <ListItem>
                        <div className="list__text list__text--flex">
                            Lorem ipsum dolor sit, amet consectetur
                        </div>
                        <div className="list__icon">
                            <Checkbox />
                        </div>
                    </ListItem>
                    <MenuDivider />
                    <ListItem>
                        <div className="list__text list__text--flex">
                            Lorem ipsum dolor sit, amet consectetur
                        </div>
                        <div className="list__icon">
                            <Button primary icon={ShoppingCartIcon}>
                                Add to Cart
                            </Button>
                        </div>
                    </ListItem>
                </List>
            </div>
        </>
    );
};

export default TestList;
