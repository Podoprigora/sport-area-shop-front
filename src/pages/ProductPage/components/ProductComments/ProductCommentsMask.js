import React from 'react';
import PropTypes from 'prop-types';
import Mask, { MaskProgress } from '@ui/Mask';
import CircularProgress from '@ui/CircularProgress';

const ProductCommentsMask = (props) => {
    const { open } = props;

    return (
        <Mask open={open}>
            <MaskProgress primary>
                <CircularProgress size="large" />
            </MaskProgress>
        </Mask>
    );
};

ProductCommentsMask.propTypes = {
    open: PropTypes.bool
};

export default ProductCommentsMask;
