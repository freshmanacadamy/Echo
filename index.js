const TelegramBot = require('node-telegram-bot-api');

// Get token from environment variable
const token = process.env.TELEGRAM_BOT_TOKEN;

// Create bot instance
const bot = new TelegramBot(token, { polling: true });

console.log('🤖 Telegram Echo Bot is starting...');

// Handle /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const welcomeText = `👋 Hello! I'm Echo Bot!

📝 I can echo your messages!

Available commands:
/start - Start the bot
/echo - Echo your message
/ping - Check if bot is alive

Simply send me any message and I'll repeat it!`;

  bot.sendMessage(chatId, welcomeText);
});

// Handle /echo command
bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const textToEcho = match[1];
  
  bot.sendMessage(chatId, `🔊 ${textToEcho}`);
});

// Handle /ping command
bot.onText(/\/ping/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, '🏓 Pong! Bot is alive and working!');
});

// Echo any text message (not commands)
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;

  // Ignore command messages
  if (!messageText.startsWith('/')) {
    bot.sendMessage(chatId, `🔊 You said: ${messageText}`);
  }
});

// Handle errors
bot.on('error', (error) => {
  console.log('Bot error:', error);
});

console.log('✅ Telegram Echo Bot is running!');
