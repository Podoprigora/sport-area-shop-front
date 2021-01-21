// Problem definition: https://wicg.github.io/focus-visible/explainer.html
// Source: https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/utils/useIsFocusVisible.js
// based on https://github.com/WICG/focus-visible/blob/v4.1.5/src/focus-visible.js

import React, { useCallback, useMemo } from 'react';
import ReactDOM from 'react-dom';

type InputTypesWhilelist = { [key: string]: boolean };

let hadKeyboardEvent = true;
let hadFocusVisibleRecently = true;
let hadFocusVisiblerecentlyTimeout: number | undefined;

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
} as InputTypesWhilelist;

function focusTriggersKeyboardModality(node: HTMLElement): boolean {
    const { type = '', tagName, readOnly, isContentEditable } = node as HTMLInputElement;

    if (tagName === 'INPUT' && inputTypesWhitelist[type] && !readOnly) {
        return true;
    }

    if (tagName === 'TEXTAREA') {
        return true;
    }

    if (isContentEditable) {
        return true;
    }

    return false;
}

function handleKeyDown(event: KeyboardEvent): void {
    if (event?.metaKey || event?.altKey || event?.ctrlKey) {
        return;
    }

    hadKeyboardEvent = true;
}

function handlePointerDown(): void {
    hadKeyboardEvent = false;
}

function handleVisibilityChange(this: HTMLDocument): void {
    if (this.visibilityState === 'hidden') {
        if (hadFocusVisibleRecently) {
            hadKeyboardEvent = true;
        }
    }
}

function prepare(doc: HTMLDocument) {
    doc.addEventListener('keydown', handleKeyDown, true);
    doc.addEventListener('mausedown', handlePointerDown, true);
    doc.addEventListener('pointerdown', handlePointerDown, true);
    doc.addEventListener('touchstart', handlePointerDown, true);
    doc.addEventListener('visibilitychange', handleVisibilityChange, true);
}

export function teardown(doc: HTMLDocument) {
    doc.removeEventListener('keydown', handleKeyDown, true);
    doc.removeEventListener('mausedown', handlePointerDown, true);
    doc.removeEventListener('pointerdown', handlePointerDown, true);
    doc.removeEventListener('touchstart', handlePointerDown, true);
    doc.removeEventListener('visibilitychange', handleVisibilityChange, true);
}

function isFocusVisible(event: React.FocusEvent<HTMLElement>): boolean {
    const { target } = event;

    return hadKeyboardEvent || focusTriggersKeyboardModality(target);
}

function handleBlurVisible(): void {
    hadFocusVisibleRecently = true;

    window.clearTimeout(hadFocusVisiblerecentlyTimeout);

    hadFocusVisiblerecentlyTimeout = window.setTimeout(() => {
        hadFocusVisibleRecently = false;
    }, 100);
}

export function useIsFocusVisible() {
    const ref = useCallback((instance: HTMLElement | null): void => {
        const node = ReactDOM.findDOMNode(instance);

        if (node) {
            prepare(node.ownerDocument);
        }
    }, []);

    return useMemo(() => ({ isFocusVisible, onBlurVisible: handleBlurVisible, ref }), [ref]);
}
