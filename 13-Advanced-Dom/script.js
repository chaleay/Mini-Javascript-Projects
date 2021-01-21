'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

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
  window.scrollTo({
    left: s1coords.left + window.pageXOffset, //should be 0
    top: s1coords.top + window.pageYOffset,
    behavior: 'smooth',
  });

  //section1.scrollIntoView({ behavior: 'smooth' });
});

//page navigation//

//new solution
//We're doing it a more efficient way
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  //only do logic if classlist contains link
  if (e.target.classList.contains('nav__link')) {
    const idToScrollTo = e.target.getAttribute('href'); //returns section id -> i.e #section--1, section--2,
    const coords = document.querySelector(idToScrollTo).getBoundingClientRect();
    window.scrollTo({
      left: coords.left + window.pageXOffset, //should be 0
      top: coords.top + window.pageYOffset,
      behavior: 'smooth',
    });
  }
});

////////////////////
//Tabbed////

tabsContainer.addEventListener('click', e => {
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) {
    return;
  }

  console.log(clicked);

  //activate content area depending on what tab we clicked on
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  //remove active content
  tabsContent.forEach(tc => tc.classList.remove('operations__content--active'));
  //replace active content with clicked content
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
  document.querySelector('.operations__content--active').style.opacity = 1;
});

//Menu Fade
//IMPORTANT: A HANDLER FUNCTION CAN ONLY TAKE ONE ARGUMENT
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(item => {
      if (item !== link) {
        item.style.opacity = this;
      }
    });

    logo.style.opacity = this;
  }
};

//Menu Fade animation - fade out
//Using bind, this value get sets to THE first parameter.
//If we wanted to pass in multiple values to the handler function,
//we'd have to use an array or object
nav.addEventListener('mouseover', handleHover.bind(0.5));

//Menu FAde animation - fade back in
nav.addEventListener('mouseout', handleHover.bind(1));

///////////////
// // // /////Sticky navigation - bad solution///
// const stickyCoords = section1.getBoundingClientRect();
// window.addEventListener('scroll', function (e) {
// my solution
// if (stickyCoords.top <= 0) {
// nav.classList.add('sticky');
// } else nav.classList.remove('sticky');
// if (window.scrollY > stickyCoords.top) nav.classList.add('sticky');
// else nav.classList.remove('sticky');
// });

//////////////////////////////////
//A better way - the intersection observer api

// const obsCallback = function (entries, observer) {
// entries.forEach(entry => {
// console.log(entry);
// });
// };
//
// const obsOptions = {
// root: null, //null refers to window
// threshold: [0, 0.2], //how much / what % we want to have visible
// };
//
// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const header = document.querySelector('.header');

const stickyNav = function (entries) {
  //destructure
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${nav.getBoundingClientRect().height}px`, //90px margin (to apply before threshold is reached)
});
headerObserver.observe(header);

//////////////////////
//////////
///////////////////
/*
//OLD SCHOOL - DONT DO
// h1.onmouseenter = function (e) {
// alert('mouse enter h1 w/o function');
// };

//Types of events and event handlers
const h1 = document.querySelector('h1');

//listen once
const alertH1 = e => {
  alert('mouse enter h1');

  //remove
  // h1.removeEventListener('mouseenter', alertH1);
};

//DO THIS - better
h1.addEventListener('mouseenter', alertH1);

//can also do this
setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

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

// const h1 = document.querySelector('h1');

//going downards - selecting children
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.children); //live collection
// console.log(h1.childNodes);
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'orangered';

//Going upwards: parents
// console.log(h1.parentNode); //the div
// console.log(h1.parentElement); //the div
//selects the closet parent header to our h1
//h1.closest('.header').style.background = 'var(--color-primary)';

//going sideways or selecting siblings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

//getting all siblings
// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(function (el) {
// if (el !== h1) {
// el.style.transform = 'scale(.1)';
// }
// });
