// #region imports
    // #region external
    import {
        ONE_NEW_LINE,
        TWO_NEW_LINES,
    } from '~data/constants';

    import {
        DatasignAnnotation,
    } from '~data/interfaces';
    // #endregion external
// #endregion imports



// #region module
export const separateList = (
    value: string,
) => {
    return value.split(',');
}


export const stringToBoolean = (
    s: string,
    valueDefault: boolean = false,
): boolean => {
    switch(s.toLowerCase()) {
        case 'true':
        case '1':
        case 'on':
        case 'yes':
        case 'y':
            return true;

        case 'false':
        case '0':
        case 'off':
        case 'no':
        case 'n':
            return false;
    }

    return valueDefault;
}




export const isDatasignText = (
    value: string,
) => {
    return /data \w+ {/g.test(value);
}


export const capitalize = (
    word: string
) => word.charAt(0).toUpperCase() + word.slice(1);


export const trimTrailingSpace = (
    line: string,
) => {
    return line.replace(/\s+$/g, '');
}

export const trimLeadingSpace = (
    line: string,
) => {
    return line.replace(/^\s+/g, '');
}

export const trimSpace = (
    line: string,
) => {
    return trimTrailingSpace(trimLeadingSpace(line));
}


export const formatCode = (
    text: string[],
) => {
    return text.join(TWO_NEW_LINES) + ONE_NEW_LINE;
}


export const resolveSpacing = (
    spacing: number,
) => {
    return ' '.repeat(spacing);
}



export const extractAnnotationsByType = (
    annotations: DatasignAnnotation[],
    type: string,
): DatasignAnnotation[] => {
    const typedAnnotations = [];
    for (const annotation of annotations) {
        if (annotation.name === type) {
            typedAnnotations.push(annotation);
        }
    }
    return typedAnnotations;
}



export const constructGeneratedNotice = (
    filename: string | undefined,
    type: string,
) => {
    const commentMark = type === 'graphql'
        ? '~'
        : '//';

    const generatedFrom = filename
        ? `${commentMark} This file has been generated from ${filename}.datasign.\n`
        : `${commentMark} This file has been generated from a .datasign file.\n`;

    const notice = `${commentMark} ---\n`
        + generatedFrom
        + `${commentMark} Do not edit directly.\n`
        + `${commentMark} ---\n\n`;

    return notice;
}
// #endregion module
