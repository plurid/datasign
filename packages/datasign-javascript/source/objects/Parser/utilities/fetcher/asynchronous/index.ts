// #region imports
    // #region external
    import {
        DatasignInterpreterOptions,
    } from '../../../data/interfaces';

    import {
        isURL,
    } from '../../general';
    // #endregion external


    // #region internal
    import {
        fetchFromURL,
    } from './url';

    import {
        fetchFromFile,
    } from './file';
    // #endregion internal
// #endregion imports



// #region module
const fetcher = async (
    file: string,
    options: DatasignInterpreterOptions,
    token?: string,
) => {
    try {
        const fileIsUrl = isURL(file);

        if (fileIsUrl) {
            if (!options.parseOptions?.allowNetwork) {
                return;
            }

            const {
                data,
                filetype,
            } = await fetchFromURL(
                file,
                token,
            );

            return {
                data,
                filetype,
            };
        }

        if (!options.parseOptions?.allowFilesystem) {
            return;
        }

        const {
            data,
            filetype,
            filebase,
        } = await fetchFromFile(
            file,
            options,
        );

        return {
            data,
            filetype,
            filebase,
        };
    } catch (error) {
        return;
    }
}
// #endregion module



// #region exports
export {
    fetcher,
};
// #endregion exports
