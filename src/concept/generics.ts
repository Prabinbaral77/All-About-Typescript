// TypeScript Generics
// Generics are one of TypeScript's most powerful features, allowing you to create reusable 
// components that work with a variety of types rather than a single one. They help you build 
// flexible, type-safe code without sacrificing reusability.
// Generics are widely used in TypeScript frameworks and libraries to provide type safety while 
// maintaining flexibility - they're particularly useful for collections, promises, state management, and API interfaces.

// A function that works with any type Basic Generic Example
function identity<T>(arg: T): T {
    return arg;
}

// Usage
const stringResult = identity<string>("hello");  // type: string
const numberResult = identity(42);  // type inference works too: number

// Generic Interfaces and Classes
interface Box<T> {
    value: T,
    getValue(): T
}

class Container<T> implements Box<T> {
    constructor(public value: T) { }

    getValue(): T {
        return this.value;
    }
}

const stringBox = new Container("Hello world");
const numberBox = new Container(5);

//Generic Type Aliases with Multiple Types
type Pair<T, U> = {
    first: T,
    second: U,
};

const Pair: Pair<string, number> = {
    first: 'Hello world',
    second: 5
}

//Generic Default types
interface ApiResponse<T = any> {
    data: T,
    status: boolean,
    message: string,
};

const response: ApiResponse = {
    data: [1, 2, 3],
    status: true,
    message: "Data fetched"
}

const typedResponse: ApiResponse<string[]> = {
    data: ["one", "two"],
    status: true,
    message: "data fetched"
}

// Practical Usage Example - Generic Repository Pattern
interface Entity {
    id: number,
};

class Repository<T extends Entity> {
    private items: T[] = [];

    add(item: T): void {
        this.items.push(item);
    }

    getById(id: number): T | undefined {
        return this.items.find(item => item.id == id);
    }

    getAll(): T[] {
        return this.items;
    }
}


interface User extends Entity {
    id: number,
    name: string,
    email: string
}

const userRepo = new Repository<User>();

userRepo.add({ id: 5, name: "baral", email: "baral@gmail.com" })
const user = userRepo.getById(5);