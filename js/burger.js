
const burgerButton = document.getElementById('burger-button');
const closeButton = document.getElementById('navigation-close-button')
const navigation = document.getElementById('navigation');
const blurField = document.getElementById('blur-field');
const body = document.getElementById('body');
const navigationLinks = Array.from(document.querySelectorAll('.navigation-item__link'));

const openCloseNavigationHandler = () => {
  body.classList.toggle('body_without-scroll');
  blurField.classList.toggle('header__blur-field_navigation-open');
  navigation.classList.toggle('header__navigation_open');
};

burgerButton.addEventListener('click', openCloseNavigationHandler);
closeButton.addEventListener('click', openCloseNavigationHandler);
navigationLinks.map(navLink => navLink.addEventListener('click', openCloseNavigationHandler));
