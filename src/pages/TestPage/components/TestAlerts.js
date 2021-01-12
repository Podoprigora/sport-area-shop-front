import React from 'react';
import Alert, { AlertTitle, AlertActions } from '@ui/Alert';
import IconButton from '@ui/IconButton';
import ClearCloseIcon from '@ui/svg-icons/material/ClearCloseIcon';
import HeartIcon from '@ui/svg-icons/feather/HeartIcon';
import Button from '@ui/Button';
import ChevronRightIcon from '@ui/svg-icons/feather/ChevronRightIcon';

const TestAlerts = (props) => {
    return (
        <div>
            <Alert
                type="error"
                frame
                action={
                    <IconButton size="medium">
                        <ClearCloseIcon />
                    </IconButton>
                    // <Button transparent>Learn More</Button>
                }
            >
                <AlertTitle>Alert</AlertTitle>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium quasi quibusdam
                possimus eos eum reiciendis unde veniam, commodi distinctio autem sit nulla quidem
                ea minima non dolorem. Fugit, placeat voluptate.
                <AlertActions>
                    <Button transparent>Learn More</Button>
                    <Button transparent>Learn More</Button>
                </AlertActions>
            </Alert>
            <Alert
                type="warning"
                frame
                action={
                    <>
                        <Button transparent iconAlign="right">
                            Learn More
                        </Button>
                        {/* <IconButton size="medium">
                            <ClearCloseIcon />
                        </IconButton> */}
                        <IconButton size="medium">
                            <ClearCloseIcon />
                        </IconButton>
                    </>
                }
                className="u-margin-t-5"
            >
                {/* <AlertTitle>Warning</AlertTitle> */}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium quasi quibusdam
                possimus eos eum reiciendis unde veniam,
                {/* commodi distinctio autem sit nulla quidem
                ea minima non dolorem. Fugit, placeat voluptate. */}
                {/* <AlertActions>
                    <Button transparent>Learn More</Button>
                    <Button transparent>Learn More</Button>
                </AlertActions> */}
            </Alert>
            <Alert
                type="info"
                frame
                action={
                    <IconButton size="medium">
                        <ClearCloseIcon />
                    </IconButton>
                    // <Button transparent>Learn More</Button>
                }
                className="u-margin-t-5"
            >
                <AlertTitle>Info</AlertTitle>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium quasi quibusdam
                possimus eos eum reiciendis unde veniam, commodi distinctio autem sit nulla quidem
                ea minima non dolorem. Fugit, placeat voluptate.
                <AlertActions>
                    <Button transparent>Learn More</Button>
                    <Button transparent>Learn More</Button>
                </AlertActions>
            </Alert>
            <Alert
                type="success"
                frame
                action={
                    <IconButton size="medium">
                        <ClearCloseIcon />
                    </IconButton>
                    // <Button transparent>Learn More</Button>
                }
                className="u-margin-t-5"
            >
                <AlertTitle>Success</AlertTitle>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium quasi quibusdam
                possimus eos eum reiciendis unde veniam, commodi distinctio autem sit nulla quidem
                ea minima non dolorem. Fugit, placeat voluptate.
                <AlertActions>
                    <Button transparent>Learn More</Button>
                    <Button transparent>Learn More</Button>
                </AlertActions>
            </Alert>
        </div>
    );
};

export default TestAlerts;
