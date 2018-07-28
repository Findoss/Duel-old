#!/usr/bin/env bash
cd .\\client\\source\\components
cp -r SkillSet $1
cd $1
mv SkillSet.css $1.css
mv SkillSet.js $1.js
mv SkillSet.html $1.html
mv SkillSet.vue $1.vue
mv SkillSet.spec.js $1.spec.js
