import React, { useRef, useEffect, useCallback } from 'react';

import FieldControl from '@components/FieldControl';
import Input, { InputIconButton } from '@components/Input';
import Form from '@components/FormikForm/Form';
import InputField from '@components/FormikForm/InputField';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FlexRow from '@components/FlexRow';
import FlexCol from '@components/FlexCol';
import LoginIcon from '@svg-icons/feather/LoginIcon';
import UserIcon from '@svg-icons/feather/UserIcon';
import SearchIcon from '@svg-icons/feather/SearchIcon';
import IconButton from '@components/IconButton';
import ClearCloseIcon from '@svg-icons/material/ClearCloseIcon';
import PlusIcon from '@svg-icons/feather/PlusIcon';
import FavoriteOutlineIcon from '@svg-icons/material/FavoriteOutlineIcon';
import TagIcon from '@svg-icons/feather/TagIcon';
import CreatemodeEditIcon from '@svg-icons/material/CreatemodeEditIcon';

const validationShema = Yup.object({
    name: Yup.string().required('Required'),
    lastName: Yup.string().required('Required')
});

const TestFieldControl = () => {
    const fieldControlRef = useRef(null);
    const inputRef = useRef(null);
    const formikPropsRef = useRef(null);

    useEffect(() => {
        // console.log(formikPropsRef);
        // console.log(fieldControlRef.current);
        // console.log(inputRef.current);
        // if (inputRef.current) {
        //     inputRef.current.focus();
        // }
    }, []);

    const setFormikProps = (props) => {
        formikPropsRef.current = props;
    };

    const getFormikProps = () => {
        return formikPropsRef.current;
    };

    const handleInputChange = useCallback((ev) => {
        // console.log(ev.target.value);
        console.log(ev);
    }, []);

    const handleInputFocus = useCallback((ev) => {
        // console.log(ev);
    }, []);

    const handleInputBtnClick = useCallback((ev) => {
        // console.log(ev.target);
        getFormikProps().setFieldValue('lastName', '');
    }, []);

    const handleInputClick = useCallback((ev) => {
        console.log('input click');
    }, []);

    return (
        <>
            <Input
                name="number"
                inputProps={{ style: { width: 50 } }}
                prependAdornment={() => {
                    return (
                        <InputIconButton>
                            <PlusIcon />
                        </InputIconButton>
                    );
                }}
                appendAdornment={() => {
                    return (
                        <InputIconButton>
                            <PlusIcon />
                        </InputIconButton>
                    );
                }}
            />
            <br />
            <br />
            <Formik
                initialValues={{ name: 'Alexandr', lastName: '' }}
                validationSchema={validationShema}
            >
                {(formikProps) => {
                    setFormikProps(formikProps);

                    return (
                        <Form>
                            <FlexRow>
                                <FlexCol md>
                                    <InputField
                                        label="First Name"
                                        helperText="Enter your name"
                                        placeholder="Enter name"
                                        // autoFocus
                                        fullWidth
                                        // value=""
                                        name="name"
                                        // labelAlign="top"
                                        // labelTextAlign="left"
                                        // labelWidth={120}
                                        required
                                        // disabled
                                        ref={fieldControlRef}
                                        inputRef={inputRef}
                                        // saveItem={() => {
                                        //     console.log('!!!');
                                        // }}
                                        // onChange={handleInputChange}
                                        // onFocus={handleInputFocus}
                                    />
                                </FlexCol>
                                <FlexCol md>
                                    <InputField
                                        label="Last Name"
                                        // helperText="Enter your name"
                                        placeholder="Enter name"
                                        name="lastName"
                                        // labelAlign="left"
                                        // labelTextAlign="left"
                                        // labelWidth={120}
                                        fullWidth
                                        prependAdornment={(inputProps) => (
                                            <SearchIcon size="medium" />
                                        )}
                                        appendAdornment={(inputProps) => {
                                            const { value } = inputProps;

                                            if (!value) {
                                                return 'Kg';
                                            }
                                            // return <PlusIcon size="medium" />;
                                            return (
                                                <>
                                                    <InputIconButton
                                                        className="input__btn-icon"
                                                        size="small"
                                                        onClick={handleInputBtnClick}
                                                    >
                                                        <ClearCloseIcon />
                                                    </InputIconButton>
                                                    <InputIconButton
                                                        className="input__btn-icon"
                                                        size="small"
                                                        onClick={handleInputBtnClick}
                                                    >
                                                        <ClearCloseIcon />
                                                    </InputIconButton>
                                                </>
                                            );
                                        }}
                                        // onClick={handleInputClick}
                                        // onChange={handleInputChange}
                                        // onFocus={handleInputFocus}
                                    />
                                </FlexCol>
                            </FlexRow>
                            <InputField
                                // type="textarea"
                                // label="Last Name"
                                // helperText="Enter your name"
                                placeholder="Enter name"
                                name="lastName"
                                // labelAlign="left"
                                // labelTextAlign="left"
                                // labelWidth={120}
                                fullWidth
                                // disabled
                                prependAdornment={(inputProps) => <TagIcon size="medium" />}
                                appendAdornment={(inputProps) => {
                                    const { value, disabled } = inputProps;

                                    // if (!value) {
                                    //     return 'Kg';
                                    // }
                                    // return <PlusIcon size="medium" />;
                                    return (
                                        <InputIconButton
                                            className="input__btn-icon"
                                            size="small"
                                            disabled={disabled}
                                            onClick={handleInputBtnClick}
                                        >
                                            <ClearCloseIcon />
                                        </InputIconButton>
                                    );
                                }}
                                // onClick={handleInputClick}
                                // onChange={handleInputChange}
                                // onFocus={handleInputFocus}
                            />
                            <InputField
                                label="Name"
                                helperText="Enter your name"
                                placeholder="Enter name"
                                // autoFocus
                                // fullWidth
                                // value=""
                                name="name"
                                labelAlign="top"
                                labelTextAlign="right"
                                labelWidth="300"
                                required
                                ref={fieldControlRef}
                                inputRef={inputRef}
                                onChange={handleInputChange}
                                onFocus={handleInputFocus}
                            />
                        </Form>
                    );
                }}
            </Formik>
        </>
    );
};

export default TestFieldControl;
