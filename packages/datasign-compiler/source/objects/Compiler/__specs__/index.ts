import DatasignCompiler from '../';
import {
    DatasignCompilerData,
} from '../../../data/interfaces';



describe('DatasignCompiler', () => {
    it('basic', () => {
        const data: DatasignCompilerData = {
            source: `
                data Item {
                    id: string;
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
        `

        expect(result.typescript).toBe('');
    });
});
