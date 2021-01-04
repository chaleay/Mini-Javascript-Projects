'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements) {
  //remove any hardcoded html
  //differs from textcontent - textContent returns the text itself
  //innerhtml returns everything including the html tags
  containerMovements.innerHTML = ``;

  movements.forEach((movement, i) => {
    const type = movement > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">$${movement}</div>
    </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

//Receives an array of accounts
const makeUsername = function (accs) {
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(word => {
        return word[0];
      })
      .join('');
  });
};

const calcDisplaySummary = account => {
  const incomes = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov);

  const losses = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov);

  //bank only pays interest if interest income > 1
  const interest = account.movements
    .filter(mov => mov > 0)
    .map(mov => mov * account.interestRate)
    .filter((int, i, arr) => int >= 1)
    .reduce((acc, mov) => acc + mov);

  console.log(incomes, losses, interest);
  labelSumIn.textContent = '$' + incomes.toFixed(2);
  labelSumOut.textContent = '$' + Math.abs(losses).toFixed(2);
  labelSumInterest.textContent = '$' + interest.toFixed(2);
};

const calcPrintBalance = movements => {
  const balance = movements.reduce((acc, cur) => {
    return acc + cur;
  });
  labelBalance.textContent = `$${balance.toFixed(2)}`;
};

//LOADIN IN FUNCTIONS
makeUsername(accounts);
//event handler
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  //Prevent form
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value.toLowerCase()
  );

  //optional chaining example
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Display UI and welcome message
    labelWelcome.textContent =
      'Welcome back ' + currentAccount.owner.split(' ')[0];
    containerApp.style.opacity = 100;

    //CLEAR INPUT FIELDS
    inputLoginPin.value = inputLoginUsername.value = '';
    inputLoginPin.blur();

    displayMovements(currentAccount.movements);
    calcPrintBalance(currentAccount.movements);
    calcDisplaySummary(currentAccount);
  } else {
    currentAccount = null;
    console.log('Pin or accountname was incorrect.');
    labelWelcome.textContent =
      'Pin or account name was not correct. Please try again.';
  }
});

//console.log(accounts);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

/*
let arr = ['a,', 'b', 'c', 'd', 'e'];
//starting index included
console.log(arr.slice(2));
//length of array is end paramater - begin parameter
//end is exclusive
console.log(arr.slice(2, 4)); //c,d
console.log(arr.slice(-2)); //d, e
console.log(arr.slice(-1)); // e
console.log(arr.slice(1, -1)); //b c d
//The best way I've found about thinking about this one is that a negative element in the
//second parameter refers to how many elements you ignore going from the end of the array to the start
console.log(arr.slice(1, -2)); //b c

//shallow copies
const copy1 = [...arr];
const copy2 = arr.slice();

//Splice - mutates the actual array to get the elements you didn't slice
//console.log(arr.splice(2)); //2 3 4
//console.log(arr); // 1 2

//deleting elements of array - last element
//arr.splice(-1);
//console.log(arr);
console.log(arr.splice(1, 2)); //b c removed
console.log(arr); // a d e

//REVERSE
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());

//Concat
const letters = arr.concat(arr2);
console.log(letters);
//can just do spread ops instead
console.log([...arr, ...arr2]); //"a", "b", "c", "d", "e", "f", "g", "h", "i", "j"

//Join
console.log(letters.join(' - ')); //a - b - c - d - e - f - g - h - i - j
*/

/////////////////////////////////////////////////////////////
//Looping

//for of
// for (const movement of movements) {
// if (movement > 0) {
// console.log(`You deposited ${movement}`);
// } else {
// console.log(`You widthdrew ${Math.abs(movement)}`);
// }
// }

//for each - passes in current element, index, and the entire array
//a fundamental difference is that you cannot break out of a for each loop using continue or break
//the break statement can be used to jump out of loop
//the continue keyword can be used to break one iteration of the loop and continues with the next iteration

/*
movements.forEach((movement, index, array) => {
  if (movement > 0) {
    console.log(`Movement ${index + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${index + 1}: You widthdrew ${Math.abs(movement)}`);
  }
});
*/

/*
//MAPS AND SETS
currencies.forEach((value, key, map) => {
  console.log(`${key}: ${value}`);
});

const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'GBP']);
console.log(currenciesUnique);

//SETS
currenciesUnique.forEach((value, key, set) => {
  console.log(`${key}: ${value}`);
});
*/

///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, 
and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. 
A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

/*
const checkDogs = (dogsJulia, dogsKate) => {
  let dogsJuliaCopy = [...dogsJulia];
  dogsJuliaCopy = dogsJuliaCopy.slice(1, -2);
  console.log(dogsJuliaCopy);
  const dogs = [...dogsJuliaCopy, ...dogsKate];
  dogs.forEach((d, i) => {
    console.log(
      `Dog number ${i + 1} is a ${
        d >= 3 ? `Dog` : `Puppy`
      }, and is ${d} years old`
    );
  });
};

let juliaDogs = [3, 5, 2, 12, 7];
let kateDogs = [4, 1, 15, 8, 3];
checkDogs(juliaDogs, kateDogs);
*/
/*
//The map method
const euroToUd = 1.1;

//Map method
//First param: value
//Second param: index
//Third param: array
const movementsUSD = movements.map(mov => {
  return mov * euroToUd;
});

console.log(movementsUSD);

const moveDescriptions = movements.map((movement, index) => {
  if (movement > 0) {
    return `Movement ${index + 1}: You deposited ${movement}`;
  } else {
    return `Movement ${index + 1}: You withdrew ${Math.abs(movement)}`;
  }
});

console.log(moveDescriptions);

//Cool arrow function notes - this keyword scope
let me = {
  name: 'Ashutosh Verma',
  thisInArrow: () => {
    console.log('My name is ' + this.name); // no 'this' binding here
  },
  thisInRegular() {
    console.log('My name is ' + this.name); // 'this' binding works here
  },
};
me.thisInArrow();
me.thisInRegular();


//Filter method

const deposits = movements.filter(mov => {
  return mov > 0;
});
const withdrawals = movements.filter(mov => {
  return mov < 0;
});

console.log(deposits);
console.log(withdrawals);


//Reduce
console.log(movements);

//func
const balance = movements.reduce(
  function (acc, cur, i, arr) {
    console.log(`Iteration ${i}: ${cur} added to ${acc}`);
    return acc + cur;
  },
  0 //inital value of the accumulator
);

//arrow
const balanceArrow = movements.reduce((acc, curr) => {
  return acc + curr;
}, 0);

console.log(balanceArrow);


//Find max
const max = movements.reduce((acc, curr) => {
  return curr > acc ? curr : acc;
}, movements[0]);

console.log(max);

*/

//////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀



const calcAverageHumanAge = function (ages) {
  const humanAges = ages.map((val, index) => {
    return val <= 2 ? 2 * val : 16 + val * 4;
  });
  const humanAgesFiltered = humanAges.filter(age => {
    return age >= 18;
  });
  const avg =
    humanAgesFiltered.reduce((acc, cur) => {
      return acc + cur;
    }) / humanAgesFiltered.length;

  return avg;
};

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));


//Chaining
const euroToUsd = 1.1;

console.log(movements);

const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * euroToUsd)
  .reduce((acc, mov) => acc + mov, 0);

const totalDepositsUSD2 = movements
  .filter(mov => mov > 0)
  .map((mov, i, arr) => {
    //the arr returned above
    console.log(arr);
    return mov * euroToUsd;
  })
  .reduce((acc, mov) => acc + mov, 0);

console.log(totalDepositsUSD2);
*/

///////////////////////////////////////
// Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀



const calcAverageHumanAge = ages => {
  return ages
    .map(val => (val <= 2 ? 2 * val : 16 + val * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
};

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));



//The find method - Returns the first element that satisfies this condition
const firstWidthdrawal = movements.find(mov => mov < 0);

console.log(movements);
console.log(firstWidthdrawal);

//using find w/ objects
const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);
*/
