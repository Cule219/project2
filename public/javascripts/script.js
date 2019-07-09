// const charactersAPI = new APIHandler("http://localhost:3000")

let button = document.getElementById('comment');
button.addEventListener('click', ()=>{
  document.getElementById('new-comment').innerHTML = '';
  getComments();
})


function getComments(url){
  axios.get(`http://localhost:3000/article/comments`).then(resonse => {
    console.log(response);
  });
}