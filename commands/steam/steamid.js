const mongo = require("../../mongo");
const userSchema = require("../../schemas/user-schema");


module.exports = {
  commands: ["steamid"],
  minArgs: 0,
  maxArgs: 0,
  callback: async (message, arguments, text) => {
    const { member, channel } = message;
    await mongo().then(async (mongoose) => {
      try {
        const result = await userSchema.findOne({ _id: member.id });
        let msg = codeblock("bash", `/join ${result.steamID}`)
        channel.send(`${message.member}, comparte este comando:` +  msg) 
      }
      finally {
        mongoose.connection.close();
      }
    });
  },
};


function codeblock(language, code){
    return `\`\`\`${language}\n${code}\`\`\``;
}