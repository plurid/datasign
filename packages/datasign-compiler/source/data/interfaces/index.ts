export interface DatasignCompilerOptions {
    text: string;
    targets: Target[];
}


export type TargetTypescript = 'typescript';
export type TargetGraphQL = 'graphql';
export type TargetProtocolBuffers = 'protobuf';
export type Target = TargetTypescript | TargetGraphQL | TargetProtocolBuffers;
