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
/*
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
 

//cc2
//1.
class car {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  brake() {
    this.speed -= 10;
    console.log(`New speed after brake for ${this.make} is ${this.speed}`);
  }

  accelerate() {
    this.speed += 10;
    console.log(`New speed after accelerate for ${this.make} is ${this.speed}`);
  }

  get speedUS() {
    return `${this.make} is going ${this.speed / 1.6} mi/h`;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

//test
const ford = new car('Ford', 120);
console.log(ford.speedUS);
ford.speedUS = 50;
console.log(ford.speedUS); //50 mi/h
console.log(ford); //80 km/h


//Inheritance using constructor functions
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

console.log(Person.prototype);

const Student = function (firstName, birthYear, course) {
  //akin to super in es6 classes
  Person.call(this, firstName, birthYear);
  this.course = course;
};

//the actual inheritance part (needs to be before method declaration )
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
  console.log(
    `My name is ${this.firstName}, I graduate in ${this.birthYear} and I major in ${this.course}`
  );
};

//this student's prototype now references the actual prototype
console.log(Student.prototype);

const mike = new Student('mike', 2020, 'CS');
console.log(mike);
mike.introduce();
mike.calcAge();

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);

//need to also set the constructor as well
Student.prototype.constructor = Student;

console.log(mike instanceof Student);
console.log(mike instanceof Person); //true beacuse of object.create line

console.log(Student.prototype);
*/
//es6 classes
//cc3

/*
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`New speed after accelerate for ${this.make} is ${this.speed}`);
};

Car.prototype.brake = function () {
  this.speed -= 10;
  console.log(`New speed after brake for ${this.make} is ${this.speed}`);
};

const ElectricCar = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

ElectricCar.prototype = Object.create(Car.prototype);

//still not sure what to do
//ElectricCar.prototype.constructor = ElectricCar;

ElectricCar.prototype.chargeTo = function (newCharge) {
  console.log(`charged from ${this.charge} to ${newCharge}`);
  this.charge = newCharge;
};

ElectricCar.prototype.accelerate = function () {
  this.speed += 10;
  this.charge -= 1;
  console.log(
    `New speed after accelerate for ${this.make} is ${this.speed}, and battery decreased by 1% to ${this.charge}%`
  );
};

const ecar = new ElectricCar('Tesla', 100, 100);
console.log(Car.prototype);
console.log(ecar.__proto__);

const car = new Car('Toyota', 100);
car.accelerate();
ecar.accelerate();
*/

//Es6 Classes
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
}

class Student extends PersonCl {
  constructor(fullName, birthYear, major) {
    super(fullName, birthYear);
    this.major = major;
  }
}
