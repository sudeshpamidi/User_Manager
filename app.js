const os = require('os');
const logger = require('logger').createLogger('log.txt');
const yargs = require('yargs');

var appUser = os.userInfo();

const users = require('./users');

var command = process.argv[2];
var args = yargs.argv;

username = args.username;
password = args.password;
email = args.email;

var logStatus = 'Failure';
var logMsg = '';
console.log(command);

if (command.match(/-/g) || command === undefined) {
    console.log('Command not found');
} else {

    switch (command) {
        case 'create':
            users.inserUser(username, password, email);
            break;

        case 'read':

            var user = users.getUser(username);
            logStatus = 'Success';
            if (user) {
                logMsg = `user: ${user.username}, email: ${user.email}. `;
            } else {
                logMsg = `no data found. `;
            }
            break;
        case 'list':
            if (username === undefined || password === undefined) {
                logMsg = 'Missing credentials.'
            } else if (username != 'Admin' && password != 'Admin') {
                logMsg = 'Invalid credentials.'
            } else {

                var userList = users.listUsers();
                if (userList.length == 0) {
                    logMsg = 'No users found';
                } else {
                    logStatus = 'Success';
                    logMsg = 'Users :';
                    userList.forEach((val) => {
                        logMsg += `${val.username}, ${val.email} ;`;
                    });
                }
            };
            break;
        case "delete":
            if (username === undefined || password === undefined) {
                logMsg = 'Missing credentials.'
            } else {
                var isDeleted = users.deleteUser(username, password)

                if (isDeleted) {
                    logStatus = 'Success';
                    logMsg = `User : ${username} deleted`;
                } else {
                    logMsg = 'No user found';
                }
            };
            break;

        case "update":
            if (username === undefined || email === undefined || password === undefined) {
                logMsg = 'Missing credentials.'
            } else {

                var user = users.updateUser(username, password, email);
                if (user) {
                    logStatus = 'Success';
                    logMsg = `User Updated: ${user.username} ${user.email}.`;
                } else {
                    logMsg = `User (${userName}) not found!`;
                }

            };
            break;
    }

}

logger.info('App accessed by', `${appUser.username}: ${logStatus} - ${logMsg}`);