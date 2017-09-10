# (?)
### Оглавление
0. [Жанр](#1-)
0. [Аудитория](#2-)
0. [Игровая сессия](#3-)
0. [Сложность игры](#4-)
0. [Идея](#5-)  
0. [Мир игры](#6-)  
0. [Графика](#7-)  
  * [Стилистика рисования](#7-1-)  
  * [Концепт арты](#7-2-)  
0. [Основная игровая механика](#8-)  
0. [Отличительная черта](#9-)  
0. [Основной цикл игры](#10-)  
0. [Цикл сражения](#11-)  
0. [Игровые объекты](#12-)  
  * [Игровое поле](#12-1-)  
  * [Руны](#12-2-)  
  * [Линии и комбинации линий](#12-3-)  
  * [Персонаж](#12-4-)  
  * [Умения](#12-5-)  
  * [Дерево умений](#12-6-)  
0. [Интерфейс](#13-)  
0. [Монетизация](#14-)  

### Последние результаты
![last_result](../preview/last_result.gif_off)  
![last_result](preview/last_result.gif_off)

## 1 Жанр
Логическая игра - "Три в ряд"

## 2 Аудитория
В основном мужчины 20-35 лет

## 3 Игровая сессия
Сражение 5-15 минут

## 4 Сложность игры
Средняя  
Для победы необходима сложная комбинация простых действий.  
Легко научиться, сложно стать мастером.

## 5 Идея 
Игра в жанре "три в ряд". Игрок перед сражением составляет набор умений для персонажа. Умения взаимодействуют со всеми элементами игры (логика игры, поле, персонаж т.д.) изменяя ход сражения. Противником игрока являются другие игроки или группа игроков. 

## 6 Мир игры
Мрачный фентезийный мир. Действия начинаются после того как главный герой умирает бою в Мидгарде и попадает в Вальхаллу (в город Асгард). Каждый день с утра он облачается в доспехи и сражается насмерть, а после воскресает.
**Стилизация** - готика Cкандинавской мифологии.  
**Время** - 9-10 век.

## 7 Графика
### 7.1 Стилистика рисования
![graphic](../preview/graphic.png)  
![graphic](preview/graphic.png)
### 7.2 Концепт арты
![concept](../preview/concept.png_off)  
![concept](preview/concept.png_off)

## 8 Основная игровая механика
**Три в ряд** — cуть сводится к передвижению рун по игровому полю и составлению линий из трех и более рун. Пространство, на котором располагаются руны, представляет собой поле из клеток. Игрок выделяет две руны на игровом поле, которые меняются местами друг с другом. Перемена возможна лишь в том случае, когда перемещённая руна войдёт в состав новообразованной цепочки и являться соседней по горизонтальной или вертекальной оси. После чего цепочка разрушается, а руны которые находились выше пустых клеток опускаются. Свободное место на поле заполняется случайными рунами. Особые комбинации рун дают бонусы игроку.

## 9 Отличительная черта
Уникальный набор умений который выбирает игрок для персонажа, создавая собственный стиль игры. Умения дают новый игровой опыт для основной механики.

## 10 Основной цикл игры
Убийство противников → Получение опыта и очков → Прокачка персонажа → Престиж  
Игрок убивает противников, собирая руны на поле и используя умения. Получая в награду опыт и золото, игрок прокачивает уровнь своего персонажа и очки мастерства для открытия и улучшения активных и пассивных умений персонажа, увеличивая свою мощность.  
![core_gameplay](../preview/core_gameplay.png)  
![core_gameplay](preview/core_gameplay.png)  

## 11 Цикл сражения
Игроки по очереди делают ходы. На ход отводиться ораниченное время. За ход игрок может сделать несколько действий (использовать умения, собрать линии на поле). Умения могут изменять правила/логику основной игровой механики во время сражения.  
Смена хода происходит при составлении линии, использование умения досрочно заканчивающее ход или по истечению времени.  
![battle_gameplay](../preview/battle_gameplay.png)  
![battle_gameplay](preview/battle_gameplay.png)  





## 12 Игровые объекты

### 12.1 Игровое поле
Размер 6х6 клеток.  
Состоит из рун.  



### 12.2 Руны
Руны расположены на поле.  
Каждая руна дает определенный тип энергии 
Игрок может выбрать любую руну в состоянии ожидания.  
Игрок может менять местами руны только когда перемещённая руна войдёт в состав новообразованной цепочки и являться соседней по горизонтали или вертекали.  
При выборе не соседней руны она становиться выбранной.  
При перемещении руны не образующую цепочку руны меняются местами и возвращаются на свои места.

**Состояния** 
* Ожидание
* Выбранная - руна выбранная игроком 
* Активная - при выборе второй руны игроком, первая выбранная руна становиться активной
* Заблокированая - в состоянии блокировки руну невозможно использовать и уничтожить
* Разрушенная - руна состоявшая в линии

**Типы**  
* Атакующая (черная) - наносит урон противнику
* Исцеляющая (красная) - востанавливанет здоровье персонажу
* Элементаль (радуга) - особая руна которая может образовывать линию с любым типом рун
* Зеленая - дают энергию зеленого типа
* Синяя - дают энергию синего типа
* Желтая - дают энергию желтого типа



### 12.3 Линии и комбинации линий
Линией считается - расположенные в ряд 3 и более руны одного типа.

**Комбинации**  
Линии образуюшие 5 рун в ряд дают дополнительный ход во время сражения
Комбинации линий образованные из более чем 6 рун дают дополнительные очки энергии



### 12.4 Персонаж
Персонаж - это управляемый игроком герой, олицетворяющий игрока.  
Набор умений может включать в себя до 8 активных и 8 пассивных умений.  

**Атрибуты**  
* Имя - Игрок может дать персонажу имя. Имя Уникально, его можно в последствии неоднократно менять.
* Уровень - представляются числом, которые обозначают общее мастерство и опыт персонажа.
* Очки мастерства - используются для открытия и улучшения активных и пассивных умений персонажа.
* Набор умений - набор активных и пассивных умений персонажа.

**Характеристики**  
* Здоровье - определяет количество урона который может выдержать ваш персонаж
* Урон - увеличивает количество урона по противнику
* Лечение - увеличивает количество востанавлевыемых едениц здоровья
* Энергия - определяет количество получаемых едениц маны при сборе рун
  * Зеленая тип энергии
  * Синяя тип энергии
  * Желтая тип энергии
  * Сигма энергия (сумма всех типов энергии)
* Броня - определяет количество едениц блокироваемого урона
* Ярость - вероятность нанести двойной урон противнику
* Удача - вероятность получения дополнительного хода во время сражения
* Блок - вероятность полностью блокировать урон противника



### 12.5 Умения
**Активное умение** - это умение, вручную применяемое игроком и дающее бонусы к характеристикам персонажа, а так же может изменять правилаи или логику основной игровой механики во время сражения.  
Для использования умения требуется энергия типа указаного в атирбутах умения.  
Игрок может улучшать умения за очки мастерства.  
Умения имеют ограниченный период действия, а также количество ходов перезарядки, во время которого они недоступны. Умение может досрочно заканчивать ход.

**Пассивный умение** - это умение аналогично активному, но умение дейстивует на протяжении всего сражения и не имеет перезарядки. Пассивное умение не может заканчивать ход.

**Атирбуты**  
* Имя
* Описание
* Стоимость очков мастерства
* Количество ходов действия
* Прерзарядка
* Тип энергии
* Класс
* Место в дереве умений (?)

**Состояния умений в сражении**  
* Доступное - доступоное игроку в сражении
* Не активное - не применяет в данный момент эффекты
* Активное - применяет эффекты на протяжении хода
* На перезарядке - не доступоное игроку определенное количество ходов
* Заблокированное - не доступоное игроку определенное количество ходов или из за нехватки энергии

**Состояния умений в дереве умений**  
* Активное - доступное игроку для использования в сражении
* Не активное - не доступное игроку для использования в сражении

**Характеристики**  
Все характеристики индивидуальны для каждого умения. [таблица умений (?)]()



### 12.6 Дерево умений
**Дерево умений** представляет из себя обширную сеть активных и пассивных умений.  
**Ветки дерева** - представляет из себя логику открытия умений  
**Листья дерева** - умения  
Игрок зарабатывает очки мастерства, которые он может тратить на листья дерева (умения).  
Для открытия умения необходимо достаточное количество очков мастерства и открыть все умения в вектке до необходимого умения.  
![skill_tree](../preview/skill_tree.png)  
![skill_tree](preview/skill_tree.png)  



## 13 Интерфейс
[RealTimeBoard - interface](https://realtimeboard.com/app/board/o9J_k0DLCvk=/)  
**Дерево умений**  
**Сражение**  
**Награда**  
**Доска лидеров**  
**Персонаж**



## 14 Монетизация
**Модель free-to-play**.  
Продажа паков премиум валюты, которую игрок может потратить на:
* покупку бустеров, которые действуют определенное количество времени, добавляя бонус опыта и золота
* покупку сундуков с рандомными образами

**Модель freemium**.  
Ограничен максимальный уровень