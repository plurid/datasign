// #region module
export interface DatasignParseOptions {
    filebase: string;
    absolutePaths: Record<string, string>,
    authorization: Record<string, string>,
    allowFilesystem: boolean;
    allowNetwork: boolean;
}


export type PartialDatasignParseOptions = Partial<DatasignParseOptions>;


export interface DatasignInterpreterOptions {
    file: string | undefined;
    parseOptions: PartialDatasignParseOptions | undefined;
}
// #endregion module
