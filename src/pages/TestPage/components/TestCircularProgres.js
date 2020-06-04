import React from 'react';
import CircularProgress from '@components/CircularProgress';
import BoxLabel from '@components/BoxLabel';

const TestCircularProgres = () => {
    return (
        <div>
            <div>
                <CircularProgress preset="small" />
            </div>
            <div>
                <CircularProgress preset="medium" />
            </div>
            <div>
                <CircularProgress preset="large" />
            </div>
            <div>
                <CircularProgress preset="small" primary />
            </div>
            <div>
                <BoxLabel className="progress-box-label" label="Saving ..." labelAlign="bottom">
                    <CircularProgress preset="medium" primary />
                </BoxLabel>
            </div>
            <div>
                <CircularProgress preset="large" primary />
            </div>
        </div>
    );
};

export default TestCircularProgres;
