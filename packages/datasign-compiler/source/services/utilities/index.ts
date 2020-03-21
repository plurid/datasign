export const isDatasignText = (
    value: string,
) => {
    return /data \w+ {/g.test(value);
}
