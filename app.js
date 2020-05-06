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


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

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
                // write to file 'html renderer.js'
                // variable for above doc with 
                const exportHtml = render(teamMembers);
                // write file to team html
                outputPath.push(exportHtml);


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

                const exportHtml = render(teamMembers);
                outputPath.push(exportHtml);


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
            teamMembers.push(eng);

            if (response.teamMember === 'Engineer') {
                engineerPrompt();
            }
            if (response.teamMember === 'Intern') {
                internPrompt();
            }
            if (response.teamMember === 'I do not want to add any more team members') {
                console.log("You are done building your team.");

                const exportHtml = render(teamMembers);
                outputPath.push(exportHtml);

                return;
            }
        });
};

initialMgrPrompt();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
