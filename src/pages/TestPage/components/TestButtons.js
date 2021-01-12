import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Button from '@ui/Button';
import UserIcon from '@ui/svg-icons/feather/UserIcon';
import StarIcon from '@ui/svg-icons/feather/StarIcon';
import ChevronLeftIcon from '@ui/svg-icons/feather/ChevronLeftIcon';
import ChevronRightIcon from '@ui/svg-icons/feather/ChevronRightIcon';
import ShoppingCartIcon from '@ui/svg-icons/feather/ShoppingCartIcon';
import Tooltip from '@ui/Tooltip';
import CircularProgress from '@ui/CircularProgress';

const TestButtons = (props) => {
    const btnRef = useRef(null);

    // useEffect(() => {
    //     if (btnRef.current) {
    //         btnRef.current.focus();
    //     }
    // }, []);

    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    flexFlow: 'row wrap',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start'
                }}
            >
                <Button
                    primary
                    icon={CircularProgress}
                    iconAlign="top"
                    iconSize="small"
                    style={{ marginRight: '1.4rem' }}
                >
                    Save & Close
                </Button>
                <Button
                    primary
                    icon={StarIcon}
                    iconAlign="bottom"
                    iconSize="large"
                    ref={btnRef}
                    style={{ marginRight: '1.4rem' }}
                >
                    Save & Close
                </Button>
                <Tooltip title="Test tooltip">
                    <Button
                        primary
                        transparent
                        icon={StarIcon}
                        loadingComponent={<CircularProgress />}
                        loading
                        style={{ marginRight: '1.4rem' }}
                        onClick={(ev) => {
                            console.log('!!!');
                        }}
                    >
                        Save & Close
                    </Button>
                </Tooltip>

                <Button
                    primary
                    disabled
                    icon={ShoppingCartIcon}
                    iconAlign="right"
                    style={{ marginRight: '1.4rem' }}
                >
                    Save & Close
                </Button>

                <Button centered style={{ marginRight: '1.4rem' }}>
                    Close
                </Button>
                <Button centered disabled style={{ marginRight: '1.4rem' }}>
                    Delete
                </Button>
                <Button centered plain style={{ marginRight: '1.4rem' }}>
                    Close
                </Button>
                <Button primary centered plain style={{ marginRight: '1.4rem' }}>
                    Close
                </Button>
            </div>

            <div style={{ marginTop: '1rem' }}>
                <div style={{ padding: '.5rem 0' }}>
                    <Button primary icon={ShoppingCartIcon} size="small">
                        Save & Close
                    </Button>
                </div>
                <div style={{ padding: '.5rem 0' }}>
                    <Button primary icon={ShoppingCartIcon} size="medium">
                        Save & Close
                    </Button>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', padding: '.5rem 0' }}>
                    <Button
                        primary
                        centered
                        icon={ShoppingCartIcon}
                        size="large"
                        style={{ marginRight: '1rem' }}
                    >
                        Add to Cart
                    </Button>

                    <Button
                        primary
                        centered
                        icon={ShoppingCartIcon}
                        size="medium"
                        style={{ marginRight: '1rem' }}
                    />
                    <Button primary centered icon={ShoppingCartIcon} size="medium" plain />
                </div>
            </div>
            <div style={{ marginTop: '1rem' }}>
                <Button
                    primary
                    centered
                    icon={ShoppingCartIcon}
                    size="large"
                    autoWidth
                    style={{ marginRight: '1rem' }}
                >
                    Add to Cart
                </Button>
            </div>
        </div>
    );
};

export default TestButtons;
