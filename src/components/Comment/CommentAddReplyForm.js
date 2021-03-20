import React, { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { useEventCallback, useMountedRef } from '@ui/utils';
import { Input } from '@ui/Input';
import { Button } from '@ui/Button';
import { Mask } from '@ui/Mask';
import { HelperText } from '@ui/HelperText';
import { CircularProgress } from '@ui/CircularProgress';

const maxLength = 200;

const CommentAddReplyForm = (props) => {
    const { onCancel, onAsyncSubmit, onSubmit } = props;

    const [value, setValue] = useState('');
    const [pending, setPending] = useState(false);

    const inputRef = useRef(null);
    const isMountedRef = useMountedRef();

    const handleSubmit = () => {
        if (onSubmit) {
            onSubmit(value);
            setValue('');
        }
    };

    const handleAsyncSubmit = async () => {
        if (onAsyncSubmit) {
            try {
                setPending(true);
                await onAsyncSubmit(value);
            } catch (e) {
                console.error(e);
            } finally {
                if (isMountedRef.current) {
                    setPending(false);
                    setValue('');
                }
            }
        }
    };

    const handleChange = useCallback((ev) => {
        setValue(ev.target.value);
    }, []);

    const handleCancelClick = useEventCallback((ev) => {
        if (onCancel) {
            onCancel(ev);
        }
    });

    const handleSubmitClick = useEventCallback((ev) => {
        handleSubmit();
        handleAsyncSubmit();
    });

    const charactersLength = value ? value.length : 0;
    const maxCharactersLengthError = maxLength - charactersLength < 0;
    const shouldDisableSubmit = maxCharactersLengthError || !value;

    return (
        <form className="comment__add-reply-form">
            <Mask open={pending} />
            <Input
                type="textarea"
                value={value}
                placeholder="Enter your reply"
                fullWidth
                autoFocus
                disabled={pending}
                className="comment__add-reply-input"
                onChange={handleChange}
                ref={inputRef}
            />
            <div className="u-flex u-flex-justify-flex-end">
                <HelperText error={maxCharactersLengthError}>
                    {charactersLength} / {maxLength}
                </HelperText>
            </div>
            <div className="comment__add-reply-actions">
                <Button transparent centered onClick={handleCancelClick}>
                    Cancel
                </Button>
                <Button
                    primary
                    centered
                    plain
                    loading={pending}
                    loadingComponent={<CircularProgress />}
                    disabled={shouldDisableSubmit || pending}
                    onClick={handleSubmitClick}
                >
                    {pending ? '' : 'Reply'}
                </Button>
            </div>
        </form>
    );
};

CommentAddReplyForm.propTypes = {
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func,
    onAsyncSubmit: PropTypes.func
};

export default CommentAddReplyForm;
