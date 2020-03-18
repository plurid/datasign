export interface DatasignCompilerData {
    source: string;
    targets: Target[];
}


export interface DatasignCompileResult {
    source: string;
    typescript?: string;
    graphql?: string;
    protobuf?: string;
}


export type TargetTypescript = 'typescript';
export type TargetGraphQL = 'graphql';
export type TargetProtocolBuffers = 'protobuf';
export type Target = TargetTypescript | TargetGraphQL | TargetProtocolBuffers;

export interface Targets {
    typescript: TargetTypescript;
    graphql: TargetGraphQL;
    protobuf: TargetProtocolBuffers;
}
