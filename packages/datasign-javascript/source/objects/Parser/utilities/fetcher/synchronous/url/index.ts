// #region imports
    // #region libraries
    import fetch from 'sync-fetch';
    // #endregion libraries


    // #region external
    import {
        resolveFetchURL,
    } from '../../logic';
    // #endregion external
// #endregion imports



// #region module
const fetchFromURL = (
    url: string,
    token?: string,
) => {
    const {
        headers,
        filetype,
    } = resolveFetchURL(
        url,
        token,
    );

    const response = fetch(
        url,
        {
            headers,
        },
    );
    const body = response.text();
    const data = typeof body === 'string'
        ? body
        : body.toString('utf-8');

    return {
        data,
        filetype,
    };
}
// #endregion module



// #region exports
export {
    fetchFromURL,
};
// #endregion exports
