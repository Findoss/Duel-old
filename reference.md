[**← HOME**](README.md)  

# Техническая часть

### Платформа
Браузер

### Клиент
* Phaser.js (на рассмотрении)

### Сервер
* Node.js
* socket.io
* express.js

### Структура проекта
```
├───app
│   ├───client
│   │   ├───audio
│   │   ├───images
│   │   ├───libs
│   │   ├───scripts
│   │   │   ├───classes
│   │   │   └───states
│   │   └───styles
│   ├───libs
│   ├───node_modules
│   ├───server
│   │   └───logs
│   ├───tests
│   └───utils
├───database
├───docs
└───preview
```

### Разворачивание проекта
`$ cd app`  

`$ npm install --save-dev`  

`$ npm install --global bower`  

`$ npm install --global standard`  

`$ npm install --global gulp`  

`$ bower install`  


### Графика
Растровая.
Формат png.
Цветовая схема RGBa.

### Требование к коду 
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

### Именование
Позиция (положение на экроне) → x (horizontal), y (vertical)  
Индексы (положение в массиве) → i (row), j (colomn)  
Тег для формул → FORMULA  
Тег недоделанных или подлежащих пересмотрению частей кода → TODO  

### Утилиты
Для сборки дкументации используйте команду
`$ gulp doc`

## Документация по инструментам

[Gulp API](https://github.com/gulpjs/gulp/blob/master/docs/API.md)  
[JSdoc](http://usejsdoc.org/index.html)  
[Bower](https://bower.io/docs/api/)  
[Livereload](http://livereload.com/)  
[Spritesmith](https://github.com/twolfson/gulp.spritesmith)  
[Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)  