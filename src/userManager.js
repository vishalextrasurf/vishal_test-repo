// User management utility
class UserManager {
    constructor() {
        this.users = [];
    }

    addUser(user) {
        if (!user || typeof user !== 'object') {
            throw new Error('User must be an object');
        }
        if (!user.name || !user.email) {
            throw new Error('User must have name and email');
        }
        if (typeof user.name !== 'string' || typeof user.email !== 'string') {
            throw new Error('Name and email must be strings');
        }
        if (!user.email.includes('@')) {
            throw new Error('Email must be valid');
        }
        this.users.push(user);
        return user;
    }

    findUser(email) {
        return this.users.find(user => user.email === email);
    }

    deleteUser(email) {
        const index = this.users.findIndex(user => user.email === email);
        if (index > -1) {
            return this.users.splice(index, 1)[0];
        }
        return null;
    }

    getAllUsers() {
        return [...this.users];
    }
}

module.exports = UserManager;
