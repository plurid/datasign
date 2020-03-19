export interface DatasignCompilerData {
    source: string;
    targets: Target[];
    options?: DatasignCompilerOption;
}


export interface DatasignCompilerOption {
    /**
     * Compile comments into target text.
     */
    comments: boolean;
}


export interface DatasignCompileResult {
    source: string;
    typescript?: string;
    graphql?: string;
    protobuf?: string;
}


export interface DatasignEntity {
    id: string;
    name: string;
    data: DatasignEntityData[];

    /**
     * Entities may be annotated with `@only` to allow compilation
     * for only a type of target.
     *
     * Supported: typescript, graphql, protobuf.
     * Default: `[]`.
     */
    only?: Target[];
    comment?: string;
}

export interface DatasignEntityData {
    name: string;
    type: string;
    required: boolean;
    annotations?: any;
    comment?: string;
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
