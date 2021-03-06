// #region module
export interface ProcessData {
    targets: Target[];
    output: string;
    resolve: Resolve;
    merge: boolean | string | undefined;
    comments: boolean;
    spacing: number;
    preserve: boolean;
    generated: boolean;
    debug: boolean;
}


export type ResolveFile = 'file';
export type ResolveProcess = 'process';
export type ResolveFlatten = 'flatten';
export type Resolve = ResolveFile | ResolveProcess | ResolveFlatten;
export interface Resolves {
    file: ResolveFile;
    process: ResolveProcess;
    flatten: ResolveFlatten;
}




export interface DatasignCompilerData {
    source: string;
    targets: Target[];
    filename?: string;
    options?: Partial<DatasignCompilerOptions>;
}


export interface DatasignCompilerOptions {
    /**
     * Compile comments into target text.
     */
    comments: boolean;
    preserveSpacing: boolean;
    spacing: number;

    /**
     * Inject a header in each generated file
     * mentioning it is a generated file.
     */
    generatedNotice: boolean;
}


export interface DatasignCompileResult {
    source: string;
    typescript?: string;
    graphql?: string;
    proto?: string;
}


export interface DatasignEntity {
    id: string;
    name: string;
    data: DatasignEntityData[];
    annotations: DatasignAnnotation[];
    comments: string;

    /**
     * Entities may be annotated with `@only` to allow compilation
     * for only a type of target.
     *
     * Supported: typescript, graphql, proto.
     * Default: `[]`.
     */
    only?: Target[];
}

export interface DatasignEntityData {
    name: string;
    type: string;
    required: boolean;
    annotations: DatasignAnnotation[];
    comments: string;
    empty?: boolean;
}

export interface DatasignAnnotation {
    name: string;
    value: string;
}


export type TypeEntityAnnotation = 'ENTITY_ANNOTATION';
export type TypeEntityComment = 'ENTITY_COMMENT';
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
    | TypeEmptyLine
    | TypeEntityComment;

export interface TypedLine {
    value: string;
    type: TypedValue;
}


export type TargetTypescript = 'typescript';
export type TargetGraphQL = 'graphql';
export type TargetProtocolBuffers = 'proto';
export type Target = TargetTypescript | TargetGraphQL | TargetProtocolBuffers;

export interface Targets {
    typescript: TargetTypescript;
    graphql: TargetGraphQL;
    proto: TargetProtocolBuffers;
}
// #endregion module
