#!/usr/bin/env bash
if [[ $1 = 'v' ]]
then
  cd .\\client\\source\\views
else
  cd .\\client\\source\\components
fi
mkdir $2
cd $2
touch $2.css
touch $2.js
touch $2.html
touch $2.vue
touch $2.spec.js