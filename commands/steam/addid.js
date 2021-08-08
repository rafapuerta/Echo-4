const mongo = require("./../../mongo")
const userSchema = require("./../../schemas/user-schema")


module.exports = {
    commands: ['addid'],
    expectedArgs: '<SteamID> ',
    permissionError: 'Necesitas permiso de administrador para utilizar este comando',
    minArgs: 1,
    maxArgs: 1,
    callback: async (message, arguments, text) => {
        const {member} = message

        await mongo().then(async (mongoose) => {
            try {
                await userSchema.findOneAndUpdate({_id: member.id },{
                    _id: member.id,
                    steamID: arguments[0],
                },{upsert: true})
            } finally {
                mongoose.connection.close()
            }
        }).then(message.channel.send('Tu ID de Steam ha sido añadido correctamente'))
    },
}