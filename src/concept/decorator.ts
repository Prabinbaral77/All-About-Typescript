
// Class decorator (@LogClass) - Adds metadata to a class and modifies its prototype
// Method decorator (@LogMethod) - Wraps a method with additional functionality
// Property decorator (@LogProperty) - Modifies a property's behavior
// Parameter decorator (@LogParameter) - Annotates parameters of methods

// When run, this code will produce output showing when and how each decorator is applied, along with the logging behavior injected into the various parts of the class.
// Decorators are especially useful for:

// Dependency injection
// Logging and performance monitoring
// Access control and validation
// Memoization and caching
// Framework implementations (like Angular and NestJS)


// Decorator factory - returns the actual decorator function
function LogClass(message: string) {
    console.log(`Class decorator factory called with: ${message}`);

    // This is the actual decorator function
    return function (constructor: Function) {
        console.log(`Class decorator applied to: ${constructor.name}`);
        console.log(`Message: ${message}`);

        // We can modify the constructor or add properties
        constructor.prototype.decoratedWith = message;
    };
}

// Method decorator factory
function LogMethod(message: string) {
    console.log(`Method decorator factory called with: ${message}`);

    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        console.log(`Method decorator applied to: ${propertyKey}`);

        // Save the original method
        const originalMethod = descriptor.value;

        // Replace the method with our enhanced version
        descriptor.value = function (...args: any[]) {
            console.log(`Starting ${propertyKey} with arguments: ${JSON.stringify(args)}`);
            console.log(`Message: ${message}`);

            // Call the original method and get its result
            const result = originalMethod.apply(this, args);

            console.log(`Finished ${propertyKey} with result: ${result}`);
            return result;
        };

        return descriptor;
    };
}

// Property decorator
function LogProperty(target: any, propertyKey: string) {
    // Create a property getter
    let value: any;

    const getter = function () {
        console.log(`Getting property: ${propertyKey}`);
        return value;
    };

    const setter = function (newValue: any) {
        console.log(`Setting property: ${propertyKey} to ${newValue}`);
        value = newValue;
    };

    // Replace the property with our getter/setter
    Object.defineProperty(target, propertyKey, {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true
    });
}

// Parameter decorator
function LogParameter(target: any, methodName: string, paramIndex: number) {
    console.log(`Parameter decorator: ${methodName}, index: ${paramIndex}`);
}

// Using the decorators
@LogClass("User Management Class")
class UserService {
    @LogProperty
    public userId: number = 0;

    constructor(userId: number) {
        this.userId = userId;
    }

    @LogMethod("User validation method")
    validateUser(@LogParameter id: number, @LogParameter role: string): boolean {
        console.log(`Validating user with ID: ${id} and role: ${role}`);
        return id > 0 && role === 'admin';
    }
}

// Testing our decorated class
const userService = new UserService(123);
console.log("User ID:", userService.userId);
userService.userId = 456;
const isValid = userService.validateUser(456, 'admin');
console.log("Validation result:", isValid);




//output
// Method decorator factory called with: User validation method
// Parameter decorator: validateUser, index: 1
// Parameter decorator: validateUser, index: 0
// Method decorator applied to: validateUser
// Class decorator factory called with: User Management Class
// Class decorator applied to: UserService
// Message: User Management Class
// Setting property: userId to 0
// Setting property: userId to 123
// Getting property: userId
// User ID: 123
// Setting property: userId to 456
// Starting validateUser with arguments: [456,"admin"]
// Message: User validation method
// Validating user with ID: 456 and role: admin
// Finished validateUser with result: true
// Validation result: true