module.exports = {
    commands: ['status'],
    expectedArgs: '<text>',
    permissionError: 'Necesitas permiso de administrador para utilizar este comando',
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

