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
