// #region module
export enum TokenType {
    // Single-character tokens.
    ALPHASAND,
    QUESTION_MARK,
    AMPERSAND, PIPE,
    DOT,
    LEFT_CURLY_BRACKET, RIGHT_CURLY_BRACKET,
    LEFT_SQUARE_BRACKET, RIGHT_SQUARE_BRACKET,
    LEFT_PARANTHESIS, RIGHT_PARANTHESIS,


    // Entities.
    SIGNIFIER,

    KEY, VALUE,

    ANNOTATE_GRAPHQL,
    ANNOTATE_PROTOBUF,
    ANNOTATE_TYPESCRIPT,

    IMPORT,


    EOF,
}
// #endregion module
