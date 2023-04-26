const button = document.getElementById('buttonUp');

button.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

window.onscroll = function() {hideButton()};

function hideButton() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    button.style.display = "flex";
  } else {
    button.style.display = "none";
  }
}

hideButton();