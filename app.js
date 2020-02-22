const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");
const questions = 
    [
        {
            type: 'input',
            message: 'Enter your name:',
            name: 'Name'
        },
        {
            type: 'list',
            message: 'Enter your role:',
            choices: ['Manager', 'Engineer', 'Intern'],
            name: 'Role'
        },
        {
            type: 'input',
            message: 'Enter your email:',
            name: 'Email'
        },
        {
            type: 'input',
            message: 'Enter your ID number:',
            name: 'Id'
        }
    ];


inquirer.prompt(questions)
    .then(function(reqQuestions) {
        switch(reqQuestions.Role) {
            case 'Manager':
                inquirer.prompt([
                    {
                        type: 'input',
                        message: 'Enter your office number',
                        name: 'officeNum'
                    }])
                    .then(function(res) {
                        console.log(`User entered: ${res.officeNum}`);
                        new Manager(reqQuestions.name, reqQuestions.Id, reqQuestions.Email, res.officeNum);
                    })
                break;
            case 'Engineer':
                inquirer.prompt([
                    {
                        type: 'input',
                        message: 'Enter your GitHub username',
                        name: 'github'
                    }]).then(function(res) {
                        console.log(res, reqQuestions);
                        console.log(`User entered: ${res.github}`);
                        new Engineer(reqQuestions.name, reqQuestions.Id, reqQuestions.Email, res.github);
                    })
                break;
            case 'Intern':
                inquirer.prompt([
                    {
                        type: 'input',
                        message: 'Enter your school',
                        name: 'school'
                    }])
                    .then(function(res) {
                        console.log(`User entered: ${res.school}`);
                        new Intern(reqQuestions.name, reqQuestions.Id, reqQuestions.Email, res.school);
                    })
                break;        
            }
});