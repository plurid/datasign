import path from 'path';
import {
    promises as fs,
} from 'fs';

import {
    targets,
} from '../../data/constants';

import {
    Target,
    DatasignEntity,
} from '../../data/interfaces';

import {
    parseSource,

    generateGraphql,
    generateProtobuf,
    generateTypescript,
} from '../../services/logic';

import {
    isDatasignText,
} from '../../services/utilities';



class Loader {
    private source: string;
    private parsedSource: DatasignEntity[] = [];

    constructor(
        source: string,
    ) {
        this.source = source;
    }

    async load(
        target: Target,
    ) {
        if (!isDatasignText(this.source) && this.parsedSource === []) {
            try {
                const filepath = path.join(process.cwd(), this.source);
                const content = await fs.readFile(filepath, 'utf-8');
                this.source = content;
                this.parsedSource = parseSource(this.source);
            } catch (error) {
                console.log('File not found.');
            }
        }

        if (this.parsedSource === []) {
            this.parsedSource = parseSource(this.source);
        }

        switch (target) {
            case targets.graphql:
                return generateGraphql(this.parsedSource);
            case targets.protobuf:
                return generateProtobuf(this.parsedSource);
            case targets.typescript:
                return generateTypescript(this.parsedSource);
        }
    }
}


export default Loader;
