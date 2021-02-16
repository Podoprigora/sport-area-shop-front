import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import {
    Window,
    WindowProps,
    WindowHeader,
    WindowBody,
    WindowActions,
    WindowTitle,
    WindowLoadingMask
} from '../components/Window';
import { Button } from '../components/Button';
import { ShoppingBagIcon, ChevronLeftIcon } from '../components/svg-icons/feather';
import { ClearCloseIcon } from '../components/svg-icons/material';
import { IconButton } from '../components/IconButton';

export default {
    title: 'PA-UI-KIT/Window',
    component: Window,
    subcomponents: { WindowHeader, WindowTitle, WindowBody, WindowActions, WindowLoadingMask },
    argTypes: {
        open: {
            control: {
                type: null
            }
        }
    }
} as Meta;

const useWindow = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = useCallback(() => {
        setOpen(true);
    }, []);

    const handleClose = useCallback(() => {
        setOpen(false);
    }, []);

    return useMemo(() => ({ open, handleOpen, handleClose } as const), [
        open,
        handleClose,
        handleOpen
    ]);
};

// Default Story

export const Default: Story<WindowProps> = (args) => {
    const { open, handleOpen, handleClose } = useWindow();

    return (
        <>
            <Button primary onClick={handleOpen}>
                Open Window
            </Button>
            <Window {...args} open={open} onClose={handleClose} onEscapeKeyDown={handleClose}>
                <WindowHeader
                    title="Default"
                    icon={<ShoppingBagIcon primary />}
                    onClose={handleClose}
                />
                <WindowBody>
                    <div>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum sunt
                            temporibus, error animi necessitatibus tempora! Provident fugiat,
                            perspiciatis at repellat sapiente odio. Placeat, a quaerat maxime iusto
                            quas hic est.
                        </p>
                    </div>
                </WindowBody>
                <WindowActions justify="flex-end" alignItems="center">
                    <Button primary disabled>
                        Save
                    </Button>
                    <Button onClick={handleClose}>Close</Button>
                </WindowActions>
            </Window>
        </>
    );
};
Default.args = {
    centered: true,
    maxWidth: 400
} as WindowProps;

// FullScreen Story

export const FullScreen: Story<WindowProps> = (args) => {
    const { open, handleOpen, handleClose } = useWindow();

    return (
        <>
            <Button primary onClick={handleOpen}>
                Open Window
            </Button>
            <Window {...args} open={open} onClose={handleClose} onEscapeKeyDown={handleClose}>
                <WindowHeader>
                    <IconButton onClick={handleClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                    <WindowTitle>Full Screen</WindowTitle>
                    <IconButton onClick={handleClose}>
                        <ClearCloseIcon />
                    </IconButton>
                </WindowHeader>
                <WindowBody>
                    <div>
                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium
                            sed animi, maxime deserunt suscipit labore illum eum voluptatibus
                            doloremque omnis corporis soluta repellat, cupiditate nobis in qui at
                            eaque odit? Id reiciendis fugit unde itaque officia quod exercitationem
                            iusto quae! Rerum, labore, nesciunt incidunt omnis odit earum quod
                            aliquam illum adipisci mollitia ut reprehenderit doloribus natus
                            voluptas architecto doloremque eaque? Molestiae eligendi ab quod atque
                            magnam itaque voluptatum, doloremque iusto repellendus reiciendis
                        </p>
                    </div>
                </WindowBody>
                <WindowActions direction="column" alignItems="center">
                    <Button primary disabled autoWidth>
                        Save
                    </Button>
                    <Button autoWidth onClick={handleClose}>
                        Close
                    </Button>
                </WindowActions>
            </Window>
        </>
    );
};

FullScreen.args = {
    fullScreen: true,
    backdrop: false
} as WindowProps;

// Window with loading mask Story

export const WindowWithLoadingMask: Story<WindowProps> = (args) => {
    const { open, handleOpen, handleClose } = useWindow();
    const [maskOpen, setMaskOpen] = useState(false);
    const windowRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (open) {
            setMaskOpen(true);

            return () => {
                setMaskOpen(false);
            };
        }

        return undefined;
    }, [open]);

    return (
        <>
            <Button primary onClick={handleOpen}>
                Open Window
            </Button>
            <Window
                {...args}
                open={open}
                maxWidth={400}
                onClose={handleClose}
                onEscapeKeyDown={handleClose}
                ref={windowRef}
            >
                <WindowLoadingMask open={maskOpen} title="Loading ..." anchorRef={windowRef} />
                <WindowHeader title="With loading mask" />
                <WindowBody>
                    <div>
                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium
                            sed animi, maxime deserunt suscipit labore illum eum voluptatibus
                            doloremque omnis corporis soluta repellat, cupiditate nobis in qui at
                            eaque odit? Id reiciendis fugit unde itaque officia quod exercitationem
                            iusto quae! Rerum, labore, nesciunt incidunt omnis odit earum quod
                            aliquam illum adipisci mollitia ut reprehenderit doloribus natus
                            voluptas architecto doloremque eaque? Molestiae eligendi ab quod atque
                            magnam itaque voluptatum, doloremque iusto repellendus reiciendis
                        </p>
                    </div>
                </WindowBody>
                <WindowActions direction="column" alignItems="center">
                    <Button autoWidth onClick={handleClose}>
                        Close
                    </Button>
                </WindowActions>
            </Window>
        </>
    );
};
WindowWithLoadingMask.args = {
    centered: true,
    backdrop: true
} as WindowProps;
WindowWithLoadingMask.storyName = 'With loading mask';
