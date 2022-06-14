#!/bin/sh

open -a Safari "http://localhost:8001"

open -a iTerm .;
npm upgrade;
npm i;
clear;
npm run start:nodemon;
# npm run sass; 