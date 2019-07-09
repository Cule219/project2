function openNav() {
  document.getElementById("myNav").style.width = "100%";
  document.getElementsByClassName('overlay-content')[0].style.display = 'block'
}

function closeNav() {
  document.getElementById("myNav").style.width = "0%";
  document.getElementsByClassName('overlay-content')[0].style.display = 'none';
}

let url = 'http://localhost:3000/comments';
axios.get(url).then(response => {
  console.log(response);
});

document.getElementById('comment').addEventListener('submit', (e)=>{
  console.log(e);
  document.getElementById('new-comment').innerHTML = '';
  getComments();
});
getComments = () =>{
  console.log('this is a test')
}
