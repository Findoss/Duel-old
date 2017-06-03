Структура
```
├──backend                             //
├──database                            //
├──frontend                            //
│  ├──source                           // ИСХОДНЫЕ ФАЙЛЫ
│  │  ├──game                          // ИГРА
│  │  │  ├──audio                      // АУДИО
│  │  │  ├──images                     // ИЗОБРАЖЕНИЯ
│  │  │  │  └──rune_N.png              // спрайты рун
│  │  │  ├──scripts                    // СКРИПТЫ
│  │  │  │  ├──classes                 // ЯДРО ИГРЫ
│  │  │  │  │  ├──queue.js             // класс очередь событий
│  │  │  │  │  ├──view.js              // класс отрисовка
│  │  │  │  │  ├──rune.js              // класс руна
│  │  │  │  │  └──board.js             // класс поле
│  │  │  │  ├──states                  // СОСТОЯНИЯ ИГРЫ
│  │  │  │  │  ├──Preloader.js         // состояние - загрузка 
│  │  │  │  │  ├──PlayGame.js          // состояние - игры
│  │  │  │  │  └──MainMenu.js          // состояние - меню
│  │  │  │  ├──config.js               // конфигурация движка
│  │  │  │  ├──debug.js                // отладка
│  │  │  │  ├──main.js                 // вход в игру (инициализация движка и сцен)
│  │  │  │  ├──utils.js                // дополнительные функции
│  │  │  │  └──textures.js             // описание текстур
│  │  │  ├──styles                     // СТИЛИ
│  │  │  │  └──main.css                // основной стиль
│  │  │  ├──tests                      // ТЕСТЫ
│  │  │  │  └──testBoadrs.js           // тестовые поля
│  │  │  └──index.html                 // 
│  │  ├──site                          // САЙТ
│  │  └──humans.txt                    // авторы
│  ├──bower_components                 // СТОРОННИЕ БИБЛИОТЕКИ
│  │  ├──phaser-ce                     // фреймворк игры
│  │  └──normalize-css                 // обнуление стилей
│  ├──node_modules                     // модули npm
│  ├──gulpfile.js                      // сборщик проекта
│  ├──bower.json                       // описание зависимостей проекта - сторонние библиотеки
│  ├──package.json                     // описание зависимостей проекта - модули npm
│  └──.bowerrc                         // парметры bower
├──.gitignore                          // игнорирование файлов и папок для репозитория
└──README.md                           // описание проекта

179             │
192             └
195             ├
196             ─
192 196 196     └──
195 196 196     ├──
9 196 196 196   ○───
```



Cпособности
* Обманка - тип один, вид другой