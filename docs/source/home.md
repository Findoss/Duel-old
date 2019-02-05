# Техническая часть

## Краткая справка

### Поддерживаемые браузеры

| Браузер       | Поддержка     |
|---------------|---------------|
| Chrome        | Supported     |
| Firefox       | Supported     |
| Edge          | Supported     |
| Safari 10+    | Supported     |
| IE / Safari 9 | Not supported |

### Поддерживаемые разрешения экрана устройства

| Разрешение | Соотношение сторон                        |
|------------|-------------------------------------------|
| 1366x768   | 16/9                                      |
| 1920x1080  | 16/9                                      |
| 1440x900   | 16/10                                     |
| 1600x900   | 16/9                                      |
| 1536x864   | 16/9                                      |
| 1280x800   | 16/10                                     |
| 1280x1024  | 4/3                                       |
| 1024x768   | 4/3 (нижняя граница для 4/3)              |
| 1280x720   | 16/9                                      |
| 1680x1050  | 16/9                                      |
| 2560x1440  | 16/9 (верхняя граница для 16/9)           |
| 1360x768   | 16/9 (нижняя граница для 16/9)            |
| 1920x1200  | 16/10                                     |
| 360x640    | 4/3 (исключаем, слишком мало + оринтация) |
| 1280x768   | 4/3                                       |


### Документация
Документацию для **клиента** 
* по компонентам и ui можно посмотреть в `storybook`  
* по функционалу можно посмотреть (jsdocs) из vuex (store)

Документацию для **сервера**  
* по модулю API - можно посмотреть в `build/API.html`
* по модулю Game - можно посмотреть (jsdocs) из classes

### Тесты
Для **клиента**  
* юнит тесты компонентов - 

Для **сервера**  
* юнит тесты по модулю API - 
* юнит тесты по модулю Game - 
* интеграционные тесты - 

### Скрипты  
База данных  
* `database/scripts`  
* `server/utils`  

Клиент  
* `client/utils`  

### Управление задачами   
[Разработка](https://github.com/Findoss/Duel/projects/2)  
* клиент
* сервер

[Контент](https://github.com/Findoss/Duel/projects/3)  
* графика
* музыка 

## Структура проекта

`│ ├─ └─ •••`

// TODO

## Разворачивание проекта

Клонируем проект

`$ git clone https://github.com/Findoss/Duel.git Duel`

`$ cd duel`

Создем все удаленные ветки локально
`` $ for b in `git branch -r │ grep -v -- '->'`; do git branch --track ${b##origin/} $b; done ``

обновим их  
`$ git fetch --all`

установим все зависимости  
`$ npm i`

запустим клиент  
`$ npm run dev-client` ( port - 3002 )

запустим фейк сервер  
`$ npm run dev-api-mock` ( port - 3001 )  

или настоящий сервер  
`$ npm run dev-server` ( port - 3001 )

открываем браузер
`open broswer localhost:3002`

### Клиент (  cd ./client  )

Сборка клиента  
`$ npm run build`

Создание типового компонента
`$ npm run create`

Запуск клиента в режиме разработки  
`$ npm run dev` ( port - 3002 )

Запуск тестов клиента  
`$ npm run test`

Конфигурация webpack  
`$ npm run vue-inspect`

Запуск книги компонентов в режиме разработки  
`$ npm run dev-storybook`

Сборка книги компонентов  
`$ npm run build-storybook`

### Сервер (  cd ./server  )

Запуск сервера в режиме разработки  
`$ npm run dev` ( port - 3001 )

Запуск сервера  
`$ npm run start` ( port - 80 )

Запуск тестов сервера  
`$ npm run test`

Запуск тестов сервера в режиме разработки  
`$ npm run test-watch`

### Общее

Запуск клиента в режиме разработки  
`$ npm run dev-client` ( port - 3002 )

Запуск книги компонентов в режиме разработки  
`$ npm run dev-storybook` ( port - 3004 )

Запуск сервера в режиме разработки  
`$ npm run dev-server` ( port - 3001 )

Запуск фейк сервера  
`$ npm run dev-server-mock` ( port - 3001 )

Запуск документации API в режиме разработки  
`$ npm run dev-api` ( port - 3000 )

Запуск тестов сервера в режиме разработки  
`$ npm run dev-test-server` ( port - 3003 )

Запуск тестов клиента в режиме разработки  
`$ npm run dev-test-client` ( port - 3003 )

Сделать дамп базы данных  
`$ npm run db-dump`

Сделать экспорт коллекции  
```
{database} - имя базы
{collection} - имя коллекции
{version} - версия коллекции
```
`$ npm run db-export {database} {collection} {version}`

Сделать импорт коллекции  
```
{database} - имя базы
{collection} - имя коллекции
{version} - версия коллекции
```
`$ npm run db-export {database} {collection} {version}`

Генерация токена  
```
{id} - id пользователя
[key] - ключ сессии (по умолчанию - гененирует)
[secret] - секрет для шифрования (по умолчанию - из конфига)
```
`$ npm run gen-token {id} [key] [secret]`

Генерация пароля  
```
{password} - новый пароль
```
`$ npm run gen-pass {password}`

Просмотр логов на Heroku сервере  
`$ npm run log-remote`

Установка зависимостей клиента  
`$ npm run install-client`

Установка зависимостей сервера  
`$ npm run install-server`

Сборка документации API  
`$ npm run build-api`

Сборка документации  
`$ npm run build-doc`

Вывод структуры проекта  
`$ npm run build-structure`

## Документация по инструментам

[Vue](https://ru.vuejs.org/v2/guide/)  
[Mongoosejs](http://mongoosejs.com)  
[MongoDB](https://docs.mongodb.com/)  
[ESlint](https://eslint.org)  
[JSdoc](http://usejsdoc.org/index.html)  
[JSdoc to markdown](https://github.com/jsdoc2md/jsdoc-to-markdown)  
[Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
