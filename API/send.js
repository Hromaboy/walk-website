export default async function handler(req, res) {
  // Разрешаем CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { answer } = req.body;

  console.log('Получен ответ:', answer);

  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  console.log('BOT_TOKEN exists:', !!BOT_TOKEN);
  console.log('CHAT_ID exists:', !!CHAT_ID);

  if (!BOT_TOKEN || !CHAT_ID) {
    return res.status(500).json({ 
      error: 'Missing bot token or chat ID',
      tokenExists: !!BOT_TOKEN,
      chatIdExists: !!CHAT_ID
    });
  }

  const text = `🔔 Новый ответ: ${answer}`;
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  try {
    console.log('Отправка сообщения в Telegram...');
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text
      })
    });

    const responseData = await response.json();
    console.log('Ответ от Telegram:', responseData);

    if (!response.ok) {
      throw new Error(`Telegram API error: ${responseData.description || response.status}`);
    }

    res.status(200).json({ success: true, telegramResponse: responseData });
  } catch (error) {
    console.error('Ошибка:', error);
    res.status(500).json({ error: error.message });
  }
}
