require("dotenv").config()
var colors = require("colors")

const validatePermissions = (permissions) => {
    const validPermissions = [
        'CREATE_INSTANT_INVITE',
        'KICK_MEMBERS',
        'BAN_MEMBERS',
        'ADMINISTRATOR',
        'MANAGE_CHANNELS',
        'MANAGE_GUILD',
        'ADD_REACTIONS',
        'VIEW_AUDIT_LOG',
        'PRIORITY_SPEAKER',
        'STREAM',
        'VIEW_CHANNEL',
        'SEND_MESSAGES',
        'SEND_TTS_MESSAGES',
        'MANAGE_MESSAGES',
        'EMBED_LINKS',
        'ATTACH_FILES',
        'READ_MESSAGE_HISTORY',
        'MENTION_EVERYONE',
        'USE_EXTERNAL_EMOJIS',
        'VIEW_GUILD_INSIGHTS',
        'CONNECT',
        'SPEAK',
        'MUTE_MEMBERS',
        'DEAFEN_MEMBERS',
        'MOVE_MEMBERS',
        'USE_VAD',
        'CHANGE_NICKNAME',
        'MANAGE_NICKNAMES',
        'MANAGE_ROLES',
        'MANAGE_WEBHOOKS',
        'MANAGE_EMOJIS',
      ] 

    for (const permission of permissions) {
        if (!validPermissions.includes(permission)) {
            throw new Error(`Permiso "${permission}" desconocido`)
        }
    }
}

module.exports = (client, commandOptions) => {
  let {
    commands,
    expectedArgs = " ",
    permissionError = "No tienes los permisos necesarios para utilizar este comando",
    minArgs = 0,
    maxArgs = null,
    permissions = [],
    requiredRoles = [],
    callback
  } = commandOptions;

  //Ensure the command and aliases are in an array
  if (typeof commands === 'string') {
      commands = [commands]
  }

  console.log(colors.white(`Activando el comando: `)+ colors.green(`${commands[0]}`))

  //Ensure the permissions are in an array and are all valid
  if (permissions.length) {
      if (typeof permissions === 'string'){
          permissions = [permissions]
      }

      validatePermissions(permissions)
  }

  // Listen form messages

  client.on('message', message => {
      const { member, content, guild} = message

      for (const alias of commands) {
          if(content.toLowerCase().startsWith(`${process.env.PREFIX}${alias.toLowerCase()}`)){
              // A command has been ran

              // Ensure the user has the required permissions
              for(const permission of permissions){
                  if (!member.hasPermission(permission)){
                      message.reply(permissionError)
                      return
                  }
              }

              // Ensure the user has the required roles

              for( const requiredRole of requiredRoles) {
                  const role = guild.roles.cache.find(role => role.name === requiredRole)

                  if (!role || !member.roles.cache.has(role.id)){
                      message.reply(`Tienes que tener el rol de "**${requiredRole}**" para usar este comando.`)
                      return
                  }
              }

              // Split the command into an array

              const arguments = content.split(/[ ]+/)

              // Remove the command (first index)

              arguments.shift()

              // Ensure we have the correct number of arguments

              if (arguments.length < minArgs || (
                  maxArgs !== null && arguments.length > maxArgs
              )) {
                message.reply(`Sintaxis incorrecta! utiliza: **${prefix}${alias} ${expectedArgs}**`)
                return
              }

             // Handle the custom command

             callback(message, arguments, arguments.join(' '), client)
              return
          }
      }
  })
};
