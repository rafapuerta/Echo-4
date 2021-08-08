module.exports = {
    commands: ['addition', 'suma'],
    expectedArgs: '<num1> <num2>',
    permissionError: 'Necesitas permiso de administrador para utilizar este comando',
    minArgs: 2,
    maxArgs: 2,
    callback: (message, arguments, text) => {
        const num1 = +arguments[0]
        const num2 = +arguments[1]
        message.channel.send(`Resultado: ${num1+num2}`)
    },
    permissions: ['ADMINISTRATOR'],
    requiredRoles: ['Math']
}

