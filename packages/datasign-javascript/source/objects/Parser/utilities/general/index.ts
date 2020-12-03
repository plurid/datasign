// #region imports
    // #region libraries
    import path from 'path';
    // #endregion libraries


    // #region external
    import {
        DATASIGN_FILENAME_EXTENSION,
    } from '#data/constants';

    import {
        TokenType,
    } from '../../data/enumerations';

    import Token from '../../objects/Token';
    // #endregion external
// #endregion imports



// #region module
const mapToObject = <K, V>(
    map: Map<K, V>,
) => {
    let obj: any = {};

    for (let [k,v] of map) {
        obj[k] = v;
    }

    return obj;
}


const isURL = (
    path: string,
) => {
    return path.startsWith('http');
}


const solveExtensionName = (
    extname: string,
) => {
    if (extname === DATASIGN_FILENAME_EXTENSION) {
        return {
            filetype: DATASIGN_FILENAME_EXTENSION,
            concatenate: false,
        };
    }

    return {
        filetype: DATASIGN_FILENAME_EXTENSION,
        concatenate: true,
    };
}


const removeEndDoubleNewline = (
    value: string,
) => {
    return value.slice(
        0,
        value.length - 1,
    );
}


const resolveAbsolutePath = (
    value: string,
) => {
    const absolutePath = path.isAbsolute(value);
    const filepath = absolutePath
        ? value
        : path.join(
            process.cwd(),
            value,
        );

    return filepath;
}


const inGroupClassify = (
    tokens: Token[],
) => {
    if (tokens.length === 0) {
        return 'ROOT';
    }

    const curlyBrackets = {
        left: 0,
        right: 0,
    };

    for (const token of tokens) {
        switch (token.type) {
            case TokenType.LEFT_CURLY_BRACKET:
                curlyBrackets.left += 1;
                break;
            case TokenType.RIGHT_CURLY_BRACKET:
                curlyBrackets.right += 1;
                break;
        }

        if (curlyBrackets.left > curlyBrackets.right) {
            return 'TYPE';
        }
    }

    /**
     * TODO
     * to find a less expensive way to check for root
     */
    if (
        curlyBrackets.left === curlyBrackets.right
    ) {
        return 'ROOT';
    }

    return '';
}
// #endregion module



// #region exports
export {
    mapToObject,
    isURL,
    solveExtensionName,
    removeEndDoubleNewline,
    resolveAbsolutePath,
    inGroupClassify,
};
// #endregion exports
