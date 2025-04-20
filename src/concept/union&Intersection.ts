// TypeScript Union and Intersection Types
// Union and intersection types are powerful features in 
// TypeScript that allow you to combine types in flexible ways. 
// They're particularly useful for creating complex type definitions while maintaining type safety.

// Union Types (|)
// Union types allow a value to be one of several types. They're defined using the pipe (|) operator.

// Union and intersection types are essential for creating flexible, type-safe interfaces in TypeScript applications. 
// They're particularly useful when working with APIs, state management, and component props in frontend frameworks.

//Union
type StringOrNumber = string | number;

function printId(id: StringOrNumber) {
    console.log(`Id is ${id}`);
}

printId("First");
printId(5);

interface ICircle {
    kind: "circle",
    radious: number,
}

interface ISquare {
    kind: "square",
    sideLength: number,
}

type Shape = ICircle | ISquare;

function getArea(object: Shape): number {
    switch (object.kind) {
        case "circle": {
            return Math.PI * object.radious * object.radious;
        }
        case "square": {
            return object.sideLength ** 2;
        }
    }
}

const myCircle: ICircle = { kind: "circle", radious: 5 }
const area = getArea(myCircle);
console.log(`Area of circle is ${area}`);


//Intersection
type Person = {
    name: string,
    age: number,
}

type Employee = {
    employeeId: number,
    department: string
}

type PersonEmployee = Person & Employee;

const employeePerson: PersonEmployee = {
    name: "Raj",
    age: 15,
    employeeId: 1254,
    department: "education"
}


type SuccessResponse<T> = {
    status: "success",
    data: T,
};

type FailedResponse = {
    status: "Failed",
    error: {
        message: string,
        code: number,
    }
}

type LoadingState = {
    status: "Loading",
};

type ApiResponse1<T> = SuccessResponse<T> | FailedResponse | LoadingState;

type IUser = {
    name: string,
    id: number,
}

function handleUserResponse(response: ApiResponse1<IUser>) {
    switch (response.status) {
        case "success": {
            return response.data
        }
        case "Failed": {
            return response.error
        }
        case "Loading": {
            return response.status
        }
    }
}