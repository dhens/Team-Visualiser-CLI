// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
// × Can set GitHUb account via constructor (3ms)
// × getRole() should return "Engineer"
// × Can get GitHub username via getGithub()
const Employee = require('./Employee')

class Engineer extends Employee{
    constructor(name, id, email, github) {
        super(name, id, email);
        this.github = github;
    }
    getRole(){
        return "Engineer";
    }
    getGithub() {
        return this.github;
    }
}

new Engineer()

module.exports = Engineer;