const fs = require('fs');

var getUsers = () => {
    try {
        var userString = fs.readFileSync('users.json');
        return JSON.parse(userString);
    } catch (err) {
        //console.log(err)
        return [];
    }
};
var saveUsers = (users) => {
    fs.writeFileSync('users.json', JSON.stringify(users));
}

var inserUser = (username, password, email) => {

    var users = getUsers();

    var user = {
        username: username,
        password: password,
        email: email
    };

    var duplicateUser = users.filter((user) => {

        return (user.username === username || user.email === email);
    });

    if (duplicateUser.length === 0) {
        users.push(user);
        saveUsers(users);
        return user;
    }
}

var getUser = (username) => {
    var users = getUsers().filter((user) => user.username === username);
    console.log(users);
    return users[0];
};

var listUsers = () => {
    return getUsers();
}

var deleteUser = (username, password) => {

    var users = getUsers();
    var leftoutUsers = users.filter((user) => {
        return (user.username !== username && user.password !== password);
    });

    saveUsers(leftoutUsers);
    return (users.length !== leftoutUsers.length);
}

var updateUser = (username, password, email) => {

    var users = getUsers();
    var filterUser = users.filter((user) => {
        return (user.username === username && user.password === password)
    });

    if (filterUser.length > 0) {
        deleteUser(username, password);
        return inserUser(username, password, email);
    }
    return [];
}

module.exports = { getUser, inserUser, listUsers, deleteUser, updateUser };