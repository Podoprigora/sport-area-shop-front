import React from 'react';

import Input, { InputIconButton } from '@components/Input';
import SearchIcon from '@svg-icons/feather/SearchIcon';
import SelectInput from '@components/SelectInput';
import ClearCloseIcon from '@svg-icons/material/ClearCloseIcon';
import { ListItem, ListItemText, ListItemIcon, ListSubheader } from '@components/List';
import ShoppingBasketIcon from '@svg-icons/material/ShoppingBasketIcon';
import { MenuItem } from '@components/Menu';
import Divider from '@components/Divider';

const TestSelect = () => {
    return (
        <div>
            <div className="u-flex u-flex-align-items-flex-start u-margin-b-6">
                <SelectInput
                    className="u-margin-r-8"
                    placeholder="Select Item"
                    resetButton
                    autoFocus
                >
                    <ListItem button value="">
                        <ListItemText>
                            <em>None</em>
                        </ListItemText>
                    </ListItem>
                    <MenuItem value="1">Item 1</MenuItem>
                    <MenuItem value="2">Item 2</MenuItem>
                    <ListSubheader>Test</ListSubheader>
                    <MenuItem value="3">Item 3</MenuItem>
                    <MenuItem value="4">Item 4</MenuItem>
                    <MenuItem value="5">Item 5</MenuItem>
                    <MenuItem value="6">Item 6</MenuItem>
                    <MenuItem value="7">Item 7</MenuItem>
                    <Divider />
                    <ListItem button value="8">
                        <ListItemText>Item 8</ListItemText>
                    </ListItem>
                </SelectInput>
                <Input
                    placeholder="Enter text"
                    appendAdornment={(inputProps) => <SearchIcon size="medium" />}
                />
            </div>
            <div className="u-margin-b-6">
                <Input
                    placeholder="Enter text"
                    appendAdornment={(inputProps) => (
                        <>
                            <ClearCloseIcon size="medium" />
                        </>
                    )}
                />
            </div>
            <div>
                <Input />
            </div>
        </div>
    );
};

export default TestSelect;
