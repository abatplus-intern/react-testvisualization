import { useEffect } from 'react';
import { ApiUrl } from '../../../api/api/apiUrls';
import { Translate, useTranslation } from '../i18n/useTranslation';
import { defaultHeaders, HttpStatusCodes } from './common';
import { suspend, SuspendedPromise } from './suspend';

/**
 * Wrapped promises are being cached until the component is unmounted.
 */
export const queryPromiseCache = new Map<string, SuspendedPromise<any>>();

/**
 * Returns undefined or the data returned by the query. Until that point in time,
 * throws promises or exception in compliance with the React Suspense API. Hence,
 * expects to be wrapped by a Suspense component.
 */
export function useQuery<T extends object>(url: ApiUrl | undefined): T | undefined {
    const translate = useTranslation();

    useEffect(
        // Cleanup cache on unmount
        () => () => {
            url && queryPromiseCache.delete(url);
        },
        [url]
    );
    if (!url) return undefined;

    let wrappedPromise = queryPromiseCache.get(url);
    if (!wrappedPromise) {
        const promise = new Promise<T>(async (resolve, _) => {
            // Send request
            const response = await fetch(url, { headers: defaultHeaders });

            // Check status code
            validateResponse(url, response, translate);

            // Parse response and resolve
            const jsonData = await response.json();
            resolve(jsonData);
        });

        // Wrap the promise to comply with the contract of the Suspense API
        wrappedPromise = suspend<T>(promise);
        queryPromiseCache.set(url, wrappedPromise);
    }

    return wrappedPromise.query();
}

/**
 * Throw localized errors for special error scenarios.
 */
function validateResponse(url: string, response: Response, _translate: Translate) {
    // 404 must explicitly be thrown when using fetch API, since fetch does not reject on 404.
    if (response.status === HttpStatusCodes.NotFound) {
        queryPromiseCache.delete(url);
        // TODO
        throw new Error('Translated error message');
    }
}
