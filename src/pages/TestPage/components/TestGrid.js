import React from 'react';
import FlexRow from '@components/FlexRow';
import FlexCol from '@components/FlexCol';

const TestGrid = () => {
    return (
        // <div className="grid">
        //     <div className="col u-padding-4">
        //         <div className="test-box">Item 1</div>
        //     </div>
        //     <div className="col u-padding-4">
        //         <div className="test-box">Item 2</div>
        //     </div>
        //     <div className="u-width-full" />
        //     <div className="col u-padding-4">
        //         <div className="test-box">Item 3</div>
        //     </div>
        // </div>

        <FlexRow spacing={4}>
            <FlexCol md>
                <div className="test-box">Item 1</div>
            </FlexCol>
            {/* <div className="u-width-full" /> */}
            <FlexCol md>
                <div className="test-box">Item 2</div>
            </FlexCol>
            {/* <div className="u-width-full" /> */}
            <FlexCol md>
                <div className="test-box">Item 3</div>
            </FlexCol>
            {/* <FlexCol>
                <div className="test-box">Item 3</div>
            </FlexCol> */}
        </FlexRow>
    );
};

export default TestGrid;
