# Как запустить проект

### Склонировать проект
```shell
git clone git@github.com:Evollt/my_blog.git
```
## Запуск сервера
```shell
docker-compose up -d
```
`Docker` сам за вас соберет сервер и запустит.

Далее надо запустить миграции для проекта. Это можно сделать через команду:
```shell
docker-compose run artisan migrate
```
Еще запустим фабрику, чтобы у нас проект сформировал базовые данные и не пришлось самому их создавать
```shell
docker-compose run artisan db:seed
```
Вот и все! Можно считать, что сервер запущен!

## Запуск фронта
Внутри проекта перходим в папку `frontend`
Запускаем `npm i && npm run dev`

## Как открыть PhpMyAdmin
После запуска сервера `PhpMyAdmin` автоматически запустится по адресу `http://localhost:8080/`
### Логин: `root`
### Пароль: `root`
### Пароль для всех пользователей, созданных через фабрики: `qwerty12`
### Документация к API в [Postman](https://www.postman.com/bold-meadow-755953/workspace/my-blog/collection/18045515-6e2a4fd0-3764-40f6-ac3b-b0e02504ee95?action=share&creator=18045515)


