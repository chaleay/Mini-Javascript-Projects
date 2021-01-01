'use strict';

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order: function (starter, main) {
    return [this.starterMenu[starter], this.mainMenu[main]];
  },

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};
/*

let [main, , secondary] = restaurant.categories;
console.log(main, secondary);

//swap main and secondary
const temp = main;
main = secondary;
secondary = temp;
console.log(main, secondary);
//or
[main, secondary] = [secondary, main];
console.log(main, secondary);

//destructing
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

//nested array destructuring
const nested = [2, 4, [5, 6]];
//const [x, , y] = nested;
//console.log(x, y); //2 [5, 6]
const [i, , [j, k]] = nested;
console.log(i, j, k); //2 5 6

//Default Values
const [x = null, y = null, z = null] = [8, 9]; // -> [8,9, undefined]
console.log(x, y, z);

*/

/*
const arr = [7, 8, 9];
const arrCopy = [1, 2, ...arr];
console.log(arrCopy);
//logs/passes in individual  elements of the array
console.log(...arrCopy);

//new element - create new array
const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);

//restaurant.mainMenu = newMenu;
//console.log(restaurant.mainMenu);

//Use Case 1 - copy array
const mainMenuCopy = [...restaurant.mainMenu];

//use case 2 - join 2 arrays
const combinedMenu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(combinedMenu);

//Spread Operator works on all iterables -> arrays, maps, sets, strings, but not objects.
const str = 'Jonas';
const letters = [...str, ' ', 'S.'];
console.log(...letters);
*/

/*
//Spread (since it occurs after equals sign)
const arr = [1, 2, ...[3, 4]];
//Rest (since it occurs before equals sign)
const [a, b, ...guys] = [1, 2, 3, 4, 5];
console.log(a, b, guys);

//rest element must be last element to work
const [pizza, , risotto, ...otherItems] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];

console.log(pizza, risotto, otherItems); //-> returns Pizza Risotto (4) ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"]

const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

// with optional chaining
console.log(restaurant.openingHours.mon?.open);

/*
//for of loop
for (const item of menu) {
  console.log(item);
}

//Getting index using for of
for (const [i, el] of menu.entries()) {
  console.log(i, el);
}
/*

//need to check if it exists, otherwise undefined error
console.log(restaurant.openingHours.mon && restaurant.openingHours.mon.open);

const properties = Object.keys(restaurant.openingHours);
//make an object iterable - returns property names
for (const day of properties) {
  console.log(day);
}

//property values
const values = Object.values(restaurant.openingHours);
console.log(values);

//returns key and value
const entries = Object.entries(restaurant.openingHours);
console.log(entries);

for (const [key, { open, close }] of entries) {
  console.log(`On ${key} we open at ${open} and close at ${close}.`);
}

*/

/*
//MAPS -
const rest = new Map();
rest.set('name', 'McDonalds');
rest.set(1, 'My Backyard, Texas');
rest.set(2, 'Lesbian, Portugal');
console.log(rest);

// or

rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open :D')
  .set(false, 'We are closed :(');

console.log(rest.get('home')); //undefined
console.log(rest.get(true));
console.log(rest.get(1));

const time = 21;
console.log(rest.get(rest.get('open') <= time && rest.get('close') > time));

console.log(rest.has('categories'));
rest.delete(2);
console.log(rest);
console.log(rest.size);

rest.set([1, 2], 'Test');
console.log(rest);

//Returns undefined. Even though the arrays contain the same elements, they do not point to the same elements in memory
console.log(rest.get([1, 2]));

//Solution 1:
const arr = [1, 2];

rest.set(arr, 'Test');
console.log(rest.get(arr));

//With dom
rest.set(document.querySelector('h1'), 'Heading');
*/

//STRINGS
const airline = 'TAP Air Portugal';
const plane = 'A320';

console.log(plane[0]);
console.log(plane[1]);
console.log(plane[2]);

//Get size of string
console.log(airline.length);

//Get index
console.log(airline.indexOf('z'));
console.log(airline.lastIndexOf('r'));
console.log(airline.indexOf('Portugal')); //case sensitive

//position at which extraction starts
console.log(airline.slice(4));
console.log(airline.slice(4, 7));
console.log(airline.slice(0, airline.indexOf(' ')));
console.log(airline.slice(airline.lastIndexOf(' ') + 1));

console.log(airline.slice(-2)); //al
console.log(airline.slice(1, -1)); //prints out AP air Portuga

const checkMiddleSeat = function (seat) {
  const char = seat.slice(seat.length - 1);
  return char === 'B' || char === 'E';
};

console.log(checkMiddleSeat('11B') ? 'Middle Seat' : 'Good Seat!');
console.log(checkMiddleSeat('11E') ? 'Middle Seat' : 'Good Seat!');
console.log(checkMiddleSeat('11C') ? 'Middle Seat' : 'Good Seat!');
