import React from 'react';
import PropTypes from 'prop-types';
import Input from '@components/Input';
import SearchIcon from '@svg-icons/feather/SearchIcon';

const HeaderSearchField = (props) => {
    return (
        <div className="header__search-field">
            <Input type="text" placeholder="What are you looking for?" fullWidth />
            <SearchIcon size="medium" className="header__search-icon" />
        </div>
    );
};

HeaderSearchField.propTypes = {};

export default HeaderSearchField;
