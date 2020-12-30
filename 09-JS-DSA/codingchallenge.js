'use strict';

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

/*
//1.
const [players1, players2] = game.players;
console.log(players1, players2);

//2
const [gk, ...fieldplayers] = players1;
console.log(gk, fieldplayers);

//3
const allPlayers = [...players1, ...players2];
console.log(allPlayers);

//4
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
console.log(players1Final);

//5
const { team1, x: draw, team2 } = game.odds;
console.log(team1, draw, team2);

//6 ->
const printGoals = function (...players) {
  players.forEach(element => {
    console.log(element);
  });
  console.log(players.length);
};

printGoals(...game.scored);

//7:
team1 > team2 && console.log(team1);
team2 > team1 && console.log(team2);
*/

//1.
for (const [index, name] of game.scored.entries()) {
  console.log(`Goal ${index + 1}: ${name}`);
}

//2.
const odds = Object.values(game.odds);
let sumOdds = 0;
console.log(odds);
for (const odd of odds) {
  sumOdds += odd;
}
console.log(sumOdds / odds.length);

//3

//mine
/*
const {
  team1,
  team2,
  odds: { team1: team1Odds, x: xOdds, team2: team2Odds },
} = game;

console.log(`Odd of victory of ${team1}: ${team1Odds}`);
console.log(`Odd of draw: ${xOdds}`);
console.log(`Odd of victory of ${team2}: ${team2Odds}`);
OR  
*/

//have to use array notation for accesing object value here -> if we use dot notation, we'll be lookign for a property called 'team' which the game object doesn't have
for (const [team, odd] of Object.entries(game.odds)) {
  const teamStr = team === 'x' ? 'draw' : `victory for ${game[team]}`;
  console.log(`Odd of ${teamStr}: ${odd}`);
}

//4
const scorers = {};
