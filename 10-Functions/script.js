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
