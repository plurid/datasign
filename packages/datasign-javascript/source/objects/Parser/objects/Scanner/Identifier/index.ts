// #region imports
    // #region external
    import {
        TokenType,
    } from '../../../data/enumerations';

    import Token from '../../Token';
    // #endregion external
// #endregion imports



// #region module
class Identifier {
    private current = 0;
    private tokens: Token[];

    constructor(
        tokens: Token[],
    ) {
        this.tokens = tokens;
    }

    public identify() {
        if (this.tokens.length === 0) {
            return [];
        }

        const tokens: Token[] = [];

        return tokens;
    }


    private isAtEnd() {
        return this.current >= this.tokens.length;
    }

    private advance() {
        this.current += 1;
    }

    private peek() {
        return this.tokens[this.current];
    }

    private previous() {
        return this.tokens[this.current - 1];
    }

    private match(
        tokenType: TokenType,
    ) {
        const next = this.tokens[this.current + 1];

        if (next && next.type === tokenType) {
            return true;
        }

        return false;
    }

    private tokenFrom(
        type: TokenType,
        data: Token,
        lexeme?: string,
    ) {
        const token = new Token(
            type,
            lexeme || data.lexeme,
            data.literal,
            data.line,
        );

        return token;
    }
}
// #endregion module



// #region exports
export default Identifier;
// #endregion exports
