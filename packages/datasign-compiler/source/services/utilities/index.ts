import {
    ONE_NEW_LINE,
    TWO_NEW_LINES,
} from '../../data/constants';

import {
    DatasignAnnotation,
} from '../../data/interfaces';



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
