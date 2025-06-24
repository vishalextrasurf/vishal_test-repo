const UserManager = require('./userManager');

describe('UserManager Tests', () => {
    let userManager;

    beforeEach(() => {
        userManager = new UserManager();
    });

    test('should add valid user', () => {
        const user = { name: 'John Doe', email: 'john@example.com' };
        const result = userManager.addUser(user);
        expect(result).toEqual(user);
        expect(userManager.getAllUsers()).toHaveLength(1);
    });

    test('should throw error for invalid user', () => {
        expect(() => userManager.addUser(null)).toThrow('User must be an object');
        expect(() => userManager.addUser({ name: 'John' })).toThrow('User must have name and email');
        expect(() => userManager.addUser({ name: 'John', email: 'invalid-email' })).toThrow('Email must be valid');
    });

    test('should find user by email', () => {
        const user = { name: 'Jane Doe', email: 'jane@example.com' };
        userManager.addUser(user);
        
        const found = userManager.findUser('jane@example.com');
        expect(found).toEqual(user);
        
        const notFound = userManager.findUser('nonexistent@example.com');
        expect(notFound).toBeUndefined();
    });

    test('should delete user', () => {
        const user = { name: 'Bob Smith', email: 'bob@example.com' };
        userManager.addUser(user);
        
        const deleted = userManager.deleteUser('bob@example.com');
        expect(deleted).toEqual(user);
        expect(userManager.getAllUsers()).toHaveLength(0);
        
        const notDeleted = userManager.deleteUser('nonexistent@example.com');
        expect(notDeleted).toBeNull();
    });
});
