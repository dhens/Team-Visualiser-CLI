// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
// × Can set school via constructor (1ms)
// × getRole() should return "Intern"
// × Can get school via getSchool() (1ms)
const Employee = require('./Employee')

class Intern extends Employee{
    constructor(name, id, email, school) {
        super(name, id, email);
        this.school = school;
    }

    getRole() {
        return "Intern";
    }

    getSchool() {
        return this.school;
    }
}

module.exports = Intern;