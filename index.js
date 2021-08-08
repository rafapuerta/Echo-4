require("dotenv").config();
const path = require("path");
const fs = require("fs");
const Discord = require("discord.js");
const client = new Discord.Client();

const baseFile = "command-base.js";
const commandBase = require(`./commands/${baseFile}`);

const mongo = require("./mongo");
const colors = require("colors");

client.on("ready", async () => {
  console.log(
    "🟢 Conectado a Discord como:" + colors.yellow(`@${client.user.tag}`)
  );

  await mongo().then((mongoose) => {
    try {
      console.log(colors.white("🟢 Conectado a Mongo"));
    } finally {
      mongoose.connection.close();
    }
  });

  readCommands("commands");
});

const readCommands = (dir) => {
  const files = fs.readdirSync(path.join(__dirname, dir));
  for (const file of files) {
    const stat = fs.lstatSync(path.join(__dirname, dir, file));
    if (stat.isDirectory()) {
      readCommands(path.join(dir, file));
    } else if (file !== baseFile) {
      const option = require(path.join(__dirname, dir, file));
      commandBase(client, option);
    }
  }
};
client.login(process.env.DISCORD_TOKEN);
