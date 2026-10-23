# Домашняя работа 12 — Express + MongoDB

## Запуск
1. Убедитесь, что MongoDB Community Server запущен локально.
2. В папке проекта выполните `npm install`.
3. Проверьте настройки `.env` (при отсутствии скопируйте `.env.example`).
4. Выполните `npm start`.

База `node_hw_12` и коллекция `products` создаются при первом добавлении продукта. Их также можно создать вручную в MongoDB Compass.

## Проверка в Postman
- `POST http://localhost:3000/products` с JSON `{ "name": "Laptop", "price": 1200, "description": "Gaming laptop" }` — 201.
- `GET http://localhost:3000/products` — 200.
- `GET http://localhost:3000/products/<ID>` — 200 или 404.
- `PUT http://localhost:3000/products/<ID>` с JSON `{ "price": 1100 }` — 200.
- `DELETE http://localhost:3000/products/<ID>` — 200.
- Некорректные данные или ID — 400, отсутствующий продукт — 404, ошибки сервера — 500.

Замените `<ID>` на `_id` из ответа POST.
