import React from 'react';
import SearchInput from '@components/SearchInput';
import { ListItem, ListItemIcon, ListItemText } from '@components/List';
import SearchIcon from '@svg-icons/feather/SearchIcon';

const TestSearchInput = () => {
    return (
        <div style={{ width: '40rem', margin: '0 auto' }}>
            <SearchInput placeholder="What are you looking for?" fullWidth>
                <ListItem button>
                    <ListItemIcon>
                        <SearchIcon size="medium" />
                    </ListItemIcon>
                    <ListItemText>Jeans</ListItemText>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <SearchIcon size="medium" />
                    </ListItemIcon>
                    <ListItemText>Shirt</ListItemText>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <SearchIcon size="medium" />
                    </ListItemIcon>
                    <ListItemText>Boots</ListItemText>
                </ListItem>
            </SearchInput>
        </div>
    );
};

export default TestSearchInput;
