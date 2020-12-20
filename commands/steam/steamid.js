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
        channel.send(`Tu ID de Steam es: ${result.steamID}`);
      } finally {
        mongoose.connection.close();
      }
    });
  },
};
