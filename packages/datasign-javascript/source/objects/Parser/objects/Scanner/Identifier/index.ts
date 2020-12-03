// #region imports
    // #region external
    import {
        TokenType,
    } from '../../../data/enumerations';

    import Token from '../../Token';

    import {
        inGroupClassify,
    } from '../../../utilities/general';
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

        const pushAdvance = (
            token: Token,
        ) => {
            tokens.push(token);
            this.advance();
        }

        while(
            !this.isAtEnd()
        ) {
            const previous = this.previous();
            const current = this.peek();
            const next = this.next();

            const inGroup = this.inGroup(this.current);

            if (
                next
                && next.type === TokenType.LEFT_CURLY_BRACKET
                && inGroup === 'ROOT'
                && current.type === TokenType.SIGNIFIER
            ) {
                const dataTypeToken = this.tokenFrom(
                    TokenType.DATATYPE,
                    current,
                );

                pushAdvance(dataTypeToken);
                continue;
            }

            tokens.push(current);
            this.advance();
        }

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

    private next() {
        return this.tokens[this.current + 1];
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

    private inGroup(
        position: number,
    ) {
        const tokens = this.tokens
            .slice(0, position)
            .reverse();

        return inGroupClassify(
            tokens,
        );
    }
}
// #endregion module



// #region exports
export default Identifier;
// #endregion exports
