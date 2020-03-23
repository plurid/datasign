import DatasignCompiler from '../';
import {
    DatasignCompilerData,
} from '../../../data/interfaces';



describe('DatasignCompiler - compile to graphql', () => {
    it('simply compiles to graphql', () => {
        const source = `
data Message {
    id: string;
    value: string;
    length: number;
    read: boolean;
}`;
        const data: DatasignCompilerData = {
            source,
            targets: ['graphql'],
            // options: {
            //     preserveSpacing: true,
            // },
        };
        const compiler = new DatasignCompiler(data);
        const result = compiler.compile();
        const compilation =
            'type Message {\n' +
            '    id: String!\n' +
            '    value: String!\n' +
            '    length: Int!\n' +
            '    read: Boolean!\n' +
            '}\n';

        // console.log('----');
        // console.log('result', result);
        // console.log('----');
        // console.log('compilation', compilation);
        // console.log('----');

        expect(compilation).toStrictEqual(result.graphql);
    });

    it('compiles with input entity annotation', () => {
        const source = `
@graphql: input;
data Message {
    id: string;
    value: string;
    length: number;
    read: boolean;
}`;
        const data: DatasignCompilerData = {
            source,
            targets: ['graphql'],
            // options: {
            //     preserveSpacing: true,
            // },
        };
        const compiler = new DatasignCompiler(data);
        const result = compiler.compile();
        const compilation =
            'input Message {\n' +
            '    id: String!\n' +
            '    value: String!\n' +
            '    length: Int!\n' +
            '    read: Boolean!\n' +
            '}\n';

        // console.log('----');
        // console.log('result', result);
        // console.log('----');
        // console.log('compilation', compilation);
        // console.log('----');

        expect(compilation).toStrictEqual(result.graphql);
    });

    it.only('compiles with directive field annotation', () => {
        const source = `
data Message {
    newField: string;

    @graphql: directive: deprecated: reason: "Use \`newField\`.";
    oldField: string;
}`;
        const data: DatasignCompilerData = {
            source,
            targets: ['graphql'],
            // options: {
            //     preserveSpacing: true,
            // },
        };
        const compiler = new DatasignCompiler(data);
        const result = compiler.compile();
        const compilation =
            'type Message {\n' +
            '    newField: String!\n' +
            '    oldField: String! @deprecated(reason: "Use `newField`.")\n' +
            '}\n';

        // console.log('----');
        // console.log('result', result);
        // console.log('----');
        // console.log('compilation', compilation);
        // console.log('----');

        expect(compilation).toStrictEqual(result.graphql);
    });
});


describe('DatasignCompiler - compile to protobuf', () => {
    it('simply compiles to protobuf', () => {
        const source = `
data Message {
    id: string;
    value: string;
    length: number;
    read: boolean;
}`;
        const data: DatasignCompilerData = {
            source,
            targets: ['protobuf'],
            // options: {
            //     preserveSpacing: true,
            // },
        };
        const compiler = new DatasignCompiler(data);
        const result = compiler.compile();
        const compilation =
            'message Message {\n' +
            '    required string id = 1;\n' +
            '    required string value = 2;\n' +
            '    required int32 length = 3;\n' +
            '    required bool read = 4;\n' +
            '}\n';

        // console.log('----');
        // console.log('result', result);
        // console.log('----');
        // console.log('compilation', compilation);
        // console.log('----');

        expect(compilation).toStrictEqual(result.protobuf);
    });
});


describe('DatasignCompiler - compile to typescript', () => {
    it('simply compiles to typescript', () => {
        const source = `
data Message {
    id: string;
    value: string;
    length: number;
    read: boolean;
}`;
        const data: DatasignCompilerData = {
            source,
            targets: ['typescript'],
            // options: {
            //     preserveSpacing: true,
            // },
        };
        const compiler = new DatasignCompiler(data);
        const result = compiler.compile();
        const compilation =
            'export interface Message {\n' +
            '    id: string;\n' +
            '    value: string;\n' +
            '    length: number;\n' +
            '    read: boolean;\n' +
            '}\n';

        // console.log('----');
        // console.log('result', result);
        // console.log('----');
        // console.log('compilation', compilation);
        // console.log('----');

        expect(compilation).toStrictEqual(result.typescript);
    });

    xit('basic', () => {
        const data: DatasignCompilerData = {
//             source: `
// data Item {
//     id: string;
// }
//             `,
            source: `
/**
 * Documentation comments
 */
// entity comment
// on multiline
@entityID: TextEntity // assigns an ID to the type itself
data Text {
    // type the 'id' field to 'ID' in GraphQL, and 'string' for TypeScript/Protocol Buffers/gRPC
    @graphql: ID
    id: string;

    name: string;
    value: string;
    @graphql: Int
    characters?: number;
    public: boolean;

    @graphql: Date
    @protobuf: number
    generatedAt: Date;
    generatedBy: User;
}

data User {
    id: string;
    name: string;
}
            `,
            targets: [
                'typescript',
                'graphql',
                'protobuf',
            ],
            options: {
                comments: true,
                preserveSpacing: true,
            },
        };
        const compiler = new DatasignCompiler(data);
        const result = compiler.compile();
        const expectedTypescript = `
export interface Item {
    id: string;
}
        `;
        const expectedGraphql = `
type Item {
    id: String!
}
        `;
        const expectedProtobuf = `
message Item {
    required string id = 1;
}
        `;

        console.log('result', result);

        // expect(result.typescript).toBe('');
        expect('').toBe('');
    });
});
