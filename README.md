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


File format specifying data signatures to be used as single source of truth in various pipelines


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

    @entityID: TextEntity // assigns an ID to the type itself
    data Text {
        // type the `id` field to `ID` in GraphQL, and `string` for TypeScript/Protocol Buffers/gRPC
        @graphql: ID
        id: string;

        name: string;
        value: string;
        @graphql: Int
        characters: number;
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
```


``` typescript
    // Text.ts

    /**
     * @entityID: TextEntity
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
