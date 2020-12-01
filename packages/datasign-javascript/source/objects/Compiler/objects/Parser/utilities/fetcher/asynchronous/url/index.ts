// #region imports
    // #region libraries
    import fetch from 'cross-fetch';
    // #endregion libraries


    // #region external
    import {
        resolveFetchURL,
    } from '../../logic';
    // #endregion external
// #endregion imports



// #region module
const fetchFromURL = async (
    url: string,
    token?: string,
    type?: any,
) => {
    const {
        headers,
        filetype,
    } = resolveFetchURL(
        url,
        token,
        type,
    );

    const response = await fetch(
        url,
        {
            headers,
        },
    );
    const data = await response.text();

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
