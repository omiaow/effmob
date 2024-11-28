# Effective Mobile Test
Требовании: Node Version v18.20.4, PostgreSQL 17.2

## База данных
![Image caption](https://raw.githubusercontent.com/omiaow/effmob/refs/heads/main/image.png)

## Задание 1.1 - папка first
* Установите зависимости `npm i`
* Настройте среду в папке .env
* Создайте таблицы в PostgreSQL с помощью sql запросов в папке database.sql
* Перед стартом запустите Задание 1.2, так как туда записываются действия каждые api запросы
* После запуска запустите сервер `npm start`

### Эндпоинты
1. Создание товара
Метод: `POST /products`
Входные данные: `{ "plu": "123456", "name": "Товар 1" }`
2. Получение товаров по фильтрам
Метод: `GET /products`
Параметры запроса (query parameters): `name`, `plu`
3. Создание остатка
Метод: `POST /stocks`
Входные данные:
```
{
  "productId": 1,
  "shopId": 1,
  "stockOnShelf": 10,
  "stockInOrder": 5
}
```
4. Увеличение остатка
Метод: `PUT /stocks/{id}/increase`
Входные данные: `{ "amount": 5 }`
5. Уменьшение остатка
Метод: `PUT /stocks/{id}/decrease`
Входные данные: `{ "amount": 2 }`
6. Получение остатков по фильтрам
Метод: `GET /stocks`
Параметры запроса (query parameters): `plu`, `shopId`, `stockOnShelfFrom`, `stockOnShelfTo`, `stockInOrderFrom`, `stockInOrderTo`

## Задание 1.2 - папка second
* Установите зависимости `npm i`
* Настройте среду в папке .env
* Создайте таблицы в PostgreSQL с помощью sql запросов в папке database.sql
* Запустите сервер `npm start`

### Эндпоинты
1. Способы общения между сервисами
Метод: `POST /actions`
Входные данные:
```
{
  "productId": 1,
  "shopId": 2,
  "action": "increase_stock",
  "details": {
    "amount": 5
  }
}
```
2. Эндпоинт для получения истории
Метод: `GET /actions`
Параметры запроса (query parameters): `shopId`, `plu`, `dateFrom`, `dateTo`, `action`, `page`, `limit`

## Задание 2 - папка users-service
* Установите зависимости `npm i`
* Создайте таблицы в PostgreSQL с помощью sql запросов в папке database.sql
* Запустите билд `npm run build`
* Начните миграцию `npx typeorm migration:run -d dist/data-source.js`
* Теперь можете запускать проект `npm run start`

### Эндпоинт
* Обновляет поле issues у всех пользователей (ставит false). Считает, сколько пользователей имели issues: true до обновления.
Метод: `GET /users/reset-issues`
Ответ: JSON с количеством пользователей, у которых изначально было issues: true.
```
{ "count": 12345 }
```


