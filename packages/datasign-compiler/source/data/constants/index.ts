import {
    TargetTypescript,
    TargetGraphQL,
    TargetProtocolBuffers,
    Targets,
} from '../interfaces';



export const targetTypescript: TargetTypescript = 'typescript';
export const targetGraphQL: TargetGraphQL = 'graphql';
export const targetProtocolBuffers: TargetProtocolBuffers = 'protobuf';

export const targets: Targets = {
    graphql: targetGraphQL,
    protobuf: targetProtocolBuffers,
    typescript: targetTypescript,
};
