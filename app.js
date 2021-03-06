const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const teamMembers = [];


function initialMgrPrompt() {
    return inquirer.prompt([
        {
            type: "input",
            name: "managerName",
            message: "What is the Manager's name?"
        },
        {
            type: "number",
            name: "managerID",
            message: "What is the Manager's ID?"
        },
        {
            type: "input",
            name: "managerEmail",
            message: "What is the Manager's email address?"
        },
        {
            type: "number",
            name: "managerOfficeNumber",
            message: "What is the Manager's office number?"
        },
        {
            type: "list",
            name: "teamMember",
            message: "What type of team member would you like to add?",
            choices: ['Engineer', 'Intern', 'I do not want to add any more team members']
        }
    ])
        .then(function (response) {
            // save response
            // constructors
            const mgr = new Manager(response.managerName, response.managerID, response.managerEmail, response.managerOfficeNumber);
            // save globally into array;
            teamMembers.push(mgr);

            if (response.teamMember === 'Engineer') {
                engineerPrompt();
            }
            if (response.teamMember === 'Intern') {
                internPrompt();
            }
            if (response.teamMember === 'I do not want to add any more team members') {
                console.log("You are done building your team.");
                // render to html here
                renderHtml();
                return;
            }
        });

};

function engineerPrompt() {
    return inquirer.prompt([
        {
            type: "input",
            name: "engineerName",
            message: "What is the Engineer's name?"
        },
        {
            type: "number",
            name: "engineerID",
            message: "What is the Engineer's ID?"
        },
        {
            type: "input",
            name: "engineerEmail",
            message: "What is the Engineer's email address?"
        },
        {
            type: "input",
            name: "gitHubUN",
            message: "What is the Engineer's GitHub username?"
        },
        {
            type: "list",
            name: "teamMember",
            message: "What type of team member would you like to add?",
            choices: ['Engineer', 'Intern', 'I do not want to add any more team members']
        }
    ])
        .then(function (response) {


            const eng = new Engineer(response.engineerName, response.engineerID, response.engineerEmail, response.gitHubUN);
            teamMembers.push(eng);


            if (response.teamMember === 'Engineer') {
                engineerPrompt();
            }
            if (response.teamMember === 'Intern') {
                internPrompt();
            }
            if (response.teamMember === 'I do not want to add any more team members') {
                console.log("You are done building your team.");
                renderHtml();
                return;
            }
        });
};

function internPrompt() {
    return inquirer.prompt([
        {
            type: "input",
            name: "internName",
            message: "What is the intern's name?"
        },
        {
            type: "number",
            name: "internID",
            message: "What is the intern's ID?"
        },
        {
            type: "input",
            name: "internEmail",
            message: "What is the intern's email address?"
        },
        {
            type: "input",
            name: "internSchool",
            message: "What is the intern's School?"
        },
        {
            type: "list",
            name: "teamMember",
            message: "What type of team member would you like to add?",
            choices: ['Engineer', 'Intern', 'I do not want to add any more team members']
        },
    ])
        .then(function (response) {

            const intrn = new Intern(response.internName, response.internID, response.internEmail, response.internSchool);
            teamMembers.push(intrn);

            if (response.teamMember === 'Engineer') {
                engineerPrompt();
            }
            if (response.teamMember === 'Intern') {
                internPrompt();
            }
            if (response.teamMember === 'I do not want to add any more team members') {
                console.log("You are done building your team.");
                renderHtml();
                return;
            }
        });
};



function renderHtml() {
    const exportHtml = render(teamMembers);
    fs.writeFile(outputPath, exportHtml, function (err) {
        if (err) throw err;
    });
};

initialMgrPrompt();
