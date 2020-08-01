const inquirer = require("inquirer");
const fs = require("fs");
const engineer = require("./lib/engineer");
const intern = require("./lib/intern");
const manager = require("./lib/manager");

const employees = [];

function addMember() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter team member's name"
        },
        {
            type: "checkbox",
            name: "role",
            message: "Select team member's role",
            choices: [
                "engineer",
                "intern",
                "manager",
            ]
        },
        {
            type: "input",
            name: "id",
            message: "Enter team member's id",
        },
        {
            type: "input",
            name: "email",
            message: "Enter team member's email address",
        }])

        .then(function ({name, role, id, email}) {
            let roleInfo = "";
            if (role === "engineer") {
                roleInfo = "Enter team member's Github username";
            } else if (role === "intern") {
                roleInfo = "Enter team member's school name";
            } else {
                roleInfo = "Enter team member's office phone number";
            }
            inquirer.prompt([{
                type: "input",
                name: "roleInfo",
                message: roleInfo,
            },
            {
                type: "checkbox",
                name: "moreMembers",
                message: "Would you like to add any more team members?",
                choices: [
                    "yes",
                    "no"
                ],
            }])

                .then(function ({ roleInfo, moreMembers }) {
                    let newMember;
                    if (role === "Engineer") {
                        newMember = new engineer(name, id, email, roleInfo);
                    } else if (role === "Intern") {
                        newMember = new intern(name, id, email, roleInfo);
                    } else {
                        newMember = new manager(name, id, email, roleInfo);
                    }
                    employees.push(newMember);
                    addHtml(newMember)
                        .then(function () {
                            if (moreMembers === "yes") {
                                addMember();
                            } else {
                                finishHtml();
                            }
                        });
                });
        });
}

function startHTML() {
    const html = `<!DOCTYPE html>
    <html lang=\"en"\>
    <head>
        <meta charset=\"UTF-8"\ />
        <meta name=\"viewport"\ content=\"width=device-width, initial-scale=1.0"\ />
        <meta http-equiv=\"X-UA-Compatable"\ content=\"ie=edge"\ />
        <link rel=\"stylesheet"\ href=\"https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"\ integrity=\"sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"\ crossorigin=\"anonymous"\ />
        <title>Team Profile</title>
    </head>
    <body>
        <nav class=\"navbar navbar-dark bg-dark mb-5"\>
            <span class=\"navbar-brand mb-0 h1 w-100 text-center"\>Team Profile</span>
        </nav>
        <div class=\"container"\>
            <div class=\"row"\>`;
    fs.writeFile("./output/team.html", html, function (err) {
        if (err) {
            console.log(err);
        }
    });
    console.log("start");
}

function addHtml(member) {
    return new Promise(function (resolve, reject) {
        const name = member.getName();
        const role = member.getRole();
        const id = member.getId();
        const email = member.getEmail();
        let data = "";
        if (role === "Engineer") {
            const gitHub = member.getGithub();
            data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${name}<br /><br />Engineer</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: ${email}</li>
                <li class="list-group-item">GitHub: ${gitHub}</li>
            </ul>
            </div>
            </div>`;
        } else if (role === "Intern") {
            const school = member.getSchool();
            data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${name}<br /><br />Intern</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: ${email}</li>
                <li class="list-group-item">School: ${school}</li>
            </ul>
            </div>
            </div>`;
        } else {
            const officePhone = member.getOfficePhone();
            data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${name}<br /><br />Manager</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: ${email}</li>
                <li class="list-group-item">Office Phone: ${officePhone}</li>
            </ul>
            </div>
            </div>`
        }
        console.log("adding team member");
        fs.appendFile("./output/team.html", data, function (err) {
            if (err) {
                return reject(err);
            };
            return resolve();
        });
    });
}

function finishHtml() {
    const html = ` </div>
    </div>
    </body>
    </html>`;

    fs.appendFile("./output/team.html", html, function (err) {
        if (err) {
            console.log(err);
        };
    });
    console.log("end");
}

startHTML();
addMember();
finishHtml();
