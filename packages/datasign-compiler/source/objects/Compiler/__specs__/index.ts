import DatasignCompiler from '../';
import {
    DatasignCompilerData,
} from '../../../data/interfaces';



describe('DatasignCompiler', () => {
    it('basic', () => {
        const data: DatasignCompilerData = {
//             source: `
// data Item {
//     id: string;
// }
//             `,
            source: `
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
                // 'graphql',
                // 'protobuf',
            ],
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

        // console.log('result', result);

        // expect(result.typescript).toBe('');
        expect('').toBe('');
    });
});
