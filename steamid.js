/* const mongo = require("./mongo")
const command = require("./command")
const userSchema = require("./schemas/user-schema")

module.exports = (client) => {



    command(client, "addID", async (message)=>{
        const {member, channel, content} = message

        await mongo().then(async (mongoose) => {
            try {
                await new userSchema({
                    userID: member.id,
                    steamID: content
                }).save()
            } finally {
                mongoose.connection.close()
            }
        })
    })
} */