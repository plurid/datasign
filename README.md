# datasign

File format specifying data signatures to be used as single source of truth in various pipelines


## A Web-Oriented Example

```
                                                Text.datasign
                                                    |
        _____________________________________________________________________________________
        |                                           |                                       |
    to TypeScript                                to GraphQL                             to Protocol Buffers/gRPC
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
        required User generatedBy = 2;
    }

    message User {
        required string id = 1;
        required string name = 2;
    }
```
