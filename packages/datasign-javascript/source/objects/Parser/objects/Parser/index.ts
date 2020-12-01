// #region imports
    // #region external
    import Token from '../Token';
    import * as Statement from '../Statement';

    import {
        TokenType,
    } from '../../data/enumerations';

    import {
    } from '../../data/interfaces';
    // #endregion external
// #endregion imports



// #region module
class Parser {
    private tokens: Token[];
    private current = 0;
    private ParseError = class ParseError extends Error {};
    private loqueError: any;


    constructor(
        tokens: Token[],
        error: any,
    ) {
        this.tokens = tokens;
        this.loqueError = error;
    }


    public parse() {
        const statements: Statement.Statement[] = [];

        while (!this.isAtEnd()) {
            const declaration = this.declaration();
            if (declaration) {
                statements.push(declaration);
            }
        }

        return statements;
    }

    private declaration() {
        try {
            const current = this.peek();

            if (
                current.type === TokenType.DOT
            ) {
                return this.dot();
            }

            this.advance();
            return;
        } catch (error) {
            this.synchronize();
            return null;
        }
    }

    private dot() {
        const next = this.next();
    }



    private block(
        tokenType: TokenType,
    ) {

    }

    private consume(
        type: TokenType,
        message: string,
    ) {
        if (this.check(type)) {
            return this.advance();
        }

        throw this.error(this.peek(), message);
    }

    private error(
        token: Token,
        message: string,
    ) {
        this.loqueError(token, message);

        return new this.ParseError();
    }

    private synchronize() {
        this.advance();

        while(
            !this.isAtEnd()
        ) {

            this.advance();
        }
    }

    private check(
        type: TokenType,
    ) {
        if (this.isAtEnd()) {
            return false;
        }

        return this.peek().type === type;
    }

    private advance() {
        // console.log('CURRENT TOKEN', this.tokens[this.current]);

        if (!this.isAtEnd()) {
            this.current += 1;
        }

        return this.previous();
    }

    private isAtEnd() {
        return this.peek().type === TokenType.EOF;
    }

    private peek() {
        return this.tokens[this.current];
    }

    private previous() {
        return this.tokens[this.current - 1];
    }

    private next() {
        return this.tokens[this.current + 1];
    }

    private nestLevel(
        position: number,
    ) {
        const tokens = this.tokens
            .slice(0, position)
            .reverse();

        if (tokens.length === 0) {
            return 'ROOT';
        }

        const curlyBrackets = {
            left: 0,
            right: 0,
        };

        for (const token of tokens) {
            switch (token.type) {
                case TokenType.LEFT_CURLY_BRACKET:
                    curlyBrackets.left += 1;
                    break;
                case TokenType.RIGHT_CURLY_BRACKET:
                    curlyBrackets.right += 1;
                    break;
            }

            if (curlyBrackets.left > curlyBrackets.right) {
                return 'NESTED_MAP';
            }
        }

        /**
         * TODO
         * to find a less expensive way to check for leaflinks
         */
        if (
            curlyBrackets.left === curlyBrackets.right
        ) {
            return 'ROOT';
        }

        return;
    }

    private listIndex() {
        const tokens = this.tokens
            .slice(0, this.current)
            .reverse();

        if (tokens.length === 0) {
            return '0';
        }

        const curlyBrackets = {
            left: 0,
            right: 0,
        };
        const squareBrackets = {
            left: 0,
            right: 0,
        };

        const atListRoot = () => {
            if (
                curlyBrackets.left === curlyBrackets.right
                && squareBrackets.left === squareBrackets.right
            ) {
                return true;
            }

            return false;
        }

        let listIndex = -1;

        // console.log('listIndex tokens', tokens);
        // console.log('listIndex', listIndex);

        for (const token of tokens) {
            // console.log('token', token);
            // console.log('atListRoot()', atListRoot());

            switch (token.type) {
                case TokenType.LEFT_CURLY_BRACKET:
                    curlyBrackets.left += 1;
                    break;
                case TokenType.RIGHT_CURLY_BRACKET:
                    curlyBrackets.right += 1;
                    break;
            }

            if (atListRoot()) {
                listIndex += 1;
            }
        }

        // console.log('listIndex', listIndex);

        return listIndex + '';
    }
}
// #endregion module



// #region exports
export default Parser;
// #endregion exports
