'use strict';

/*
const calcAgeArrow = birthYear => {
  console.log(2037 - birthYear);
  //this keyword here refers to parent object (the window in this case)
  console.log(this);
};
calcAgeArrow(2017);

const jonas = {
  year: 1991,
  calcAge: function () {
    return 2037 - this.year;
  },
};

const matilda = {
  year: 2017,
  calcAge: jonas.calcAge,
};

//if calling w/ matilda -> returns 20
//in this context, this context points to whomever calls the object
console.log(matilda.calcAge());

//func copy
const f = jonas.calcAge;
//this is undefined here since there is no object attached to this function call
f();
*/

const me = {
  name: 'jonas',
  age: 30,
};

const friend = me;
friend.age = 27;

console.log(`Friend: ${friend.age}`);
console.log(`Me: ${me.age}`);
