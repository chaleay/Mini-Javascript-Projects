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

//STATE VARS
let currentAccount;
let sort = false;

const displayMovements = function (movements, sort = false) {
  //remove any hardcoded html
  //differs from textcontent - textContent returns the text itself
  //innerhtml returns everything including the html tags
  containerMovements.innerHTML = ``;

  const movs = sort
    ? movements.slice().sort((a, b) => {
        return a - b;
      })
    : movements;

  movs.forEach((movement, i) => {
    const type = movement > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">$${movement.toFixed(2)}</div>
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

const calcPrintBalance = account => {
  account.balance = account.movements.reduce((acc, cur) => {
    return acc + cur;
  });
  labelBalance.textContent = `$${account.balance.toFixed(2)}`;
};

const updateUI = acc => {
  if (acc === null) {
    containerApp.style.opacity = 0;
    return;
  }

  displayMovements(acc.movements);
  calcPrintBalance(acc);
  calcDisplaySummary(acc);
};

//LOADIN IN FUNCTIONS
makeUsername(accounts);

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

    //UPDATE UI
    updateUI(currentAccount);
  } else {
    currentAccount = null;
    console.log('Pin or accountname was incorrect.');
    labelWelcome.textContent =
      'Pin or account name was not correct. Please try again.';
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value.toLowerCase()
  );
  console.log(amount, receiverAcc);
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount < 0 ||
    amount > currentAccount.balance ||
    receiverAcc?.username === currentAccount.username
  ) {
    console.log(
      `Transfer of ${amount} to ${receiverAcc?.username} was NOT successful`
    );
  } else {
    console.log(
      `Transfer of ${amount} to ${receiverAcc?.username} was successful`
    );
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', e => {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);

  //Check if any movement is greater than 10% of requested loan
  if (currentAccount.movements.some(mov => mov >= 0.1 * amount)) {
    console.log(`Loan of ${amount} granted.`);
    currentAccount.loans = amount;
    currentAccount.movements.push(amount);
  }

  updateUI(currentAccount);

  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  //confirm pin and username to currrentaccount info
  if (
    inputCloseUsername.value === currentAccount.username.toLowerCase() &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    accounts.splice(index, 1);
    updateUI(null);
  }
  inputCloseUsername.value = inputCloseUserPin.value = '';
});

btnSort.addEventListener('click', e => {
  e.preventDefault();
  console.log('sorting in ascended order');
  sort = !sort;
  displayMovements(currentAccount.movements, sort);
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


//includes, some, and every

//returns true if any value in the array matches -130 EXACTLY
console.log(movements.includes(-130));

//TESTS FOR EQUALITY
const anyDeposits = console.log(movements.some(mov => mov > 0));

//Every method - every item must pass this test
console.log(movements.every(mov => mov > 0));



////////
//FLAT//
const arr = [1, 2, 3, [4, 5, 6], 7, 8];
console.log(arr.flat());
const arrDeep = [1, 2, 3, [4, 5, [6, 7, 8], 9], [10, [2]]];
console.log(arrDeep.flat(2)); //[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 2]

const accountMovements = accounts.map(acc => acc.movements);

//denest our arrays
console.log(accountMovements.flat());

//chainign way
let overallBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov);

//flatmap way (only goes 1 level deep)
overallBalance = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov);

console.log(overallBalance);

//////////////////////////////////////


//Strings
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort());

//Numbers -> return < 0, A, B -> keep order
//return > 0, B, A -> switch order

//ascending order
console.log(
  movements.sort((a, b) => {
    return a > b ? 1 : -1;
  })
);

//ascending order
console.log(
  movements.sort((a, b) => {
    return a - b;
  })
);

//Descending
console.log(
  movements.sort((a, b) => {
    return a > b ? -1 : 1;
  })
);

//Descending
console.log(
  movements.sort((a, b) => {
    return b - a;
  })
);


//Array Creation and Filling
const sucker = new Array(4); //empty * 4
console.log(sucker);

//Fill
//sucker.fill(1);
//@PARAMS
//1ST - object we want to insert
//2ND - index to start at
//3RD - index to end at (exlusive)
sucker.fill(1, 3);
console.log(sucker); // 1 1 1 1

//
const arr = [1, 2, 3, 4, 5, 6, 7];
arr.fill(23, 4, 6);
console.log(arr); // 1 1 1 1

//Array.from
const y = Array.from({ length: 7 }, () => 1);
console.log(y);

//NOTE: USE _ for optional params
//in the length part optionally you can put an array
const z = Array.from({ length: 7 }, (cur, i) => i);
console.log(z);

//100 random rice roll
//math.random - begin is inclusive, end is exclusive
const randomDiceRoll = Array.from({ length: 100 }, (_, i) => {
  return 1 + Math.floor(Math.random() * 6);
});
console.log(randomDiceRoll);

labelBalance.addEventListener('click', function () {
  //instead of having to map through with a second function, we can pass in a callback function instead
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.innerText.replace('$', ''))
  );
  console.log(movementsUI);
});

///////////////////////////////////////
// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/
/*
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

//1
dogs.forEach(dog => {
  dog.portion = Math.trunc(dog.weight ** 0.75 * 28);
});
console.log(dogs);

//2
const sarahDog = dogs.find(dog => {
  return dog.owners.includes('Sarah');
  //return dog.owners.find(owner => owner === 'Sarah');
});
console.log(
  `
  Sarah's Dog ${
    sarahDog.curFood > sarahDog.portion
      ? `is eating too much`
      : sarahDog.portion === sarahDog.curFood
      ? `is eating the perfect amount`
      : `is not eating enough`
  } `
);

///3.
const ownersEatTooMuch = dogs.filter(dog => dog.curFood > dog.portion);
const ownersEatTooLittle = dogs.filter(dog => dog.curFood < dog.portion);

console.log(ownersEatTooMuch);
console.log(ownersEatTooLittle);

//4:

//grab the owners, flat them
// const allOwnersTooMuch = ownersEatTooMuch.map(dog => dog.owners).flat();
// const allOwnersTooLittle = ownersEatTooLittle.map(dog => dog.owners).flat();
const allOwnersTooMuch = ownersEatTooMuch.flatMap(dog => dog.owners);
const allOwnersTooLittle = ownersEatTooLittle.flatMap(dog => dog.owners);
console.log(`${allOwnersTooMuch.join(' and ')}\'s dog eat too much!`);
console.log(`${allOwnersTooLittle.join(' and ')}\'s dog eat too little!`);

//5

const justRight = dogs.some(dog => dog.curFood === dog.portion);
console.log(justRight);

//6
let justOK = dogs.some(
  dog => dog.curFood > 0.9 * dog.portion && dog.curFood < 1.1 * dog.portion
);
console.log(justOK > 0);

//7
justOK = dogs.filter(
  dog => dog.curFood > 0.9 * dog.portion && dog.curFood < 1.1 * dog.portion
);
console.log(justOK);

//8
const sortedDogs = dogs.slice().sort((a, b) => a.portion - b.portion);
console.log(sortedDogs);
*/
