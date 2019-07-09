document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

}, false);

function openNav() {
  document.getElementById("myNav").style.width = "100%";
  document.getElementsByClassName('overlay-content')[0].style.display = 'block'
}

function closeNav() {
  document.getElementById("myNav").style.width = "0%";
  document.getElementsByClassName('overlay-content')[0].style.display = 'none';
}