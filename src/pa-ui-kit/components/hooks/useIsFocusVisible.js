// Problem definition: https://wicg.github.io/focus-visible/explainer.html
// Source: https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/utils/useIsFocusVisible.js
// based on https://github.com/WICG/focus-visible/blob/v4.1.5/src/focus-visible.js

import { useCallback, useMemo } from 'react';
import ReactDOM from 'react-dom';

let hadKeyboardEvent = true;
let hadFocusVisibleRecently = true;
let hadFocusVisiblerecentlyTimeout = null;

const inputTypesWhitelist = {
    text: true,
    search: true,
    url: true,
    tel: true,
    email: true,
    password: true,
    number: true,
    date: true,
    month: true,
    week: true,
    datetime: true,
    'datetime-local': true
};

function focusTriggersKeyboardModality(node) {
    const { type, tagName } = node;

    if (tagName === 'INPUT' && inputTypesWhitelist[type] && !node.readOnly) {
        return true;
    }

    if (tagName === 'TEXTAREA') {
        return true;
    }

    if (node.isContentEditable) {
        return true;
    }

    return false;
}

function handleKeyDown(event) {
    if (event.metaKey || event.altKey || event.ctrlKey) {
        return;
    }

    hadKeyboardEvent = true;
}

function handlePointerDown() {
    hadKeyboardEvent = false;
}

function handleVisibilityChange() {
    if (this.visibilityState === 'hidden') {
        if (hadFocusVisibleRecently) {
            hadKeyboardEvent = true;
        }
    }
}

function prepare(doc) {
    doc.addEventListener('keydown', handleKeyDown, true);
    doc.addEventListener('mausedown', handlePointerDown, true);
    doc.addEventListener('pointerdown', handlePointerDown, true);
    doc.addEventListener('touchstart', handlePointerDown, true);
    doc.addEventListener('visibilitychange', handleVisibilityChange, true);
}

export function teardown(doc) {
    doc.removeEventListener('keydown', handleKeyDown, true);
    doc.removeEventListener('mausedown', handlePointerDown, true);
    doc.removeEventListener('pointerdown', handlePointerDown, true);
    doc.removeEventListener('touchstart', handlePointerDown, true);
    doc.removeEventListener('visibilitychange', handleVisibilityChange, true);
}

function isFocusVisible(event) {
    const { target } = event;

    return hadKeyboardEvent || focusTriggersKeyboardModality(target);
}

function handleBlurVisible() {
    hadFocusVisibleRecently = true;
    window.clearTimeout(hadFocusVisiblerecentlyTimeout);
    hadFocusVisiblerecentlyTimeout = window.setTimeout(() => {
        hadFocusVisibleRecently = false;
    }, 100);
}

export default function useIsFocusVisible() {
    const ref = useCallback((instance) => {
        const node = ReactDOM.findDOMNode(instance);
        if (node !== null) {
            prepare(node.ownerDocument);
        }
    }, []);

    return useMemo(() => ({ isFocusVisible, onBlurVisible: handleBlurVisible, ref }), [ref]);
}
