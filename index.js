const { Client, GatewayIntentBits, Events } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// When bot is ready
client.once(Events.ClientReady, () => {
  console.log(`✅ Echo Bot is online! Logged in as ${client.user.tag}`);
});

// Echo messages
client.on(Events.MessageCreate, message => {
  // Ignore messages from bots
  if (message.author.bot) return;

  // Echo command - !echo [message]
  if (message.content.startsWith('!echo')) {
    const textToEcho = message.content.slice(6); // Remove "!echo "
    
    if (textToEcho) {
      message.channel.send(`🔊 ${textToEcho}`);
    } else {
      message.channel.send('❌ Please provide text to echo! Usage: `!echo your message here`');
    }
  }

  // Reply when mentioned
  if (message.mentions.has(client.user) && !message.content.startsWith('!')) {
    message.channel.send('👋 Hello! I\'m Echo Bot. Use `!echo [message]` and I\'ll repeat it!');
  }
});

// Handle errors
client.on('error', console.error);
process.on('unhandledRejection', console.error);

// Login with bot token from environment variable
client.login(process.env.DISCORD_TOKEN);
