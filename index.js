const path = require("path")
const fs = require("fs")
const Discord = require("discord.js")
const client = new Discord.Client()

const config = require("./config.json")
const mongo = require('./mongo')


client.on("ready", async () => {
    console.log("Conectado a Discord como: " + client.user.tag)

    await mongo().then((mongoose) =>{
      try {
        console.log("Conectado a Mongo")
      } finally {
          mongoose.connection.close()
      } 
    })

    const baseFile = "command-base.js"
    const commandBase = require(`./commands/${baseFile}`)

    const readCommands = dir => {
         const files = fs.readdirSync(path.join(__dirname, dir))
         for (const file of files) {
             const stat = fs.lstatSync(path.join(__dirname, dir, file))
             if (stat.isDirectory()){
                 readCommands(path.join(dir, file))
             }else if  (file !== baseFile){
                  const option = require(path.join(__dirname, dir, file))
                  commandBase(client, option)
             }

             }
         }
    


    readCommands('commands')

    /* command(client, 'servers', message => {
        client.guilds.cache.forEach((guild)=> {
            message.channel.send(`${guild.name} tiene un total de ${guild.memberCount} miembros`)
        })
    })


    command(client, ['cc', 'clearchannel'], message => {
        if (message.member.hasPermission('ADMINISTRATOR')) {
            message.channel.messages.fetch().then((results) => {
                message.channel.bulkDelete(results)
            })
        }
    })


    command(client, 'status', message =>{
        const content = message.content.replace(`${config.prefix}status`, '')

        client.user.setPresence({
            activity: {
                name: content,
                type: 0
            }
        })
    }) */

})


client.login(config.token)