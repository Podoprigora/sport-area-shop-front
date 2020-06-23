import React, { useCallback, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Input, { InputIconButton } from '@ui/Input';
import SearchIcon from '@svg-icons/feather/SearchIcon';
import SelectInput from '@ui/SelectInput';
import ClearCloseIcon from '@svg-icons/material/ClearCloseIcon';
import { ListItem, ListItemText, ListItemIcon, ListSubheader } from '@ui/List';
import ShoppingBasketIcon from '@svg-icons/material/ShoppingBasketIcon';
import { MenuItem } from '@ui/Menu';
import Divider from '@ui/Divider';
import Form from '@ui/FormikForm/Form';
import SelectField from '@ui/FormikForm/SelectField';
import InputField from '@ui/FormikForm/InputField';
import useEventCallback from '@ui/hooks/useEventCallback';
import Button from '@ui/Button';

const initialValues = {
    selectItem: '',
    text: ''
};

const validationShema = Yup.object({
    selectItem: Yup.string().required('Required'),
    text: Yup.string().required('Required')
});

const TestSelect = () => {
    return (
        <Formik initialValues={initialValues} validationSchema={validationShema}>
            <Form>
                <div>
                    {/* <div className="u-flex u-flex-align-items-flex-start">
                        <SelectField
                            name="selectItem"
                            className="u-margin-r-8"
                            style={{ flex: '1' }}
                            inputProps={{ fullWidth: true }}
                            // placeholder="Select Item"
                            fullWidth
                            resetButton
                            // autoFocus
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
                        </SelectField>
                        <InputField
                            name="text"
                            placeholder="Enter text"
                            appendAdornment={(inputProps) => <SearchIcon size="medium" />}
                        />
                    </div> */}
                    <div>
                        <SelectField
                            name="selectItem"
                            className="u-margin-r-8"
                            placeholder="Select Item"
                            resetButton
                            // autoFocus
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
                                <ListItemText flex>Item 8</ListItemText>
                                <ListItemText>8</ListItemText>
                            </ListItem>
                        </SelectField>
                    </div>
                    <div className="u-margin-b-6">
                        <SelectInput
                            className="u-margin-r-8"
                            placeholder="Select Item"
                            resetButton
                            // autoFocus
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
                    </div>
                    <div className="u-margin-b-6">
                        <InputField
                            name="text"
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
            </Form>
        </Formik>
    );
};

export default TestSelect;
