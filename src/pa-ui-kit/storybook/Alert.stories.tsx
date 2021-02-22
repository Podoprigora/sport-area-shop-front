import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { ClearCloseIcon } from '../components/svg-icons/material';
import { IconButton } from '../components/IconButton';
import { Alert, AlertProps, AlertTitle, AlertActions } from '../components/Alert';
import { Button } from '../components/Button';

export default {
    title: 'PA-UI-KIT/Alert',
    component: Alert,
    subcomponents: { AlertTitle, AlertActions }
} as Meta;

export const Default: Story<AlertProps> = (args) => {
    return (
        <Alert
            {...args}
            action={
                <IconButton size="medium">
                    <ClearCloseIcon />
                </IconButton>
            }
        >
            <AlertTitle>Alert</AlertTitle>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium quasi quibusdam
            possimus eos eum reiciendis unde veniam, commodi distinctio autem sit nulla quidem ea
            minima non dolorem. Fugit, placeat voluptate.
            <AlertActions>
                <Button transparent>Learn More</Button>
                <Button transparent>Learn More</Button>
            </AlertActions>
        </Alert>
    );
};
Default.args = { type: 'success' } as AlertProps;

export const Inline: Story<AlertProps> = (args) => {
    return (
        <Alert
            {...args}
            action={
                <>
                    <Button transparent centered>
                        Learn More
                    </Button>
                    <IconButton size="medium">
                        <ClearCloseIcon />
                    </IconButton>
                </>
            }
            className="u-margin-t-5"
        >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium quasi quibusdam
            possimus eos eum reiciendis unde veniam,
        </Alert>
    );
};
Inline.args = { type: 'warning', frame: true, iconProps: { size: 'xlarge' } } as AlertProps;
