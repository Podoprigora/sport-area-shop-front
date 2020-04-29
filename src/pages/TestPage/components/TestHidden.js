import React from 'react';
import useMediaQuery from '@components/hooks/useMediaQuery';
import Hidden from '@components/Hidden';
import Button from '@components/Button';

const TestHidden = () => {
    return (
        <Hidden mdUp smDown component={null}>
            <Button primary centered>
                Save
            </Button>
        </Hidden>
    );
};

export default TestHidden;
