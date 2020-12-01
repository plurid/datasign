<p align="center">
    <img src="https://raw.githubusercontent.com/plurid/datasign/master/about/identity/datasign-logo.png" height="250px">
    <br />
    <br />
    <a target="_blank" href="https://github.com/plurid/datasign/blob/master/LICENSE">
        <img src="https://img.shields.io/badge/license-DEL-blue.svg?colorB=1380C3&style=for-the-badge" alt="License: DEL">
    </a>
</p>



<h1 align="center">
    datasign
</h1>


<h3 align="center">
    Single Source of Truth Data Contract Specifier
</h3>



<br />



`datasign` is a file format to describe data contract signatures to be used as a single source of (specified) truth to generate files for various pipelines.

Supported specification targets:

+ `GraphQL`
+ `Protocol Buffers`
+ `TypeScript`


### Contents

+ [A Web-Oriented Example](#a-web-oriented-example)
+ [Usage](#usage)
    + [Command-Line Interface](#command-line-interface)
    + [One-Time Compilation](#one-time-compilation)
    + [Programmatic](#programmatic)
+ [Syntax](#syntax)
    + [General](#general)
    + [Annotating](#annotating)
    + [Commenting](#commenting)
    + [Importing](#importing)
    + [Metas](#metas)
+ [Types](#types)
    + [Primitives](#primitives)
    + [Defaults](#defaults)
    + [Composed](#composed)
+ [Annotations](#annotations)
    + [Entity](#entity)
    + [Field](#field)
+ [Packages](#packages)
+ [Codeophon](#codeophon)



## A Web-Oriented Example

```
                                    Text.datasign
                                        |
    _________________________________________________________________________
    |                                   |                                   |
    to TypeScript                     to GraphQL                          to Protocol Buffers/gRPC
    Text.ts                           Text.graphql                        Text.proto
```


``` datasign
// Text.datasign

/*
 * Text Documentation
 */
Text {
    // type the `id` field to `ID` for GraphQL, and `string` for TypeScript/Protocol Buffers/gRPC
    @graphql ID
    id string

    name string
    value string
    @graphql Int
    characters number
    public boolean

    @graphql Date
    @proto number
    generatedAt Date // assumes Date is already defined somewhere else/globally
    generatedBy User
}

User {
    id string
    name string
}
```


``` typescript
// Text.ts

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


``` proto
// Text.proto

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

### Command-Line Interface

```
Usage: datasign <files>

Options:
  -v, --version            output the version number
  -t, --target <type>      compilation targets: typescript, graphql, proto (default: "typescript,graphql,proto")
  -o, --output <path>      output path (default: ".")
  -r, --resolve <type>     resolve the output path relative to the "file" directory, "process" directory, or "flatten" into the output path (default: "file")
  -c, --comments [value]   compile the comments into the target files (default: false)
  -s, --spacing <value>    indentation spacing to be used in the compiled files (default: "4")
  -p, --preserve [value]   preserve new lines spacing of the datasign file (default: false)
  -g, --generated [value]  inject a header in each generated file mentioning the source (default: true)
  -h, --help               display help for command
```


For scripting usage, run in your package the command

``` bash
npm install @plurid/datasign
```

or

``` bash
yarn add @plurid/datasign
```

and add a script in `package.json`

``` json
// .json

{
    "scripts": {
        "datasign": "datasign /path/to/files"
    }
}
```


### One-Time Compilation

For a simple compilation, create the `.datasign` files, e.g. `Message.datasign`:

``` datasign
// .datasign

Message {
    id string
    value string
}
```

and run the command pointing to the files location

``` bash
npx @plurid/datasign ./Message.datasign
```


### Programmatic

For programmatic usage, install the `@plurid/datasign` package with `npm` or `yarn` and use in a similar manner

``` typescript
// .ts

import {
    DatasignLoader,
} from '@plurid/datasign';

async function main() {
    const datasignLoader = new DatasignLoader('/path/to/file');

    const graphql = await datasignLoader.load('graphql');
    // `graphql` contains the types string

    const proto = await datasignLoader.load('proto');
    // `proto` contains the messages string

    const typescript = await datasignLoader.load('typescript');
    // `typescript` contains the types namespace
}

main();
```



## Syntax

### General

A `datasign` file uses the `.datasign` extension, is conventionally named using `PascalCase`, and is composed of one or more `Datasign Entities`.

A `Datasign Entity` is constituted by a `Name`, and a pair of braces `{`, `}`, signifying the start, respectively, the end, of the `Datasign Fields` section.

A `Datasign Field` is a `key type` pair, incremented with `2` or `4` spaces.

Each `Datasign Field` should be on a new line.

example:

``` datasign
// .datasign

Name {
    namedKeyOne string
    namedKeyTwo number
}
```


### Annotating

The `Datasign Entities` and the `Data Fields` can be annotated using the `@` symbol.

The [annotations](#annotations) allow for target-specific alterations of the compiled files.

Each `Datasign Annotation` should be on a new line.

`Datasign Annotations` 'stack' on top of each other and affect the next available `Datasign Entity` or `Datasign Field`.


### Commenting

A comment is specified using the double slash (`//`) and can be on it's own line or either inlined.

example:

``` datasign
// .datasign

// this is a valid comment
Message { // this is also valid
    id string
    // other fields
}
```

For documentation purposes the documentation comment symbols `/*` paired with `*/` can be used.

example:

``` datasign
// .datasign

/*
 * Documentation for the Message Entity.
 */
// this is a valid comment
Message { // this is also valid
    /*
     * Documentation for the id field.
     */
    id string
    // other fields
}
```


### Importing

A `.datasign` file can import data signatures from another `.datasign` file. The import can be namespaced or extracted. The `.datasign` filename extension is not required in the import statement.

``` datasign
// a.datasign
SomeData {
    one string
}
```

``` datasign
// b.datasign

// namespaced import
import A from ./path/to/a

// extracted import
import {
    SomeData
} from ./path/to/a

SomeOtherData {
    two A.SomeData
    three SomeData
}
```


### Metas

Metas allow the insertion of specific data for each individual target.

``` datasign
// .datasign

!proto `
    // this text will be inserted only in the compiled .proto file
`

!graphql `
    // this text will be inserted only in the compiled .graphql file
`

!typescript `
    // this text will be inserted only in the compiled .ts file
`
```



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

### Composed

A type can be composed with another using parantheses, `(` and `)`, and, `&`, or, `|`, equal, `=`, operators.

``` datasign
// .datasign

A {
    b string
}

B = A & {
    c string
}

C = A | B

D = (A | B) & {
    e string
}
```


## Annotations


Allowed `Datasign Entity` annotations:

+ `graphql`
+ `proto`
+ `typescript`

Allowed `Datasign Field` annotations:

+ `graphql`
+ `proto`
+ `typescript`


### Entity

#### `@typescript`

##### `export`

To export or no the compiled interface.

default: `true`

example:

``` datasign
// .datasign
@typescript export false
Message {
    // fields
}
```

compiles to

``` typescript
// .ts
interface Message {
    // fields
}
```


#### `@graphql`

##### `kind`

The `GraphQL` kind of the compiled `GraphQL` data structure.

values: `type` | `input` | `type-input`

default: `type`

example:

``` datasign
// .datasign
@graphql kind input
Message {
    // fields
}
```

which is equivalent to

``` datasign
// .datasign
@graphql input
Message {
    // fields
}
```

compiles to

``` graphql
# .graphql
input Message {
    # fields
}
```

or multi-kind

``` datasign
// .datasign
@graphql type-input
Message {
    // fields
}
```

compiles to

``` graphql
# .graphql

type Message {
    # fields
}

input Message {
    # fields
}
```



### Field

#### `@graphql`

##### `type`

The `GraphQL` type of the compiled `GraphQL` field.

example:

``` datasign
Message {
    @graphql type ID
    id string
}
```

which is equivalent to

``` datasign
Message {
    @graphql ID
    id string
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

``` datasign
Message {
    newField string

    // the `deprecated` directive needs to be provided to the graphql schema
    @graphql directive deprecated reason "Use `newField`."
    oldField string
}
```

compiles to

``` graphql
type Message {
    newField: String!
    oldField: String! @deprecated(reason: "Use `newField`.")
}
```


#### `@proto`

##### `type`

The `Protocol Buffers` type of the compiled `Protocol Buffers` field.

example:

``` datasign
Count {
    @proto type int64
    value number
}
```

which is equivalent to

``` datasign
Count {
    @proto int64
    value number
}
```

compiles to

``` proto
message Count {
    required int64 value = 1;
}
```



## Packages

<a target="_blank" href="https://www.npmjs.com/package/@plurid/datasign">
    <img src="https://img.shields.io/npm/v/@plurid/datasign.svg?logo=npm&colorB=1380C3&style=for-the-badge" alt="Version">
</a>

[@plurid/datasign-javascript][datasign-javascript] • `JavaScript`/`TypeScript` implementation

[datasign-javascript]: https://github.com/plurid/datasign/tree/master/packages/datasign-javascript


<a target="_blank" href="https://github.com/plurid/datasign/tree/master/packages/datasign-grammar/vscode">
    <img src="https://img.shields.io/badge/vscode-v.0.0.4-1380C3?style=for-the-badge" alt="Version">
</a>

[@plurid/datasign-grammar][datasign-grammar] • grammar for text editors (syntax highlighting, syntax verification)

[datasign-grammar]: https://github.com/plurid/datasign/tree/master/packages/datasign-grammar



## [Codeophon](https://github.com/ly3xqhl8g9/codeophon)

+ licensing: [delicense](https://github.com/ly3xqhl8g9/delicense)
+ versioning: [αver](https://github.com/ly3xqhl8g9/alpha-versioning)
