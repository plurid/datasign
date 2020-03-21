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



export type TypeEntityAnnotation = 'ENTITY_ANNOTATION';
export type TypeFieldAnnotation = 'FIELD_ANNOTATION';
export type TypeDataStart = 'DATA_START';
export type TypeDataEnd = 'DATA_END';
export type TypeDataField = 'DATA_FIELD';
export type TypeEmptyLine = 'EMPTY_LINE';
export type TypedValue = TypeEntityAnnotation
    | TypeFieldAnnotation
    | TypeDataStart
    | TypeDataEnd
    | TypeDataField
    | TypeEmptyLine;

export interface TypedLine {
    value: string;
    type: TypedValue;
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
