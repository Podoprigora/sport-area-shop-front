import React, { useCallback } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Button } from '../components/Button';
import { FlexRow } from '../components/FlexRow';
import { FlexCol } from '../components/FlexCol';
import { AlertActions, AlertTitle } from '../components/Alert';
import { NotificationProvider, useNotification } from '../components/Notification';
import {
    NotificationItem,
    NotificationItemProps
} from '../components/Notification/NotificationItem';

export default {
    title: 'PA-UI-KIT/Notification',
    component: NotificationProvider,
    subcomponents: { NotificationItem }
} as Meta;

export const Default: Story<NotificationItemProps> = () => {
    const { showAlert, hideAlert } = useNotification();

    const handleSuccessButtonClick = useCallback(() => {
        showAlert({
            type: 'success',
            autoClose: true,
            position: 'top-right',
            message: 'Operation was completed successfully.'
        });
    }, [showAlert]);

    const handleCustomWarningButtonClick = useCallback(() => {
        showAlert({
            type: 'warning',
            frame: true,
            position: 'bottom-right',
            autoClose: true,
            iconProps: { size: 'xlarge' },
            render: (renderProps) => {
                return (
                    <>
                        <AlertTitle size={3}>Warning</AlertTitle>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit error nihil
                        aliquid corporis dolorum porro quibusdam incidunt ipsa repellat ipsum
                        molestias sapiente fugit nesciunt molestiae, ipsam nam quae officiis
                        repellendus.
                        <AlertActions>
                            <Button transparent onClick={() => hideAlert(renderProps.id)}>
                                Learn More
                            </Button>
                        </AlertActions>
                    </>
                );
            }
        });
    }, [showAlert, hideAlert]);

    return (
        <FlexRow spacing={2}>
            <FlexCol xs="auto">
                <Button centered onClick={handleSuccessButtonClick}>
                    Show success
                </Button>
            </FlexCol>
            <FlexCol xs="auto">
                <Button onClick={handleCustomWarningButtonClick}>Show custom warning</Button>
            </FlexCol>
        </FlexRow>
    );
};
Default.decorators = [
    (WrappedStory) => {
        return (
            <NotificationProvider position="top-right">
                <WrappedStory />
            </NotificationProvider>
        );
    }
];
