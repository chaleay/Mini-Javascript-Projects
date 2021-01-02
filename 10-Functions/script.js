'use strict';

/*
//cuts out spaces in string
const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...other] = str.split(' ');
  return [first.toUpperCase(), ...other].join(' ');
};

//Higher order function
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transform string: ${fn(str)}`);

  console.log(`Transformed by ${fn.name}`);
};

//passing in callback functions (the transformed calls these functions later)
transformer('Javascript is the best!', upperFirstWord);
transformer('Javascript is the best!', oneWord);

const high5 = () => {
  console.log('👋');
};

//JS uses callbacks all the time
document.body.addEventListener('click', high5);

//callbacks here as well
['Blah', 'Yah', 'Fugg'].forEach(high5);
*/

/*
const greet = function (greeting) {
  console.log('First function');
  return function (name) {
    console.log(`Second function: ${greeting} ${name}`);
  };
};

//using arrow functions
const greet2 = greeting => {
  console.log('First function');
  return name => {
    console.log(`Second function: ${greeting} ${name}`);
  };
};

//calls greet which returns a function
//output
//hey undefined
//first function
const greeterHey = greet('hey', 'Elijah');

//call the function returned by greet
//Second function :hey elijah
greeterHey('Elijah');

//Same thing
greet('Hello')('Elijah');
greet2('Hello')('Elijah');

*/
/*
//CALL AND APPLY EXAMPLES
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    console.log(`${name} booked a seat on flight ${this.airline} ${flightNum}`);
    this.bookings.push({
      flight: `${this.iataCode} ${flightNum}`,
      name,
    });
  },
};

lufthansa.book(239, 'Elijah');
lufthansa.book(239, 'Gaytan');
console.log(lufthansa);

const eurowings = {
  airline: 'eurowing',
  iataCode: 'EW',
  bookings: [],
};

const swiss = {
  airline: 'Swiss',
  iataCode: 'LX',
  bookings: [],
};

//FIRST ORDER FUNCTION (points ot lufthansa book method)
const book = lufthansa.book;
//DOES NOT WORK
//book(23, 'Sarah'); //undefined, b/c now its a seperate function

//CALL METHOD
//PARAM1 -> THE OBJECT THAT THE THIS KEYWORD WILL REFER TO
//PARAM 2 / 3 - THE FUNCTION PARAMETERS
book.call(eurowings, 23, 'Sarah Williams');
console.log(eurowings);

book.call(lufthansa, 239, 'Mary');
console.log(lufthansa);

book.call(swiss, 23, 'SwissBoy');
console.log(swiss);

// APPLY METHOD
//Does the same thing

const data = [583, 'George Cooper'];
book.apply(swiss, data);
console.log(swiss);

//But it's bettter to just do this
book.call(lufthansa, ...data);

//Bind Method -> create new method where this paraemeter references EW
const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(23, 'Stephen');

const bookEW23 = book.bind(eurowings, 23);
bookEW23('Elijah GayTon');
console.log(eurowings);

//With Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  this.planes++;
  console.log(this);
  console.log(this.planes);
};

//In an eventlistener, the this keyword always point to the element that is being referenced
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

//Solution - bind the method!

//Partial Application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

//we can use a null reference for the this keyword since its not important in this context
const addVAT = addTax.bind(null, 0.23);

console.log(addVAT(100));
console.log(addVAT(23));

const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};

console.log(addTaxRate(0.23)(100));

*/
/*
//Example 1
const secureBooking = function () {
  let passengerCount = 0;
  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();

//What allows booker able to update passengerCount despite it not being in the execution context is Closures
booker(); //1 passengers
booker(); //2 passengers
booker(); //3 passengers

//Any function always has access to the variable environment of the execution context in which the function was created, even after the EC is gone
*/

/*
let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
//still has access to g's variables even though g's execution context is removed
f();
//reassign f
console.dir(f);

h();
f();
console.dir(f); //no longer has the value of a after being reassigned

//Example 2
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  //this function creates a closure to access boardPasengers variables after boardPassengers finishes its execution.
  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds.`);
};

//closure has priority over scope chain
const perGroup = 1000;
boardPassengers(180, 3);
*/
