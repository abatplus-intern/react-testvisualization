import { useEffect, Dispatch, SetStateAction, useRef, useReducer, Reducer, ReducerState, ReducerAction } from 'react';
import React from 'react';

// https://dev.to/selbekk/persisting-your-react-state-in-9-lines-of-code-9go
/**
 * hook providing a useState with optionally persisting the value in the local storage. Loading and saving.
 *
 * @export
 * @template T
 * @param {string} prefix, if undefined the value will not be persisted in the local storage
 * @param {string} key, if undefined the value will not be persisted in the local storage
 * @param {T} defaultValue the default value for the setting
 * @returns {[T, Dispatch<SetStateAction<T>>]}
 */
export function usePersistedState<T>(
    prefix: string,
    key: string,
    defaultValue?: T | (() => T)
): [T, Dispatch<SetStateAction<T>>] {
    const [state, setState] = React.useState<T>(() => {
        if (!(prefix && key)) return defaultValue;
        const storedItem = localStorage.getItem(prefix + '_' + key);
        if (!storedItem || storedItem === 'undefined') return defaultValue;
        return JSON.parse(storedItem) || defaultValue;
    });
    useEffect(() => {
        prefix && key && localStorage.setItem(prefix + '_' + key, JSON.stringify(state));
    }, [key, prefix, state]);
    return [state, setState];
}

/**
 * hook providing a useState with optionally writing the value in the local storage. WRITING ONLY.
 * Hint: you need to call "loadState" before any value will be saved!
 *
 * @export
 * @template T
 * @param {string} prefix
 * @param {string} key
 * @param {T} defaultValue
 * @returns {[T, Dispatch<SetStateAction<T>>]}
 */
export function usePersistedStateOneway<T>(
    prefix: string,
    key: string,
    defaultValue: T
): [T, Dispatch<SetStateAction<T>>, () => T, React.MutableRefObject<number>] {
    const [state, setState] = React.useState<T>(defaultValue);
    const loadCount = useRef<number>(0);
    useEffect(() => {
        // only allow saving after loading, otherwise the initial state will always overwrite saved values with the default before loading
        loadCount.current > 0 && prefix && key && localStorage.setItem(prefix + '_' + key, JSON.stringify(state));
    }, [key, prefix, state]);

    const loadState = (): T => {
        loadCount.current++;
        return prefix && key
            ? JSON.parse(localStorage.getItem(prefix + '_' + key) ?? '') || defaultValue
            : defaultValue;
    };
    return [state, setState, loadState, loadCount];
}

export function usePersistedRef<T>(key: string, defaultValue: T): [T, Dispatch<SetStateAction<T>>] {
    const ref = React.useRef<T>(defaultValue);
    ref.current = JSON.parse(localStorage.getItem(key) ?? '') || defaultValue;

    const setRef = (refValue: T) => {
        ref.current = refValue;
        localStorage.setItem(key, JSON.stringify(refValue));
    };
    return [ref.current, setRef as Dispatch<SetStateAction<T>>];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function usePersistedReducer<R extends Reducer<any, any>, T>(
    reducer: R,
    defaultState: T,
    key: string,
    initFunc?: (arg: T) => ReducerState<R>
): [ReducerState<R>, Dispatch<ReducerAction<R>>] {
    const hookVars = useReducer(reducer, defaultState, (reDefaultState) => {
        const persisted = JSON.parse(localStorage.getItem(key) ?? '');
        return persisted !== null ? persisted : initFunc ? initFunc(reDefaultState) : reDefaultState;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(hookVars[0]));
    }, [hookVars, key]);

    return hookVars;
}
