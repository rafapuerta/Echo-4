module.exports = {
    commands: ['ping', 'test'],
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text) => {
        message.channel.send(`Pong! (tardé ${Date.now() - message.createdTimestamp} ms.)`)
    }
}