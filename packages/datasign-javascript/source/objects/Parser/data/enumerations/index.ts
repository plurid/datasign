// #region module
export enum TokenType {
    // Single-character tokens.
    ALPHASAND,
    QUESTION_MARK, BANG,
    AMPERSAND, PIPE,
    DOT, COMMA,
    LEFT_CURLY_BRACKET, RIGHT_CURLY_BRACKET,
    LEFT_SQUARE_BRACKET, RIGHT_SQUARE_BRACKET,
    LEFT_PARANTHESIS, RIGHT_PARANTHESIS,


    // Entities.
    SIGNIFIER,

    DATATYPE,
    FIELD, TYPE,

    ANNOTATE_GRAPHQL,
    ANNOTATE_PROTOBUF,
    ANNOTATE_TYPESCRIPT,

    META_GRAPHQL,
    META_PROTOBUF,
    META_TYPESCRIPT,


    // Operators
    AND, OR, OPTIONAL,


    // Keywords
    IMPORT,


    EOF,
}
// #endregion module
