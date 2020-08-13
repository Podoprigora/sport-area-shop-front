import React from 'react';
import CircularProgress from '@ui/CircularProgress';
import BoxLabel from '@ui/BoxLabel';

const TestCircularProgres = () => {
    return (
        <div>
            <div>
                <CircularProgress size="small" />
            </div>
            <div>
                <CircularProgress size="medium" />
            </div>
            <div>
                <CircularProgress size="large" />
            </div>
            <div>
                <CircularProgress size="small" primary />
            </div>
            <div>
                <BoxLabel className="progress-box-label" label="Saving ..." labelAlign="bottom">
                    <CircularProgress size="medium" primary />
                </BoxLabel>
            </div>
            <div>
                <CircularProgress size="large" primary />
            </div>
        </div>
    );
};

export default TestCircularProgres;
