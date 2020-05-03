// Employee class
class Employee {
    constructor(name, id, email) {

        if (!name) {
            throw new Error("You are missing the name.");
        }
        if (!id) {
            throw new Error("You are missing the id.");
        }
        if (!email) {
            throw new Error("You are missing the email.");
        }

        this.name = name;
        this.id = id;
        this.email = email;

    }

    getName() {
        return `${this.name}`;
    }

    getId() {
        return `${this.id}`;
    }

    getEmail() {
        return `${this.email}`;
    }

    getRole() {
        return `${this.constructor.name}`;
    }

};


module.exports = Employee;