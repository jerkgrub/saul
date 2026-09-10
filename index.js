require("dotenv").config();

const { Client, GatewayIntentBits, Events } = require("discord.js");

const replies = {
  hi: "hello",
  hello: "hey",
  "are you alive?": "Yes",
  "are you a human?": "No",
};

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Logged in as ${readyClient.user.tag}`);
});

client.on(Events.MessageCreate, (message) => {
  if (message.author.bot) return;

  const text = message.content.toLowerCase().trim();
  const reply = replies[text];

  if (reply) {
    message.reply(reply);
  }
});

if (!process.env.DISCORD_TOKEN) {
  console.error("Missing DISCORD_TOKEN in .env");
  process.exit(1);
}

client.login(process.env.DISCORD_TOKEN);
