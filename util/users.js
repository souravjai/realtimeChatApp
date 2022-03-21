const users = []

function userJoin(id, username, room) {
    room = room.toString();
    const user = { id, username, room };

    users.push(user);

    return user;
}

function getCurrentUser(id) {
    return users.find(user => user.id === id);
}

function removeElement(id) {

    for (i = 0; i < users.length; i++) {
        if (users[i].id == id) {
            break;
        }
    }
    if (i != users.length)
        users.splice(i, 1);
}

module.exports = {
    userJoin,
    getCurrentUser,
    removeElement
};