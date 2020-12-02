// #region imports
    // #region external
    import {
    } from '../../data/interfaces';

    import Token from '../Token';
    // #endregion external
// #endregion imports



// #region module
export abstract class Statement {
    abstract accept<T>(
        visitor: Visitor<T>,
    ): T;
}


export interface Visitor<T> {
    visitImportStatement: (importStatement: ImportStatement) => T;
    visitMetaStatement: (metaStatement: MetaStatement) => T;
    visitDatatypeStatement: (datatypeStatement: DatatypeStatement) => T;
    visitFieldStatement: (fieldStatement: FieldStatement) => T;
}


export type ImportType = 'namespace' | 'extract';

export class ImportStatement extends Statement {
    public type: ImportType;
    public name: Token | Token[];
    public path: Token;
    public authenticator: Token | undefined;

    constructor(
        type: ImportType,
        name: Token | Token[],
        path: Token,
        authenticator: Token | undefined,
    ) {
        super();

        this.type = type;
        this.name = name;
        this.path = path;
        this.authenticator = authenticator;
    }

    accept<T>(
        visitor: Visitor<T>,
    ) {
        return visitor.visitImportStatement(this);
    }
}


export class MetaStatement extends Statement {
    private type: Token;
    private data: any;

    constructor(
        type: Token,
        data: any,
    ) {
        super();

        this.type = type;
        this.data = data;
    }

    accept<T>(
        visitor: Visitor<T>,
    ) {
        return visitor.visitMetaStatement(this);
    }
}


export class DatatypeStatement extends Statement {
    private name: Token;
    private fields: any;

    constructor(
        name: Token,
        fields: any,
    ) {
        super();

        this.name = name;
        this.fields = fields;
    }

    accept<T>(
        visitor: Visitor<T>,
    ) {
        return visitor.visitDatatypeStatement(this);
    }
}


export class FieldStatement extends Statement {
    private name: Token;

    constructor(
        name: Token,
    ) {
        super();

        this.name = name;
    }

    accept<T>(
        visitor: Visitor<T>,
    ) {
        return visitor.visitFieldStatement(this);
    }
}
// #endregion module
