const Discord = require("discord.js");
const CONFIG = require("./config.json");

const goons = require("./functions/locate-goons");

const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
  ],
});

client.login(CONFIG.BOT_TOKEN);

const prefix = "!";

client.on("ready", () => {
  console.log("+--------------+");
  console.log("|  BOT ONLINE  |");
  console.log("+--------------+");
  client.user.setActivity(prefix + "help");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  if (interaction.user.bot) return;

  const { commandName } = interaction;

  if (commandName == "goons") {
    goons().then(async (reply) => {
      await interaction.reply({ embeds: [reply], ephemeral: true });
    });
  }
});

// client.on('messageCreate', function (message) {
//     if (message.author.bot) return;
//     if (!message.content.startsWith(prefix)) return;

//     const commandBody = message.content.slice(prefix.length);
//     const args = commandBody.split(' ');
//     const command = args.shift().toLowerCase();

//     console.log(message.content);

//     if (command == 'guilherme') {
//         message.reply('Vai toma no cu, Guilherme!');
//     }
// });
