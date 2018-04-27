# Требование к GIT
![branches](https://habrastorage.org/storage/4bf7e68c/49e29c35/3a01bd6b/782a1be3.png)

### Главная ветвь (master)
Мы считаем ветку origin/master главной. То есть, исходный код в ней должен находиться в состоянии production-ready в любой произвольный момент времени.

### Ветвь разработки (develop)
Ветвь origin/develop мы считаем главной ветвью для разработки. Хранящийся в ней код в любой момент времени должен содержать самые последние изданные изменения, необходимые для следующего релиза.

### Ветви функциональностей (feature branches)
Могут порождаться от: **develop**  
Должны вливаться в: **develop**  
Возможность удаления: true  
Соглашение о наименовании: всё, за исключением **master**, **develop**, **release-\*** или **hotfix-\***

`$ git checkout -b myfeature develop`

`$ git checkout develop`  
`$ git merge --no-ff myfeature`  
`$ git branch -d myfeature`  
`$ git push origin develop`  

### Ветви релизов (release branches)
Могут порождаться от: **develop**  
Должны вливаться в: **develop** и **master**  
Возможность удаления: true  
Соглашение о наименовании: **release-***

`$ git checkout -b release-1.2 develop`  
`$ ./bump-version.sh 1.2`  
`$ git commit -a -m "Bumped version number to 1.2"`  

`$ git checkout master`  
`$ git merge --no-ff release-1.2`  
`$ git tag -a 1.2`

`$ git checkout develop`  
`$ git merge --no-ff release-1.2`

### Ветви исправлений (hotfix branches)
Могут порождаться от: **master**  
Должны вливаться в: **develop** и **master**  
Возможность удаления: true  
Соглашение о наименовании: **hotfix-***

`$ git checkout -b hotfix-1.2.1 master`  
`$ ./bump-version.sh 1.2.1`  
`$ git commit -a -m "Bumped version number to 1.2.1"`  

`$ git commit -m "Fixed severe production problem"`  

update master  
`$ git checkout master`  
`$ git merge --no-ff hotfix-1.2.1`  
`$ git tag -a 1.2.1`  

update develop  
`$ git checkout develop`  
`$ git merge --no-ff hotfix-1.2.1`  

`$ git branch -d hotfix-1.2.1`  

### Коммиты
Указываем тип коммита и область действия (scope)  

| тип  | описание |
| :--- | :--- |  
| feature  | используется при добавлении новой функциональности уровня приложения |  
| fix      | если исправили какую-то серьезную багу |  
| docs     | всё, что касается документации |  
| style    | исправляем опечатки, исправляем форматирование |  
| refactor | рефакторинг кода приложения |  
| test     | всё, что связано с тестированием |  
| chore    | обычное обслуживание кода |  

Пример: `chore (Gruntfile.js) add watch task`