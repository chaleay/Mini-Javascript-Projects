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
*/

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
