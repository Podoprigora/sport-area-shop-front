import React, { useEffect, useRef } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { Button, ButtonProps } from '../components/Button';
import { Tooltip } from '../components/Tooltip';
import { CircularProgress } from '../components/CircularProgress';
import { ActionsBar } from '../components/ActionsBar';
import { UserIcon, StarIcon, ShoppingCartIcon } from '../components/svg-icons/feather';

export default {
    component: Button,
    title: 'PA-UI-KIT/Button',
    argTypes: {
        icon: {
            control: {
                type: null
            }
        },
        loadingComponent: {
            control: {
                type: null
            }
        }
    }
} as Meta;

const DefaultTemplate: Story<ButtonProps> = (args) => {
    const ref = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (ref.current) {
            ref.current.focus();
        }
    }, []);

    return <Button type="button" ref={ref} {...args} />;
};

export const Default: Story = DefaultTemplate.bind({});

Default.args = {
    children: 'Button',
    primary: true,
    centered: true,
    icon: <UserIcon />,
    loadingComponent: <CircularProgress />
} as ButtonProps;

export const Examples = () => {
    return (
        <>
            <ActionsBar className="u-margin-b-6">
                <Button primary icon={<CircularProgress />} iconAlign="top" iconSize="small">
                    Save & Close
                </Button>
                <Tooltip title="Test tooltip">
                    <Button primary icon={StarIcon} iconAlign="bottom" iconSize="large">
                        Save & Close
                    </Button>
                </Tooltip>
                <Button
                    primary
                    transparent
                    icon={<StarIcon />}
                    loadingComponent={<CircularProgress />}
                    loading
                >
                    Save & Close
                </Button>

                <Button primary disabled icon={<ShoppingCartIcon />} iconAlign="right">
                    Save & Close
                </Button>

                <Button centered>Close</Button>
                <Button centered disabled>
                    Delete
                </Button>
                <Button centered plain>
                    Close
                </Button>
                <Button primary centered plain>
                    Close
                </Button>
            </ActionsBar>
            <ActionsBar className="u-margin-b-6">
                <Button primary icon={<ShoppingCartIcon />} size="small">
                    Save & Close
                </Button>

                <Button primary icon={<ShoppingCartIcon />} size="medium">
                    Save & Close
                </Button>

                <Button primary centered icon={<ShoppingCartIcon />} size="large">
                    Add to Cart
                </Button>

                <Button primary centered icon={<ShoppingCartIcon />} size="medium" />
                <Button primary centered icon={<ShoppingCartIcon />} size="medium" plain />
            </ActionsBar>
            <ActionsBar>
                <Button primary centered icon={ShoppingCartIcon} size="large" autoWidth>
                    Add to Cart
                </Button>
            </ActionsBar>
        </>
    );
};
Examples.parameters = {
    controls: { hideNoControlsWarning: true, disable: true }
};
