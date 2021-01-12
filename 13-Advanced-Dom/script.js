'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => {
  btn.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  //x / left- left distance from viewport
  //y / top - top distance from viewport
  console.log(e.target.getBoundingClientRect());

  //prints out how far you've scrolled relative to the top of the browser (same applies for horizontal)
  console.log('Current Scroll (x/y):', window.pageXOffset, window.pageYOffset);
  console.log(
    'height and width of viewport:',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // Scrolling left 0, and scroll down s1coords.top px
  //however, this solution only really works when at very top of page,
  //if you scroll down distance from top of viewport to section is a lot less
  //window.scrollTo(s1coords.left, s1coords.top + window.pageYOffset);
  // window.scrollTo({
  // left: s1coords.left + window.pageXOffset, //should be 0
  // top: s1coords.top + window.pageYOffset,
  // behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});

/*

//Selecting
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const sections = document.querySelectorAll('.section');
console.log(sections);

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');

console.log(allButtons);

console.log(document.getElementsByClassName('btn'));

//creating and inserting Elements
// //element.insertAdjacentHTML('afterend', <p> Hello There </p>)

const message = document.createElement('div');
message.classList.add('cookie-message');
//message.textContent
message.innerHTML = `We use cookies for improved functionality and analytics <button class = "btn btn--close-cookie">
Got it</button>`;
//document.querySelector('.header').prepend(message);\
//this allows you to clone
//header.append(message.cloneNode(true));

//Inserts message as child of header
header.append(message);

//insert message before header
//header.before(message);
// header.after(message);

//delete Element
document.querySelector('.btn--close-cookie').addEventListener('click', () => {
  message.remove();
  //dom traversal method
  message.parentElement.removeChild(message);
});

////////////////////////////////
//Styles - inline
message.style.backgroundColor = '#37383d';
message.style.width = '120%';
console.log(message.style.width); //would work
console.log(message.style.height); //wouldnt work

console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

//get the css height and then add 10px to it
message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 30 + 'px';
console.log(getComputedStyle(message).height);

document.documentElement.style.setProperty(`--color-primary`, 'orangered');

//atributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);

// logo.alt = 'test';

//Non-standard
logo.setAttribute('designer', 'Elijah');
console.log(logo.getAttribute('designer'));

//Accessing attributes - the difference
console.log(logo.src); //absolute
console.log(logo.getAttribute('src')); //relative

//Data attributes
console.log(logo.dataset.versionNumber);

//Classes
logo.classList.add();
logo.classList.remove();
logo.classList.toggle();
logo.classList.contains();

//overrides ALL other classes
logo.className = '';
/////////////////////////////
*/
