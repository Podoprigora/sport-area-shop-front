import React, { useCallback, useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Tooltip, TooltipProps } from '../components/Tooltip';
import { IconButton } from '../components/IconButton';
import { ThumbUpIcon } from '../components/svg-icons/material';

export default {
    title: 'PA-UI-KIT/Tooltip',
    component: Tooltip
} as Meta;

export const Default: Story<TooltipProps> = (args) => {
    const [liked, setLiked] = useState(false);

    const handleButtonClick = useCallback(() => {
        setLiked((prevState) => !prevState);
    }, []);

    const tooltipTitle = liked ? 'Unlike' : 'Like';

    return (
        <>
            <Tooltip title={tooltipTitle} {...args}>
                <IconButton primary={liked} onClick={handleButtonClick}>
                    <ThumbUpIcon />
                </IconButton>
            </Tooltip>
        </>
    );
};
Default.args = { placement: 'bottom' } as TooltipProps;
