import {
    Target,
} from '@plurid/datasign-compiler';



const processTargets = (
    argTargets: string[],
) => {
    const targets: Target[] = [];

    for (const argTarget of argTargets) {
        switch (argTarget) {
            case 'typescript':
                targets.push(argTarget);
                break;
            case 'graphql':
                targets.push(argTarget);
                break;
            case 'protobuf':
                targets.push(argTarget);
                break;
        }
    }

    return targets;
}


export default processTargets;
