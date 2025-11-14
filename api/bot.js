const TelegramBot = require('node-telegram-bot-api');

// Use webhook mode for Vercel
const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token);

// Store webhook URL (Vercel provides this in production)
const webhookUrl = process.env.VERCEL_URL 
  ? `https://${process.env.VERCEL_URL}/api/bot`
  : process.env.WEBHOOK_URL;

module.exports = async (req, res) => {
  // Set webhook on first deploy
  if (req.method === 'GET' && req.query.setWebhook) {
    try {
      await bot.setWebHook(webhookUrl);
      return res.status(200).json({ 
        success: true, 
        message: `Webhook set to: ${webhookUrl}` 
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Handle incoming updates from Telegram
  if (req.method === 'POST') {
    const { body } = req;

    if (body.message) {
      const chatId = body.message.chat.id;
      const text = body.message.text;

      console.log('Received message:', text);

      // Handle /start command
      if (text === '/start') {
        await bot.sendMessage(chatId, '👋 Hello! I am Echo Bot on Vercel! Send me any message and I will repeat it.');
      }
      // Echo other messages
      else if (text && !text.startsWith('/')) {
        await bot.sendMessage(chatId, `🔊 Echo: ${text}`);
      }
    }

    return res.status(200).json({ ok: true });
  }

  res.status(200).json({ message: 'Telegram Bot API' });
};
