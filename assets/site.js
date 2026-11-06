const button = document.querySelector('#burger');
const menu = document.querySelector('#menu');

function setMenu(open) {
  menu.classList.toggle('open', open);
  button.setAttribute('aria-expanded', String(open));
}

button.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
menu.addEventListener('click', (event) => {
  if (event.target.closest('a')) setMenu(false);
});
