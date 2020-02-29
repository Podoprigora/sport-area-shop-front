import React from 'react';
import PropTypes from 'prop-types';
import Button from '@components/Button';
import UserIcon from '@svg-icons/feather/UserIcon';
import StarIcon from '@svg-icons/feather/StarIcon';
import ChevronLeftIcon from '@svg-icons/feather/ChevronLeftIcon';
import ChevronRightIcon from '@svg-icons/feather/ChevronRightIcon';
import ShoppingCartIcon from '@svg-icons/feather/ShoppingCartIcon';

const TestButtons = (props) => {
    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start'
                }}
            >
                <Button
                    primary
                    icon={StarIcon}
                    iconAlign="top"
                    iconSize="large"
                    style={{ marginRight: '1.4rem' }}
                >
                    Save & Close
                </Button>
                <Button
                    primary
                    icon={StarIcon}
                    iconAlign="bottom"
                    iconSize="large"
                    style={{ marginRight: '1.4rem' }}
                >
                    Save & Close
                </Button>

                <Button primary icon={StarIcon} style={{ marginRight: '1.4rem' }}>
                    Save & Close
                </Button>

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
