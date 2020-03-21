import {
    TargetTypescript,
    TargetGraphQL,
    TargetProtocolBuffers,
    Targets,

    TypeEntityAnnotation,
    TypeFieldAnnotation,
    TypeDataStart,
    TypeDataEnd,
    TypeDataField,
    TypeEmptyLine,
} from '../interfaces';



export const targetTypescript: TargetTypescript = 'typescript';
export const targetGraphQL: TargetGraphQL = 'graphql';
export const targetProtocolBuffers: TargetProtocolBuffers = 'protobuf';

export const targets: Targets = {
    graphql: targetGraphQL,
    protobuf: targetProtocolBuffers,
    typescript: targetTypescript,
};


export const typeEntityAnnotation: TypeEntityAnnotation = 'ENTITY_ANNOTATION';
export const typeFieldAnnotation: TypeFieldAnnotation = 'FIELD_ANNOTATION';
export const typeDataStart: TypeDataStart = 'DATA_START';
export const typeDataEnd: TypeDataEnd = 'DATA_END';
export const typeDataField: TypeDataField = 'DATA_FIELD';
export const typeEmptyLine: TypeEmptyLine = 'EMPTY_LINE';

export const lineTypes = {
    entityAnnotation: typeEntityAnnotation,
    fieldAnnotation: typeFieldAnnotation,
    dataStart: typeDataStart,
    dataEnd: typeDataEnd,
    dataField: typeDataField,
    emptyLine: typeEmptyLine,
};
