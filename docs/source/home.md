# Техническая часть

## Структура проекта
`│  ├─  └─  •••`

```
F:\Projects\Duel
├── client
│  ├── build
│  ├── source
│  │  ├── App.vue
│  │  ├── assets
│  │  │  ├── 000.png
│  │  │  ├── avatars
│  │  │  │  └── shooter_1.png
│  │  │  ├── background.jpg
│  │  │  ├── error.png
│  │  │  ├── info.png
│  │  │  ├── Rolling-1s-16px-1.gif
│  │  │  ├── Rolling-1s-16px-2.gif
│  │  │  ├── success.png
│  │  │  └── warning.png
│  │  ├── components
│  │  │  ├── BaseAlert
│  │  │  │  ├── BaseAlert.css
│  │  │  │  ├── BaseAlert.html
│  │  │  │  ├── BaseAlert.js
│  │  │  │  └── BaseAlert.vue
│  │  │  ├── BaseButton
│  │  │  │  ├── BaseButton.css
│  │  │  │  ├── BaseButton.html
│  │  │  │  ├── BaseButton.js
│  │  │  │  └── BaseButton.vue
│  │  │  └── BaseTextField
│  │  │     ├── BaseTextField.css
│  │  │     ├── BaseTextField.html
│  │  │     ├── BaseTextField.js
│  │  │     └── BaseTextField.vue
│  │  ├── main.js
│  │  ├── router.js
│  │  ├── services
│  │  │  ├── me.js
│  │  │  ├── session.js
│  │  │  └── user.js
│  │  ├── store
│  │  │  └── index.js
│  │  ├── styles
│  │  │  ├── card.css
│  │  │  ├── index.css
│  │  │  ├── link.css
│  │  │  ├── list.css
│  │  │  └── typography.css
│  │  ├── utils
│  │  │  ├── http.js
│  │  │  └── validation
│  │  │     ├── regexp.js
│  │  │     └── rules.js
│  │  └── views
│  │     ├── design.vue
│  │     ├── password-new
│  │     │  ├── index.vue
│  │     │  ├── password-new.css
│  │     │  ├── password-new.html
│  │     │  └── password-new.js
│  │     ├── password-reset
│  │     │  ├── index.vue
│  │     │  ├── password-reset.css
│  │     │  ├── password-reset.html
│  │     │  └── password-reset.js
│  │     ├── profile
│  │     │  ├── index.vue
│  │     │  ├── profile.css
│  │     │  ├── profile.html
│  │     │  └── profile.js
│  │     ├── registration
│  │     │  ├── index.vue
│  │     │  ├── registration.css
│  │     │  ├── registration.html
│  │     │  └── registration.js
│  │     └── signin
│  │        ├── index.vue
│  │        ├── signin.css
│  │        ├── signin.html
│  │        ├── signin.js
│  │        ├── signin.spec.js
│  │        └── signin.store.js
│  └── statics
│     ├── favicon.ico
│     ├── fonts
│     │  └── DwarvenAxe.ttf
│     └── index.html
├── docs
│  ├── build
│  │  ├── API.html
│  │  ├── progect-structure.txt
│  │  └── Webpack-config.js
│  └── source
│     ├── api
│     │  ├── client-route.apib
│     │  ├── index.apib
│     │  ├── me.apib
│     │  ├── sandbox.apib
│     │  ├── session.apib
│     │  ├── tool.apib
│     │  └── user.apib
│     ├── code.md
│     ├── git.md
│     └── home.md
├── LICENSE.md
├── package-lock.json
├── package.json
├── README.md
├── server
│  └── index.js
├── TODO.md
└── vue.config.js
```

## Разворачивание проекта
Клонируем проект  

`$ git clone https://github.com/Findoss/Duel.git Duel`  

`$ cd duel`


Создем все удаленные ветки локально и обновим их  
```
$ for b in `git branch -r │ grep -v -- '->'`; do git branch --track ${b##origin/} $b; done
```

`$ git fetch --all`


Установим все зависимости  

`$ npm i`  

Запускаем проект для dev  

`$ npm run dev-client`  

`$ npm run dev-api-mock` or  
create `./config/production.json` and `$ npm run dev-server`

`open broswer localhost:3002`

## Утилиты

### Сборка

Сборка клиента  
`$ npm run build-client`  

Сборка дкументации апи  
`$ npm run build-api`  

Сборка дкументации  
`$ npm run build-doc`  

### Разработка

Разработка документации API  
`$ npm run dev-api` ( port - 3000 )  

Запуск фейк сервера для API  
`$ npm run dev-api-mock` ( port - 3001 )  

Запуск клиента в режиме разработки  
`$ npm run dev-client` ( port - 3002 )  

Запуск фейк сервера в режиме разработки  
`$ npm run dev-server` ( port - 3003 )  

Запуск тестов в режиме разработки  
`$ npm run dev-test` ( port - 3004 )  

### Тестирование

Запуск тестирования API  
`$ npm run test-api`

Запуск тестов сервера  
`$ npm run test-js`

Запуск тестов клиента  
`$ npm run test-vue`

Отправка результата о покрытии тестами  
`$ npm run test-push-report`

### Разное

Конфигурация webpack  
`$ npm run vue-inspect`  

Вывод структуры проекта  
`$ npm run build-structure`  

## Документация по инструментам  
[ESlint](https://eslint.org)  
[JSdoc](http://usejsdoc.org/index.html)  
[JSdoc to markdown](https://github.com/jsdoc2md/jsdoc-to-markdown)  
[Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)  