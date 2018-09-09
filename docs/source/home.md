# Техническая часть

## Структура проекта

`│ ├─ └─ •••`

```
Duel
├── client
│   ├── babel.config.js
│   ├── build
│   ├── package-lock.json
│   ├── package.json
│   ├── source
│   │   ├── App.vue
│   │   ├── assets
│   │   │   ├── avatars
│   │   │   │   ├── null.png
│   │   │   │   ├── null_icon.png
│   │   │   │   ├── shooter_1.png
│   │   │   │   ├── shooter_1_icon.png
│   │   │   │   ├── shooter_2.png
│   │   │   │   ├── shooter_2_icon.png
│   │   │   │   ├── shooter_3.png
│   │   │   │   └── shooter_3_icon.png
│   │   │   ├── background.png
│   │   │   ├── estate
│   │   │   │   ├── diamond.png
│   │   │   │   ├── gold.png
│   │   │   │   └── point.png
│   │   │   ├── loading.png
│   │   │   ├── runes
│   │   │   │   ├── 1.png
│   │   │   │   ├── 2.png
│   │   │   │   ├── 3.png
│   │   │   │   ├── 4.png
│   │   │   │   ├── 5.png
│   │   │   │   └── 6.png
│   │   │   ├── skills
│   │   │   │   ├── 0.png
│   │   │   │   ├── 1.png
│   │   │   │   ├── 2.png
│   │   │   │   ├── 3.png
│   │   │   │   └── locked.png
│   │   │   ├── status_icons
│   │   │   │   ├── error.png
│   │   │   │   ├── info.png
│   │   │   │   ├── rolling_black.gif
│   │   │   │   ├── rolling_white.gif
│   │   │   │   ├── success.png
│   │   │   │   └── warning.png
│   │   │   └── switch_orientation.png
│   │   ├── components
│   │   │   ├── BaseAlert
│   │   │   │   ├── BaseAlert.css
│   │   │   │   ├── BaseAlert.html
│   │   │   │   ├── BaseAlert.js
│   │   │   │   └── BaseAlert.vue
│   │   │   ├── BaseButton
│   │   │   │   ├── BaseButton.css
│   │   │   │   ├── BaseButton.html
│   │   │   │   ├── BaseButton.js
│   │   │   │   └── BaseButton.vue
│   │   │   ├── BaseContainer
│   │   │   │   ├── BaseContainer.css
│   │   │   │   ├── BaseContainer.html
│   │   │   │   ├── BaseContainer.js
│   │   │   │   ├── BaseContainer.spec.js
│   │   │   │   └── BaseContainer.vue
│   │   │   ├── BaseLoading
│   │   │   │   ├── BaseLoading.css
│   │   │   │   ├── BaseLoading.html
│   │   │   │   ├── BaseLoading.js
│   │   │   │   └── BaseLoading.vue
│   │   │   ├── BaseTab
│   │   │   │   ├── BaseTab.css
│   │   │   │   ├── BaseTab.html
│   │   │   │   ├── BaseTab.js
│   │   │   │   ├── BaseTab.spec.js
│   │   │   │   └── BaseTab.vue
│   │   │   ├── BaseTabs
│   │   │   │   ├── BaseTabs.css
│   │   │   │   ├── BaseTabs.html
│   │   │   │   ├── BaseTabs.js
│   │   │   │   ├── BaseTabs.spec.js
│   │   │   │   └── BaseTabs.vue
│   │   │   ├── BaseTextField
│   │   │   │   ├── BaseTextField.css
│   │   │   │   ├── BaseTextField.html
│   │   │   │   ├── BaseTextField.js
│   │   │   │   └── BaseTextField.vue
│   │   │   ├── Board
│   │   │   │   ├── Board.css
│   │   │   │   ├── Board.html
│   │   │   │   ├── Board.js
│   │   │   │   ├── Board.spec.js
│   │   │   │   └── Board.vue
│   │   │   ├── BoardRune
│   │   │   │   ├── BoardRune.css
│   │   │   │   ├── BoardRune.html
│   │   │   │   ├── BoardRune.js
│   │   │   │   ├── BoardRune.spec.js
│   │   │   │   └── BoardRune.vue
│   │   │   ├── globals.js
│   │   │   ├── Skill
│   │   │   │   ├── Skill.css
│   │   │   │   ├── Skill.html
│   │   │   │   ├── Skill.js
│   │   │   │   ├── Skill.spec.js
│   │   │   │   └── Skill.vue
│   │   │   ├── SkillCard
│   │   │   │   ├── SkillCard.css
│   │   │   │   ├── SkillCard.html
│   │   │   │   ├── SkillCard.js
│   │   │   │   ├── SkillCard.spec.js
│   │   │   │   └── SkillCard.vue
│   │   │   ├── SkillGrid
│   │   │   │   ├── SkillGrid.css
│   │   │   │   ├── SkillGrid.html
│   │   │   │   ├── SkillGrid.js
│   │   │   │   ├── SkillGrid.spec.js
│   │   │   │   └── SkillGrid.vue
│   │   │   ├── SkillSet
│   │   │   │   ├── SkillSet.css
│   │   │   │   ├── SkillSet.html
│   │   │   │   ├── SkillSet.js
│   │   │   │   ├── SkillSet.spec.js
│   │   │   │   └── SkillSet.vue
│   │   │   ├── UserEstate
│   │   │   │   ├── UserEstate.css
│   │   │   │   ├── UserEstate.html
│   │   │   │   ├── UserEstate.js
│   │   │   │   └── UserEstate.vue
│   │   │   ├── UserNickname
│   │   │   │   ├── UserNickname.css
│   │   │   │   ├── UserNickname.html
│   │   │   │   ├── UserNickname.js
│   │   │   │   ├── UserNickname.spec.js
│   │   │   │   └── UserNickname.vue
│   │   │   └── UserParametrs
│   │   │       ├── UserParametrs.css
│   │   │       ├── UserParametrs.html
│   │   │       ├── UserParametrs.js
│   │   │       ├── UserParametrs.spec.js
│   │   │       └── UserParametrs.vue
│   │   ├── main.js
│   │   ├── router.js
│   │   ├── services
│   │   │   └── session.js
│   │   ├── store
│   │   │   ├── actions.js
│   │   │   ├── getters.js
│   │   │   ├── index.js
│   │   │   ├── modules
│   │   │   │   ├── account.js
│   │   │   │   ├── game.js
│   │   │   │   ├── skills.js
│   │   │   │   ├── statics.js
│   │   │   │   ├── user.js
│   │   │   │   └── user_private.js
│   │   │   └── mutations.js
│   │   ├── styles
│   │   │   ├── index.css
│   │   │   ├── reset
│   │   │   │   ├── link.css
│   │   │   │   ├── list.css
│   │   │   │   ├── table.css
│   │   │   │   └── typography.css
│   │   │   └── theme
│   │   ├── utils
│   │   │   ├── http.js
│   │   │   └── validation
│   │   │       ├── form.js
│   │   │       ├── regexp.js
│   │   │       └── rules.js
│   │   └── views
│   │       ├── design.vue
│   │       ├── game
│   │       │   ├── game.css
│   │       │   ├── game.html
│   │       │   ├── game.js
│   │       │   ├── game.spec.js
│   │       │   └── game.vue
│   │       ├── password-new
│   │       │   ├── password-new.css
│   │       │   ├── password-new.html
│   │       │   ├── password-new.js
│   │       │   └── password-new.vue
│   │       ├── password-reset
│   │       │   ├── password-reset.css
│   │       │   ├── password-reset.html
│   │       │   ├── password-reset.js
│   │       │   └── password-reset.vue
│   │       ├── profile
│   │       │   ├── profile.css
│   │       │   ├── profile.html
│   │       │   ├── profile.js
│   │       │   ├── profile.spec.js
│   │       │   └── profile.vue
│   │       ├── profile-overview
│   │       │   ├── profile-overview.css
│   │       │   ├── profile-overview.html
│   │       │   ├── profile-overview.js
│   │       │   └── profile-overview.vue
│   │       ├── profile-scoreboard
│   │       │   ├── profile-scoreboard.css
│   │       │   ├── profile-scoreboard.html
│   │       │   ├── profile-scoreboard.js
│   │       │   ├── profile-scoreboard.spec.js
│   │       │   └── profile-scoreboard.vue
│   │       ├── profile-setting
│   │       │   ├── profile-setting.css
│   │       │   ├── profile-setting.html
│   │       │   ├── profile-setting.js
│   │       │   ├── profile-setting.spec.js
│   │       │   └── profile-setting.vue
│   │       ├── profile-skills
│   │       │   ├── profile-skills.css
│   │       │   ├── profile-skills.html
│   │       │   ├── profile-skills.js
│   │       │   ├── profile-skills.spec.js
│   │       │   └── profile-skills.vue
│   │       ├── registration
│   │       │   ├── registration.css
│   │       │   ├── registration.html
│   │       │   ├── registration.js
│   │       │   └── registration.vue
│   │       └── signin
│   │           ├── signin.css
│   │           ├── signin.html
│   │           ├── signin.js
│   │           ├── signin.spec.js
│   │           └── signin.vue
│   ├── statics
│   │   ├── favicon.ico
│   │   ├── fonts
│   │   │   └── DwarvenAxe.ttf
│   │   └── index.html
│   ├── tests
│   │   └── unit
│   │       ├── .eslintrc.js
│   │       └── HelloWorld.spec.js
│   ├── utils
│   │   └── create.sh
│   └── vue.config.js
├── docs
│   ├── build
│   │   └── progect-structure.txt
│   └── source
│       ├── api
│       │   ├── authorization.apib
│       │   ├── client-route.apib
│       │   ├── index.apib
│       │   ├── me.apib
│       │   ├── sandbox.apib
│       │   ├── skills.apib
│       │   ├── static.apib
│       │   ├── tool.apib
│       │   └── user.apib
│       ├── arts.md
│       ├── code.md
│       ├── home.md
│       ├── stack_of_technologies.md
│       └── tests.md
├── LICENSE
├── package-lock.json
├── package.json
├── README.md
└── server
    ├── config
    │   ├── develop.json
    │   ├── index.js
    │   ├── production.json
    │   └── test.json
    ├── controllers
    │   ├── passport.js
    │   ├── session.js
    │   ├── token.js
    │   ├── tool.js
    │   └── user.js
    ├── index.js
    ├── middleware
    │   ├── error.js
    │   ├── headers.js
    │   ├── routes
    │   │   ├── auth.js
    │   │   ├── index.js
    │   │   ├── statics.js
    │   │   ├── tools.js
    │   │   └── users.js
    │   └── time.js
    ├── models
    │   ├── db.js
    │   ├── session.js
    │   └── user.js
    ├── package-lock.json
    ├── package.json
    ├── static
    │   ├── avatars.json
    │   ├── levels.json
    │   └── user_parameters.json
    ├── test
    │   ├── api
    │   │   ├── data
    │   │   │   ├── new_users.json
    │   │   │   ├── skills.json
    │   │   │   └── users.json
    │   │   ├── helpers.js
    │   │   ├── index.js
    │   │   ├── me.spec.js
    │   │   ├── session.spec.js
    │   │   ├── skills.spec.js
    │   │   └── user.spec.js
    │   └── index.js
    └── utils
        └── error.js
```

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

Запуск сервера в режиме разработки  
`$ npm run dev-server` ( port - 3001 )

Запуск фейк сервера  
`$ npm run dev-server-mock` ( port - 3001 )

Запуск документации API в режиме разработки  
`$ npm run dev-api` ( port - 3000 )

Запуск тестов сервера в режиме разработки  
`$ npm run dev-test-server` ( port - 3003 )

Запуск тестов клиента в режиме разработки  
`$ npm run dev-test-сдшуте` ( port - 3003 )

Сборка дкументации API  
`$ npm run build-api`

Сборка дкументации  
`$ npm run build-doc`

Вывод структуры проекта  
`$ npm run build-structure`

#### необходимо добавить

Отправка результата о покрытии тестами  
`$ npm run test-push-report`

## Документация по инструментам

[ESlint](https://eslint.org)  
[JSdoc](http://usejsdoc.org/index.html)  
[JSdoc to markdown](https://github.com/jsdoc2md/jsdoc-to-markdown)  
[Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
