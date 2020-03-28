import React from 'react';
import { Manager, Reference, Popper } from 'react-popper';
import classNames from 'classnames';
import Button from '@components/Button';

const containerStyle = {
    display: 'flex',
    flexFlow: 'row nowrap'
};

const TestReactPopper = () => {
    return (
        <div style={containerStyle}>
            <Manager>
                <Reference>
                    {({ ref }) => (
                        <Button primary ref={ref}>
                            Popper
                        </Button>
                    )}
                </Reference>
                <Popper placement="bottom">
                    {({ ref, style, placement }) => (
                        <div
                            ref={ref}
                            style={style}
                            data-placement={placement}
                            className={classNames('tooltip', {
                                [`tooltip--placement-${placement}`]: placement
                            })}
                        >
                            Popper content
                        </div>
                    )}
                </Popper>
            </Manager>
        </div>
    );
};

export default TestReactPopper;
