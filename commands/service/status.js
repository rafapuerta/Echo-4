module.exports = {
    commands: ['status'],
    expectedArgs: '<text>',
    permissionError: 'You need admind permission to run this command',
    minArgs: 1,
    callback: (message, arguments, text, client) => {

        client.user.setPresence({
            activity: {
                name: text,
                type: 3
            }
        })
    },
    permissions: ['ADMINISTRATOR'],
}

