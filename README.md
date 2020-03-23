<p align="center">
    <img src="https://raw.githubusercontent.com/plurid/datasign/master/about/identity/datasign-logo.png" height="250px">
    <br />
    <a target="_blank" href="https://github.com/plurid/datasign/blob/master/LICENSE">
        <img src="https://img.shields.io/badge/license-MIT-blue.svg?colorB=1380C3&style=for-the-badge" alt="License: MIT">
    </a>
</p>



<h1 align="center">
    datasign
</h1>


File format specifying data signatures to be used as single source of (specified) truth in various pipelines.


+ [A Web-Oriented Example](#a-web-oriented-example)
+ [Usage](#usage)
    + [One-Time Compilation](#one-time-compilation)
    + [Script](#script)
    + [Programmatic](#programmatic)
+ [Syntax](#syntax)
+ [Types](#types)
    + [Primitives](#primitives)
    + [Defaults](#defaults)
+ [Annotations](#annotations)
    + [Entity](#entity)
    + [Field](#field)
+ [Packages](#packages)



## A Web-Oriented Example

```
                                                Text.datasign
                                                    |
        _____________________________________________________________________________________
        |                                           |                                       |
    to TypeScript                               to GraphQL                              to Protocol Buffers/gRPC
    Text.ts                                     Text.graphql                            Text.proto
```


```
    // Text.datasign

    /**
     * Text Documentation
     */
    @sign: TextEntity; // assigns an identification sign to the data type
    data Text {
        // type the `id` field to `ID` in GraphQL, and `string` for TypeScript/Protocol Buffers/gRPC
        @graphql: ID;
        id: string;

        name: string;
        value: string;
        @graphql: Int;
        characters: number;
        public: boolean;

        @graphql: Date;
        @protobuf: number;
        generatedAt: Date;
        generatedBy: User;
    }

    data User {
        id: string;
        name: string;
    }
```


``` typescript
    // Text.ts

    /**
     * @sign: TextEntity
     */
    /**
     * Text Documentation
     */
    export interface Text {
        id: string;
        name: string;
        value: string;
        characters: number;
        public: boolean;
        generatedAt: Date;
        generatedBy: User;
    }

    export interface User {
        id: string;
        name: string;
    }
```


``` graphql
    # Text.graphql

    #
    # Text Documentation
    #
    # @sign: TextEntity
    type Text {
        id: ID!
        name: String!
        value: String!
        characters: Int!
        public: Boolean!
        generatedAt: Date!
        generatedBy: User!
    }

    type User {
        id: String!
        name: String!
    }
```


``` protobuf
    // Text.proto

    // @sign: TextEntity
    /**
     * Text Documentation
     */
    message Text {
        required string id = 1;
        required string name = 2;
        required string value = 3;
        required number characters = 4;
        required boolean public = 5;
        required number generatedAt = 6;
        required User generatedBy = 7;
    }

    message User {
        required string id = 1;
        required string name = 2;
    }
```



## Usage

Command-Line Interface options:

```
-v, --version           output the version number
-t, --target <type>     compilation targets: typescript, graphql, protobuf (default: "typescript,graphql,protobuf")
-o, --output <path>     output path (default: ".")
-r, --resolve <type>    resolve the output path relative to "file" directory, "process" directory, or "flatten" into the output path (default: "file")
-c, --comments          compile the comments into the target files (default: false)
-s, --spacing <value>   indentation spacing to be used in the compiled files (default: "4")
-p, --preserve <value>  preserve new lines spacing of the datasign file (default: false)
-h, --help              display help for command
```


### One-Time Compilation

For a simple compilation, create a `.datasign` file, e.g. `Message.datasign`:

```
data Message {
    id: string;
    value: string;
}
```

and run the command pointing to the file's location

```
npx @plurid/datasign ./Message.datasign
```


### Script

For scripting usage, run in your package the command

```
npm install @plurid/datasign
```

or

```
yarn add @plurid/datasign
```

and add a script in `package.json`

```
"datasign": "datasign /path/to/files"
```


### Programmatic

For programmatic usage, install the `@plurid/datasign` package with `npm` or `yarn` and use in a similar manner

``` typescript
import {
    DatasignLoader,
} from '@plurid/datasign';

async function main() {
    const datasignLoader = new DatasignLoader('/path/to/file');

    const graphql = await datasignLoader.load('graphql');
    // graphql contains the types string

    const protobuf = await datasignLoader.load('protobuf');
    // protobuf contains the messages string

    const typescript = await datasignLoader.load('typescript');
    // typescript contains the types namespace
}

main();
```



## Syntax

A `datasign` file uses the `.datasign` extension, is conventionally named using `PascalCase`, and is composed of one or more `Datasign Entities`.

A `Datasign Entity` is constituted by the `data` keyword, a `Name`, and a pair of braces `{`, `}`, signifying the start, respectively, the end, of the `Datasign Fields` section.

A `Datasign Field` is a `key: type` pair, incremented with `2` or `4` spaces.

Each `Datasign Field` should be on a new line. A `Datasign Field` should end with a semicolon (`;`);

example:

```
data Name {
    namedKeyOne: string;
    namedKeyTwo: number;
}
```

The `Datasign Entities` and the `Data Fields` can be annotated using the `@` symbol.

The [annotations](#annotations) allow for target-specific alterations of the compiled files.

Each `Datasign Annotation` should be on a new line. A `Datasign Annotation` should end with a semicolon (`;`);

`Datasign Annotations` 'stack' on top of each other and affect the next available `Datasign Entity` or `Datasign Field`.



## Types

### Primitives

+ `number`
+ `boolean`
+ `string`

### Defaults

+ `number` will default to:
    + `Int` for `GraphQL`
    + `int32` for `Protocol Buffers`
    + `number` for `Typescript`

+ `boolean` will default to:
    + `Boolean` for `GraphQL`
    + `bool` for `Protocol Buffers`
    + `boolean` for `Typescript`

+ `string` will default to:
    + `String` for `GraphQL`
    + `string` for `Protocol Buffers`
    + `string` for `Typescript`



## Annotations


Allowed `Datasign Entity` annotations:

+ `sign`
+ `graphql`
+ `protobuf`
+ `typescript`

Allowed `Datasign Field` annotations:

+ `graphql`
+ `protobuf`
+ `typescript`


### Entity

#### `sign`

The identification `sign` of the entity. If not specified, the `sign` is generated at compile-time.

example:

```
@sign: random-generated-string
data AnEntity {
    // datasign fields
}
```


#### `@typescript`

##### `export`

To export or no the compiled interface.

default: `true`

example:

```
@typescript: export: false;
data Message {
    // fields
}
```

compiles to

``` typescript
interface Message {
    // fields
}
```


#### `@graphql`

##### `type`

The `GraphQL` type of the compiled `GraphQL` data structure.

default: `type`

example:

```
@graphql: type: input;
data Message {
    // fields
}
```

which is equivalent to

```
@graphql: input;
data Message {
    // fields
}
```

compiles to

``` graphql
input Message {
    // fields
}
```


### Field

#### `@graphql`

##### `type`

The `GraphQL` type of the compiled `GraphQL` field.

example:

```
data Message {
    @graphql type: ID;
    id: string;
}
```

which is equivalent to

```
data Message {
    @graphql ID;
    id: string;
}
```

compiles to

``` graphql
type Message {
    id: ID!
}
```


##### `directive`

Adds the directive to the `GraphQL` field. The directive needs to be provided in the `GraphQL` schema.

example:

```
data Message {
    newField: string;

    // the `deprecated` directive needs to be provided to the graphql schema
    @graphql: directive: deprecated: reason: "Use `newField`.";
    oldField: string;
}
```

compiles to

```
type Message {
    newField: String!
    oldField: String! @deprecated(reason: "Use `newField`.")
}
```


#### `@graphql`

##### `type`

The `Protocol Buffers` type of the compiled `Protocol Buffers` field.

example:

```
data Count {
    @protobuf type: int64;
    value: number;
}
```

which is equivalent to

```
data Count {
    @protobuf int64;
    value: number;
}
```

compiles to

``` protobuf
message Count {
    required int64 value = 1;
}
```



## Packages


<a target="_blank" href="https://www.npmjs.com/package/@plurid/datasign">
    <img src="https://img.shields.io/npm/v/@plurid/datasign.svg?logo=npm&colorB=1380C3&style=for-the-badge" alt="Version">
</a>

[@plurid/datasign][datasign] • the CLI application and package to be imported for scripting/programmatic usage

[datasign]: https://github.com/plurid/datasign/tree/master/packages/datasign


<a target="_blank" href="https://www.npmjs.com/package/@plurid/datasign-compiler">
    <img src="https://img.shields.io/npm/v/@plurid/datasign-compiler.svg?logo=npm&colorB=1380C3&style=for-the-badge" alt="Version">
</a>

[@plurid/datasign-compiler][datasign-compiler] • the compiler used in the main `datasign` package

[datasign-compiler]: https://github.com/plurid/datasign/tree/master/packages/datasign-compiler


[@plurid/datasign-grammar][datasign-grammar] • grammar for text editors (syntax highlighting, syntax verification)

[datasign-grammar]: https://github.com/plurid/datasign/tree/master/packages/datasign-grammar
