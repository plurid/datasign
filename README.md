<p align="center">
    <img src="https://raw.githubusercontent.com/plurid/datasign/master/about/identity/datasign-logo-black.png" height="250px">
    <br />
    <a target="_blank" href="https://github.com/plurid/datasign/blob/master/LICENSE">
        <img src="https://img.shields.io/badge/license-MIT-blue.svg?colorB=1380C3&style=for-the-badge" alt="License: MIT">
    </a>
</p>



<h1 align="center">
    datasign
</h1>


File format specifying data signatures to be used as single source of (specified) truth in various pipelines.


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
    @entityID: TextEntity; // assigns an ID to the type itself
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
     * @entityID: TextEntity
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
    # @entityID: TextEntity
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

    // @entityID: TextEntity
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

add a script in `package.json`

```
    "datasign": "datasign /path/to/files"
```


### Programmatic

For programmatic usage, install the `@plurid/datasign` package with `npm` or `yarn` and write a similar code

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


## Types

### Primitives

    number
    boolean
    string

### Defaults

`number` will default to:

+ `Int` for `GraphQL`
+ `int32` for `Protocol Buffers`



## Annotations

### Entity

#### `entityID`

The ID of the entity


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
        @graphql: directive: deprecated: reason: "Use `newField`."
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
