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
    '2020-12-22T23:36:17.929Z',
    '2021-01-04T10:51:36.790Z',
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
let currentAccount, time;
let sort = false;

//returns formatted date
const formatMovementDate = (date, locale) => {
  const calcDaysPassed = (date1, date2) =>
    Math.trunc(Math.abs((date2 - date1) / (1000 * 60 * 1440)));

  const daysPassed = calcDaysPassed(Date.now(), date.getTime());

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed < 7) return `${daysPassed} days ago`;
  if (daysPassed < 22 && daysPassed % 7 === 0)
    return `${daysPassed / 7} week(s) ago`;
  if (daysPassed > 7 && daysPassed < 22) return `${daysPassed} days ago`;
  else {
    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const day = `${date.getDate()}`.padStart(2, 0);
    // const year = date.getFullYear();
    // return `${month}/${day}/${year}`;
    return new Intl.DateTimeFormat(locale).format(date);
  }
};

const logout = () => {
  clearInterval(time);
  labelWelcome.textContent = `Log in to get started`;
  containerApp.style.opacity = 0;
  currentAccount = null;
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  //remove any hardcoded html
  //differs from textcontent - textContent returns the text itself
  //innerhtml returns everything including the html tags
  containerMovements.innerHTML = ``;

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach((movement, i) => {
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const type = movement > 0 ? 'deposit' : 'withdrawal';

    const formattedMov = formatCur(movement, acc.locale, acc.currency);

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__date">${displayDate}</div>
      <div class="movements__value">${formattedMov}</div>
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

  const formattedIncomes = formatCur(incomes, account.locale, account.currency);
  const formattedLosses = formatCur(
    Math.abs(losses),
    account.locale,
    account.currency
  );
  const formattedInterest = formatCur(
    interest,
    account.locale,
    account.currency
  );

  labelSumIn.textContent = formattedIncomes;
  labelSumOut.textContent = formattedLosses;
  labelSumInterest.textContent = formattedInterest;
};

const calcPrintBalance = account => {
  account.balance = account.movements.reduce((acc, cur) => {
    return acc + cur;
  });

  const formattedMov = formatCur(
    account.balance,
    account.locale,
    account.currency
  );

  labelBalance.textContent = `${formattedMov}`;
};

const updateUI = acc => {
  if (acc === null) {
    containerApp.style.opacity = 0;
    return;
  }

  displayMovements(acc);
  calcPrintBalance(acc);
  calcDisplaySummary(acc);
};

//LOADIN IN FUNCTIONS
makeUsername(accounts);

btnLogin.addEventListener('click', function (e) {
  //Prevent form
  e.preventDefault();
  const foundAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value.toLowerCase()
  );

  //optional chaining example
  if (
    foundAccount?.pin === +inputLoginPin.value &&
    currentAccount !== foundAccount
  ) {
    //Display UI and welcome message
    currentAccount = foundAccount;
    labelWelcome.textContent =
      'Welcome back ' + currentAccount.owner.split(' ')[0];
    containerApp.style.opacity = 100;

    //create current date adn time
    const now = new Date();
    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric', //long displays in letters, 2-digits
      year: 'numeric',
      //weekday: 'numeric',
    };

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);
    //labelDate.textContent = `${month}/${day}/${year}, ${hour}:${min}`;

    //CLEAR INPUT FIELDS
    inputLoginPin.value = inputLoginUsername.value = '';
    inputLoginPin.blur();

    //Timer
    if (time) {
      clearInterval(time);
    }
    time = startLogOutTimer();

    //UPDATE UI
    updateUI(currentAccount);
  } else {
    labelWelcome.textContent =
      currentAccount === foundAccount
        ? 'You are already logged on.'
        : 'Pin or account name was not correct. Please try again.';

    if (currentAccount === foundAccount) return;
    currentAccount = null;
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

    //amount
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());
    updateUI(currentAccount);

    //Reset Timer - clear and set timer
    clearInterval(time);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', e => {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);

  //Check if any movement is greater than 10% of requested loan
  if (amount > 0 && currentAccount.movements.some(mov => mov >= 0.1 * amount)) {
    //artifical delay
    setTimeout(function () {
      //console.log(`Loan of ${amount} granted.`);
      currentAccount.loans = amount;
      currentAccount.movements.push(amount);
      currentAccount.movementsDates.push(new Date().toISOString());

      updateUI(currentAccount);

      //Reset time on action
      clearInterval(time);
      timer = startLogOutTimer();

      inputLoanAmount.value = '';
    }, 2500);
  }
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
    logout();
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

btnSort.addEventListener('click', e => {
  e.preventDefault();
  console.log('sorting in ascended order');
  sort = !sort;
  displayMovements(currentAccount, sort);
});

const startLogOutTimer = function () {
  const tick = () => {
    const timerDisplay =
      timer % 60 === 0
        ? `${timer / 60}:`.padEnd(4, 0)
        : `${Math.trunc(Math.floor(timer / 60))}:` +
          `${timer % 60}`.padStart(2, 0);

    //print the remaining time to UI
    labelTimer.textContent = timerDisplay;

    //when time is at 0, stop timer and log out user
    if (timer === 0) {
      alert('Your session has expired.');
      logout();
    }
    timer--;
    console.log(timer);
  };

  // Set Time to 5 minutes
  let timer = 300; //2:00 if(timer % 60 === 0)

  //call at beginning
  tick();
  //Call the timer every second
  time = setInterval(tick, 1000);
  return time;
};

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


// Working with BigInt
console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER);
console.log(2 ** 53 + 1);
console.log(2 ** 53 + 2);
console.log(2 ** 53 + 3);
console.log(2 ** 53 + 4);

//Two ways to make big ints
console.log(4838430248342043823408394839483204n);
console.log(BigInt(48384302));

//Operations

console.log(1000000000n * 10000n);
const num = 23;
console.log(huge * BigInt(num));


console.log(20n > 15)



//Create a date
const now = new Date();
console.log(now);

console.log(new Date('Wed Jan 06 2021 01:08:43'));
//not best practice to do this
console.log(new Date('December 24, 2015'));
console.log(new Date(account1.movementsDates[0]));

console.log(new Date(2037, 10, 19, 15, 23, 5));
//auto corrects the date since november does NOT have 31 days (sets to dec 1st)
console.log(new Date(2037, 10, 31));

console.log(new Date(0));
//create a date 3 days after the above
console.log(new Date(3 * 24 * 60 * 60 * 1000));

const future = new Date(2037, 10, 19, 15, 23, 5);
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate());
console.log(future.getDay());
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString());
console.log(future.getTime());

console.log(new Date(2142278585000));
console.log(now.getTime()); //1609918645093 time in ms
console.log(now.toLocaleDateString()); //prints out date 1/06/21

//get current timestamp
console.log(Date.now());

//setting
future.setFullYear(2040);
console.log(future);



const future = new Date(2037, 10, 19, 15, 23);
console.log(+future);

//convert to days
const daysPassed = (date1, date2) =>
  Math.abs((date2 - date1) / (1000 * 60 * 1440));

console.log(daysPassed(new Date(2037, 3, 14), new Date(2037, 3, 24)));



//Internationalizing numbers
const num = 3882325;

const options = {
  style: 'currency', //percent, or currency
  unit: 'mile-per-hour', //loook these up
  currency: 'EUR',
  //useGrouping: false, //no separators
};

console.log(new Intl.NumberFormat('en-US', options).format(num));
console.log(new Intl.NumberFormat('de-DE', options).format(num));
console.log(new Intl.NumberFormat('ar-SY').format(num));
console.log(new Intl.NumberFormat(navigator.language).format(num));


//tiemout function
setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2}`),
  3000,
  'olives',
  'spinach'
);
//this code will execute asynchronously
console.log('Wait 3 seconds...');


setInterval(() => {
  const now = new Date();
  const newDate = new Intl.DateTimeFormat(navigator.locale, {
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }).format(now);

  console.log(newDate);
}, 2000);
*/
