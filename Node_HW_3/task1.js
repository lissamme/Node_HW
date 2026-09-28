const fs = require('fs');

fs.mkdir('myFolder', (err) => {
  if (err) {
    console.error('Ошибка при создании папки:', err);
    return;
  }

  console.log('Папка успешно создана.');

  fs.rmdir('myFolder', (err) => {
    if (err) {
      console.error('Ошибка при удалении папки:', err);
      return;
    }

    console.log('Папка успешно удалена.');
  });
});