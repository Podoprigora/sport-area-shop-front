import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Window, { WindowActions, WindowBody, WindowHeader, WindowLoadingMask } from '@ui/Window';
import ShoppingCartIcon from '@svg-icons/feather/ShoppingCartIcon';
import ChevronLeftIcon from '@svg-icons/feather/ChevronLeftIcon';
import Button from '@ui/Button';
import useMediaQuery from '@ui/hooks/useMediaQuery';
import { useWindowManager } from '@ui/WindowManager';
import useEventCallback from '@ui/hooks/useEventCallback';

const windowName = 'CartWindow';

const CartWindowView = (props) => {
    const { children, loading, disableActions } = props;

    const { isOpenWindow, closeWindow } = useWindowManager();
    const fullScreen = useMediaQuery('(max-width: 576px)');

    const handleClose = useEventCallback(() => {
        closeWindow(windowName);
    });

    const open = isOpenWindow(windowName);

    return (
        <Window
            open={open}
            centered
            fullScreen={fullScreen}
            maxWidth={750}
            disableRestoreFocus
            className="cart cart-window"
            onClose={handleClose}
        >
            <WindowLoadingMask open={loading} />
            <WindowHeader
                title="Cart"
                onClose={handleClose}
                renderIcon={() => <ShoppingCartIcon />}
            />
            <WindowBody className="cart-window__body">{children}</WindowBody>
            {!disableActions && (
                <WindowActions>
                    <Button
                        link
                        truncate
                        size={fullScreen ? 'large' : null}
                        icon={ChevronLeftIcon}
                        className="u-margin-r-auto"
                        onClick={handleClose}
                    >
                        Continue shopping
                    </Button>
                    <Button primary plain disabled size={fullScreen ? 'large' : null}>
                        Checkout
                    </Button>
                </WindowActions>
            )}
        </Window>
    );
};

CartWindowView.propTypes = {
    children: PropTypes.node,
    loading: PropTypes.bool,
    disableActions: PropTypes.bool
};

export default memo(CartWindowView);
