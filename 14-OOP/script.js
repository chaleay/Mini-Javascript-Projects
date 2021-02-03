'use strict';

/*
///////////////////////////////////////
// Constructor Functions and the new Operator
const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Never to this!
  // this.calcAge = function () {
  //   console.log(2037 - this.birthYear);
  // };
};

const jonas = new Person('Jonas', 1991);
//console.log(jonas);

// 1. New {} is created
// 2. function is called, this = {}
// 3. {} linked to prototype
// 4. function automatically return {}

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);

//console.log(jonas instanceof Person);

Person.hey = function () {
  //console.log('Hey there 👋');
  //console.log(this);
};
Person.hey();

///////////////////////////////////////
// Prototypes
//console.log(Person.prototype);

//add to class
Person.prototype.calcAge = function () {
  //console.log(2037 - this.birthYear);
};

jonas.calcAge();
matilda.calcAge();

//console.log(jonas.__proto__);
//console.log(jonas.__proto__ === Person.prototype);
//
// console.log(Person.prototype.isPrototypeOf(jonas));
// console.log(Person.prototype.isPrototypeOf(matilda));
// console.log(Person.prototype.isPrototypeOf(Person));
//
// .prototyeOfLinkedObjects

Person.prototype.species = 'Homo Sapiens';
//console.log(jonas.species, matilda.species);

// console.log(jonas.hasOwnProperty('firstName')); //true
// console.log(jonas.hasOwnProperty('species')); //false -> not in object itself, but in prototype

console.log(jonas.__proto__);
console.log(jonas.__proto__.__proto__);
console.log(jonas.__proto__.__proto__.__proto__);

console.dir(Person.prototype.constructor);

const arr = [3, 6, 4, 5, 6, 9, 3];
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype); //true

console.log(arr.__proto__.__proto__);

Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique()); //works

const h1 = document.querySelector('h1'); //proto = node
console.dir(x => x + 1); //proto = functions proto



//1
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

//2
Car.prototype.accelerate = function () {
  this.speed += 10;

  console.log(this.speed);
};

//3
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(this.speed);
};

//4

const car = new Car('Toyota', 20);
car.brake();
car.accelerate();
*/

//Es6 class - getters, setters, es6 class dec
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Instance methods
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  //creating a static method
  //from method is in array's namespace (not prototype)
  static hey() {
    console.log('hey');
    console.log(this);
  }
}

PersonCl.hey(); //this refers to calling class i.e in this case the personCL class

//1. Classes are not hoisted
//2. Classes are first-class citizens (we can pass them into functions / return them)
//3. classes are executed in strict mode ()

//Object.create - manually set prototype to
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steve = Object.create(PersonProto);
console.log(steve); //no properties yet
//assign attributes
steve.name = 'Steve';
steve.birthYear = 2002;
steve.calcAge(0);

const per = Object.create(PersonProto);
per.init('Sarah', 1979);
per.calcAge();
