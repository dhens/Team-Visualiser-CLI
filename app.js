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

let teamArr = [];

function addUser() {
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
                            teamArr.push(new Manager(
                                reqQuestions.Name, 
                                reqQuestions.Id, 
                                reqQuestions.Email, 
                                res.officeNum));
                                shouldYouAddAnotherUser();
                        }); 
                    break;
                case 'Engineer':
                    inquirer.prompt([
                        {
                            type: 'input',
                            message: 'Enter your GitHub username',
                            name: 'github'
                        }]).then(function(res) {
                            console.log(`User entered: ${res.github}`);
                            teamArr.push(new Engineer(
                                reqQuestions.Name, 
                                reqQuestions.Id, 
                                reqQuestions.Email, 
                                res.github));
                                shouldYouAddAnotherUser();
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
                            teamArr.push(new Intern(
                                reqQuestions.Name, 
                                reqQuestions.Id, 
                                reqQuestions.Email, 
                                res.school));
                                shouldYouAddAnotherUser();
                        });
                    break;        
            }
    });
}
function shouldYouAddAnotherUser() {
    inquirer.prompt(
        [
            {
                type: "confirm",
                message: "Add another user?",
                name: 'addUsrQuestion'
            }
        ]
    ).then(function(res) {
        console.log(res.addUsrQuestion);
        if(res.addUsrQuestion) {
            addUser();
        } else {
            console.log(`Your team array consists of: ${JSON.stringify(teamArr)}`)
            let myrender = render(teamArr);
            fs.writeFile("team.html", render(teamArr), function(res, err) {
                if (err) {
                    throw err;
                }
                console.log("Successfully generated HTML! Exiting...");
            });
        }
    });
}
addUser();