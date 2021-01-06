'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

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
  if (currentAccount?.pin === +inputLoginPin.value) {
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
  const amount = +inputTransferAmount.value;
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
  const amount = Math.floor(inputLoanAmount.value);

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
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    accounts.splice(index, 1);
    updateUI(null);
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

btnSort.addEventListener('click', e => {
  e.preventDefault();
  console.log('sorting in ascended order');
  sort = !sort;
  displayMovements(currentAccount.movements, sort);
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
/*
//int 64 bit
console.log(0.1 + 0.2); //.300000004

//comparing - need to scale
console.log(Math.round((0.1 + 0.2) * 10) === 0.3 * 10);

//conversion
console.log(Number('23'));
console.log(+'23');

//parsing
//accepts number to parse and the base
console.log(Number.parseInt('30px', 10)); //30
console.log(Number.parseInt('e30px', 10)); //nan

//convention to call w/ number (use namespace)
console.log(parseFloat('2.5rem')); //2.5
console.log(parseFloat('    2.5rem   ')); //2.5

//check if value is NaN
console.log(Number.isNaN(20)); //false
console.log(Number.isNaN('19')); //false
console.log(Number.isNaN(+'19')); //true
console.log(Number.isNaN(23 / 0)); //infinity -> false

//Check if a value is a number
console.log(Number.isFinite(20)); //true
console.log(Number.isFinite('20')); //false
console.log(Number.isFinite(+'20')); //false -> nan
console.log(Number.isNaN(23 / 0)); //infinity -> false

console.log(Math.sqrt(25));
console.log(25 ** 1 / 2);
console.log(8 ** (1 / 3));

*/
///////////////////////////////////////
// Math and Rounding
console.log(Math.sqrt(25));
console.log(25 ** (1 / 2));
console.log(8 ** (1 / 3));

console.log(Math.max(5, 18, 23, 11, 2));
console.log(Math.max(5, 18, '23', 11, 2));
console.log(Math.max(5, 28, '23px', 11, 2)); //nan as long as incompatible type is in there

console.log(Math.min(5, 18, 23, 11, 2));

console.log(Math.PI * Number.parseFloat('10px') ** 2);

console.log(Math.trunc(Math.random() * 6) + 1);

const randomInt = (min, max) =>
  //my version - actually generates values between 10...20
  Math.floor(Math.random() * (max - (min - 1)) + 1) + (min - 1);
//his version - but is min exclusive (i.e doesn't include the first number of min in calculation)
//Math.floor(Math.random() * (max - min) + 1) + min;
// 0...1 -> 0...(max - min) -> 0 + min...(max - min + min) -> min...max
console.log(randomInt(10, 20));

// Rounding integers
console.log(Math.round(23.3));
console.log(Math.round(-23.9)); //-24

//up
console.log(Math.ceil(23.3));
console.log(Math.ceil(23.9));

//down
console.log(Math.floor(23.3));
console.log(Math.floor('23.9')); //23

//down if positive, up if negative (Just cuts off decimal part, whole num stays the same)
console.log(Math.trunc(23.3));

console.log(Math.trunc(-23.3));
console.log(Math.floor(-23.3));

// Rounding decimals
console.log((2.7).toFixed(0)); //returns a string
console.log((2.7).toFixed(3));
console.log((2.345).toFixed(2));
console.log(+(2.345).toFixed(2));
