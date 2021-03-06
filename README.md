# Demo

## On Local environment

You can clone the repo on to your system then run the `npm install` command to install dependencies.

### Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Live Project

The Live project is hosted on netlify <a href='https://nerdle-game.netlify.app/'>here</a>

# nerdle game

## Descripton

Nerdle is the new Wordle-inspired game in town that allows you to play Wordle but with numbers and equations.

## How to Play

Guess the NERDLE in 6 tries. After each guess, the color of the tiles will change to show how close your guess was to the solution.

- ### Indicators

  - green: correct guess
  - purple: guess is present but not in correct position
  - black: guess is not present in the equation

## Rules

Each guess is a calculation.
You can use 0 1 2 3 4 5 6 7 8 9 + - _ / or =.
It must contain one “=”.
It must only have a number to the right of the “=”, not another calculation.
Standard order of operations applies, so calculate _ and / before + and - eg. 3+2\*5=13 not 25!
If the answer we're looking for is 10+20=30, then we will accept 20+10=30 too (unless you turn off 'commutative answers' in settings).

## Features

- ### PWA Optimised

<img src='sampleImages/pwa.png' rel='pwa-img' width=300 height=300 />

- ### Dark Mode

<img src='sampleImages/dark-mode.png' rel='dark-mode-img' width=400 height=400 />

- ### Game Modes
  - mini : with 6 rows and 5 columns
  - classic : with 6 rows and 8 columns

## Future Milestones

- ### One game a day
  - one game a day helps to reduce repetitive equations, and can also keep player more interested in the game.
- ### account creation
  - by creating account users can send custom equation challenge to friends and family
  - players can also keep track of their stats
