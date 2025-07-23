document.getElementById('yes').addEventListener('click', () => sendAnswer('Да'));
document.getElementById('no').addEventListener('click', () => sendAnswer('Нет'));

async function sendAnswer(answer) {
  try {
    const response = await fetch('/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ answer })
    });

    if (response.ok) {
      alert('Ответ отправлен! 🎉');
    } else {
      alert('Ошибка отправки 😞');
    }
  } catch (error) {
    console.error('Ошибка:', error);
    alert('Ошибка отправки 😞');
  }
}