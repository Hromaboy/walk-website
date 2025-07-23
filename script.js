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

    const data = await response.json();
    
    if (response.ok) {
      alert('Ответ отправлен! 🎉');
    } else {
      console.error('Ошибка сервера:', data);
      alert(`Ошибка отправки: ${data.error || 'Неизвестная ошибка'} 😞`);
    }
  } catch (error) {
    console.error('Ошибка сети:', error);
    alert(`Ошибка отправки: ${error.message} 😞`);
  }
}
