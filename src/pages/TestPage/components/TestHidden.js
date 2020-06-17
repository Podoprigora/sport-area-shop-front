import React from 'react';
import useMediaQuery from '@ui/hooks/useMediaQuery';
import Hidden from '@ui/Hidden';
import Button from '@ui/Button';

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
