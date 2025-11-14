const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token);

// Set this to your Vercel deployment URL
const WEBHOOK_URL = 'https://your-app.vercel.app/api/bot';

async function setWebhook() {
  try {
    const result = await bot.setWebHook(WEBHOOK_URL);
    console.log('Webhook set successfully:', result);
    console.log('Webhook URL:', WEBHOOK_URL);
  } catch (error) {
    console.error('Error setting webhook:', error);
  }
}

setWebhook();
